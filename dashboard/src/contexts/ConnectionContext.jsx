import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const ConnectionContext = createContext();

export function ConnectionProvider({ children }) {
  // Load saved backend URL or default to localhost
  const savedUrl = localStorage.getItem('neurospeak_backend_url') || 'http://localhost:8000';
  const [backendUrl, setBackendUrl] = useState(savedUrl);
  
  const [connected, setConnected] = useState(false);
  const [espConnected, setEspConnected] = useState(false);
  
  // Realtime Data
  const [wordHistory, setWordHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordStats, setRecordStats] = useState(null);
  
  // Graph arrays mapped to 150 points for 30fps smooth performance
  const [chartData, setChartData] = useState({
    sensor1: [],
    sensor2: [],
    sensor3: []
  });
  
  const socketRef = useRef(null);
  const frameCount = useRef(0);

  // Auto-connect to backend whenever URL changes
  useEffect(() => {
    localStorage.setItem('neurospeak_backend_url', backendUrl);
    
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    
    socketRef.current = io(backendUrl);
    
    socketRef.current.on('connect', () => setConnected(true));
    socketRef.current.on('disconnect', () => {
      setConnected(false);
      setEspConnected(false);
    });
    
    socketRef.current.on('esp_status', (data) => {
      setEspConnected(data.connected);
    });
    
    socketRef.current.on('emg_data', (data) => {
      frameCount.current += 1;
      setChartData(prev => ({
        sensor1: [...prev.sensor1.slice(-150), { time: frameCount.current, value: data.v1 }],
        sensor2: [...prev.sensor2.slice(-150), { time: frameCount.current, value: data.v2 }],
        sensor3: [...prev.sensor3.slice(-150), { time: frameCount.current, value: data.v3 }]
      }));
    });
    
    socketRef.current.on('word_detected', (data) => {
      setWordHistory(prev => [{ word: data.word, timestamp: new Date().toLocaleTimeString() }, ...prev].slice(0, 50));
      playAudioCue(data.word);
    });
    
    socketRef.current.on('recording_stats', (stats) => {
      setRecordStats(stats);
      setIsRecording(false);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [backendUrl]);

  // Audio Logic
  const playAudioCue = (wordText) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch(e) { console.error("Audio beep failed", e); }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.rate = 1.1;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordStats(null);
    if (socketRef.current) socketRef.current.emit('start_recording');
  };

  const stopRecording = () => {
    if (socketRef.current) socketRef.current.emit('stop_recording');
  };

  const updateBackendUrl = (url) => {
    setBackendUrl(url);
  };

  return (
    <ConnectionContext.Provider value={{
      backendUrl, updateBackendUrl,
      connected, espConnected,
      chartData, wordHistory,
      isRecording, recordStats, startRecording, stopRecording
    }}>
      {children}
    </ConnectionContext.Provider>
  );
}

export const useConnection = () => useContext(ConnectionContext);
