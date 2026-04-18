import { useConnection } from '../../contexts/ConnectionContext';
import { Activity, Zap } from 'lucide-react';
import GradientText from '../ui/GradientText';

export default function TopHeader() {
  const { connected, espConnected } = useConnection();

  return (
    <header className="sticky top-0 z-50 w-full glass px-6 py-4 flex justify-between items-center bg-card/80 border-b border-white/5">
      <div className="flex items-center space-x-3">
        <Activity className="text-primary w-8 h-8 animate-pulse" />
        <h1 className="text-2xl font-tech font-bold tracking-wider">
          <GradientText>NeuroSpeak</GradientText>
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold font-sans flex items-center space-x-2 border ${connected ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          <span>Backend</span>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold font-sans flex items-center space-x-2 border ${espConnected ? 'bg-primary/10 text-primary border-primary/30' : 'bg-warning/10 text-warning border-warning/30'}`}>
          <Zap className="w-3 h-3" />
          <span>{espConnected ? 'ESP32 Live' : 'ESP32 Wait'}</span>
        </div>
      </div>
    </header>
  );
}
