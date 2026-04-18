import { useState } from 'react';
import { Network, Server, CloudOff, Database, CheckCircle2 } from 'lucide-react';
import { useConnection } from '../contexts/ConnectionContext';

export default function Settings() {
  const { backendUrl, updateBackendUrl, connected, espConnected } = useConnection();
  
  const [urlInput, setUrlInput] = useState(backendUrl);
  const [firebaseEnabled, setFirebaseEnabled] = useState(true);

  const handleSaveUrl = () => {
    updateBackendUrl(urlInput);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Network Configuration */}
      <div className="glass p-8 rounded-2xl border border-white/10">
        <div className="flex items-center space-x-3 mb-6 border-b border-white/5 pb-4">
          <Network className="text-secondary w-8 h-8" />
          <h2 className="text-2xl font-tech font-bold">Network & Routing Configurations</h2>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card/50 p-6 rounded-xl border border-white/5">
            <h3 className="font-bold text-white mb-2 flex items-center">
              <Server className="w-5 h-5 mr-2 text-primary" /> Edge Node Connection URL
            </h3>
            <p className="text-sm text-textSecondary mb-4">
              Enter the IP address of your core Laptop running the NeuroSpeak Python engine. If you are accessing this outside your local WiFi, paste your ngrok / localtunnel link here.
            </p>
            <div className="flex space-x-4">
              <input 
                type="text" 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 bg-background border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                placeholder="http://192.168.1.15:8000"
              />
              <button 
                onClick={handleSaveUrl}
                className="bg-primary/20 hover:bg-primary text-primary hover:text-card font-bold px-6 py-3 rounded-lg border border-primary/50 transition-all font-tech tracking-wider uppercase"
              >
                BIND IPC
              </button>
            </div>
            
            <div className="mt-4 flex items-center space-x-6 text-sm">
               <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${connected ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`}></span>
                  <span className="text-textSecondary">Backend Node: <strong className="text-white">{connected ? 'UP' : 'OFFLINE'}</strong></span>
               </div>
               <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${espConnected ? 'bg-primary shadow-[0_0_8px_#00f3ff]' : 'bg-warning shadow-[0_0_8px_#facc15]'}`}></span>
                  <span className="text-textSecondary">ESP32 Hardware: <strong className="text-white">{espConnected ? 'STREAMING' : 'IDLE'}</strong></span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Configuration */}
      <div className="glass p-8 rounded-2xl border border-white/10">
        <div className="flex items-center space-x-3 mb-6 border-b border-white/5 pb-4">
          <Database className="text-alert w-8 h-8" />
          <h2 className="text-2xl font-tech font-bold">Cloud Telemetry & Database</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-card/50 p-6 rounded-xl border border-white/5 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white mb-1 flex items-center">
                <CheckCircle2 className={`w-5 h-5 mr-2 ${firebaseEnabled ? 'text-green-500' : 'text-textSecondary'}`} /> 
                Firebase Cloud Sync
              </h3>
              <p className="text-sm text-textSecondary">Enable remote webhook triggers for Universal Control integrations.</p>
            </div>
            
            <button 
              onClick={() => setFirebaseEnabled(!firebaseEnabled)}
              className={`w-16 h-8 rounded-full transition-colors relative ${firebaseEnabled ? 'bg-green-500' : 'bg-gray-700'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-all ${firebaseEnabled ? 'left-9' : 'left-1'}`}></div>
            </button>
          </div>

          {!connected && (
             <div className="bg-alert/10 border border-alert/30 p-4 rounded-xl flex items-start space-x-3">
               <CloudOff className="w-5 h-5 text-alert flex-shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-bold text-alert text-sm">Offline Mode Activated </h4>
                 <p className="text-xs text-alert/70 mt-1">
                   The React frontend has fallen back to offline mode. Telemetry charts are suspended until the Edge Node reconnects. All previously buffered configurations remain cached.
                 </p>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
