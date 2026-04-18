import { useConnection } from '../contexts/ConnectionContext';
import EMGChart from '../components/dashboard/EMGChart';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { 
    chartData, wordHistory, 
    isRecording, recordStats, startRecording, stopRecording,
    connected 
  } = useConnection();
  
  const [idleConfig, setIdleConfig] = useState(null);

  // Load idle config to power visual thresh-lines
  useEffect(() => {
    if(!connected) return;
    fetch('http://localhost:8000/words') // Will eventually map to backendURL from settings, but safe for localhost default here
      .then(r => r.json())
      .then(data => {
        if(data.idle_ranges) {
          setIdleConfig(data.idle_ranges);
        }
      })
      .catch(e => console.error(e));
  }, [connected]);

  const mostRecentWord = wordHistory.length > 0 ? wordHistory[0].word : '---';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Section: Word Display & Connection Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Large Word Display */}
        <div className="lg:col-span-2 glass rounded-2xl p-8 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4 absolute top-6 left-6 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Live Decoder Engine</span>
          </h2>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={mostRecentWord}
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
              transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
              className="z-10"
            >
              <h1 className={`text-6xl md:text-8xl font-tech font-bold ${mostRecentWord !== '---' ? 'text-alert drop-shadow-[0_0_30px_rgba(255,0,110,0.8)]' : 'text-textSecondary/50'}`}>
                {mostRecentWord}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Small Detection Feed Box */}
        <div className="glass rounded-2xl p-6 flex flex-col h-[250px] overflow-hidden">
          <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4 flex items-center border-b border-white/10 pb-2">
            <Activity className="w-4 h-4 mr-2" /> Detection Feed
          </h3>
          <ul className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {wordHistory.map((entry, idx) => (
              <motion.li 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={idx} 
                className={`flex justify-between items-center p-3 rounded-xl border ${idx === 0 ? 'bg-primary/20 border-primary/50 text-white shadow-[0_0_15px_rgba(0,243,255,0.2)]' : 'bg-white/5 border-white/5 text-textSecondary'}`}
              >
                <span className={`font-bold font-tech ${idx === 0 ? 'text-primary text-lg' : 'text-sm'}`}>{entry.word}</span>
                <span className="text-xs font-mono opacity-70">{entry.timestamp}</span>
              </motion.li>
            ))}
            {wordHistory.length === 0 && (
              <li className="text-center text-textSecondary/50 mt-10">Awaiting Subvocalization...</li>
            )}
          </ul>
        </div>
      </div>

      {/* Middle Section: The 3 Inline Graphs */}
      {/* User requested: All 3 graphs aligned in ONE row with equal spacing */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <EMGChart data={chartData.sensor1} title="Sensor 1: Jaw/Back Ear" color="#00F3FF" idleBounds={idleConfig?.v1} />
        <EMGChart data={chartData.sensor2} title="Sensor 2: Chin" color="#FF006E" idleBounds={idleConfig?.v2} />
        <EMGChart data={chartData.sensor3} title="Sensor 3: Temporal/Ear" color="#8B5CF6" idleBounds={idleConfig?.v3} />
      </div>

      {/* Bottom Section: Recording HUD */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          <div className="flex-1">
            <h3 className="text-xl font-bold font-tech mb-2">Diagnostic Recording</h3>
            <p className="text-sm text-textSecondary mb-6">Create high-precision data envelopes to calibrate offline configurations or evaluate baseline peak amplitudes.</p>
            
            {!isRecording ? (
              <button onClick={startRecording} className="group relative w-full md:w-auto overflow-hidden rounded-xl bg-alert/20 px-8 py-4 text-alert border border-alert/50 transition-all hover:bg-alert hover:text-white neon-border-primary">
                <span className="relative z-10 flex items-center justify-center font-bold tracking-widest uppercase">
                  <Play className="w-5 h-5 mr-3 fill-current" /> Start Calibration
                </span>
                <div className="absolute inset-0 bg-alert w-0 transition-all group-hover:w-full duration-300 ease-out z-0"></div>
              </button>
            ) : (
              <button onClick={stopRecording} className="animate-pulse w-full md:w-auto rounded-xl bg-white/10 px-8 py-4 text-white border border-white/30 transition-all hover:bg-white/20 flex items-center justify-center font-bold tracking-widest uppercase">
                <Square className="w-5 h-5 mr-3 fill-current text-alert" /> Stop & Analyze
              </button>
            )}
          </div>

          {recordStats && (
            <div className="flex-2 w-full grid grid-cols-3 gap-4">
              {['v1', 'v2', 'v3'].map((ch, idx) => {
                const colors = ['text-primary', 'text-alert', 'text-secondary'];
                return (
                  <div key={ch} className="bg-background/80 p-4 rounded-xl border border-white/5 shadow-inner">
                    <h4 className={`font-bold font-tech text-xs mb-3 uppercase tracking-wider ${colors[idx]}`}>CH {idx + 1}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs"><span className="text-textSecondary">Min:</span><span className="font-mono">{recordStats[ch].min}</span></div>
                      <div className="flex justify-between text-xs"><span className="text-textSecondary">Max:</span><span className="font-mono">{recordStats[ch].max}</span></div>
                      <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                        <span className="text-xs text-textSecondary uppercase tracking-widest">Envelope</span>
                        <span className="font-mono font-bold text-green-400">{recordStats[ch].envelope}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
