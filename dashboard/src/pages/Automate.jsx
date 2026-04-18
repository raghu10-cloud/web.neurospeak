import { useState, useEffect } from 'react';
import { Power, Lightbulb, Fan, Phone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Automate() {
  const [rules, setRules] = useState([
    { id: 1, word: 'HELP', action: 'call', target: 'Emergency Contact (+1)', enabled: true, simulatedState: false },
    { id: 2, word: 'LIGHT', action: 'light', target: 'Bedroom Hue', enabled: true, simulatedState: true },
    { id: 3, word: 'FAN', action: 'fan', target: 'Ceiling Fan', enabled: false, simulatedState: false },
  ]);

  const toggleRule = (id) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const simulateTrigger = (id) => {
    setRules(rules.map(r => r.id === id ? { ...r, simulatedState: !r.simulatedState } : r));
  };

  const getActionIcon = (action, state) => {
    switch(action) {
      case 'light': return <Lightbulb className={`w-8 h-8 ${state ? 'text-warning fill-warning/20' : 'text-textSecondary'}`} />;
      case 'fan': return <Fan className={`w-8 h-8 ${state ? 'text-primary animate-spin' : 'text-textSecondary'}`} />;
      case 'call': return <Phone className={`w-8 h-8 ${state ? 'text-alert animate-bounce' : 'text-textSecondary'}`} />;
      default: return <Zap className={`w-8 h-8 ${state ? 'text-secondary' : 'text-textSecondary'}`} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex justify-between items-center glass p-6 rounded-2xl border-primary/20">
        <div>
          <h2 className="text-3xl font-tech font-bold text-white mb-2">Smart Automation Module</h2>
          <p className="text-textSecondary text-sm">Bind sub-vocalized triggers directly to IoT external devices and API webhooks.</p>
        </div>
        <button className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 px-6 py-3 rounded-xl font-bold transition">
          + Add Macro Action
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rules.map((rule) => (
          <motion.div 
            key={rule.id}
            layout
            className={`glass p-6 rounded-2xl transition-all border ${rule.enabled ? 'border-primary/30 shadow-[0_0_15px_rgba(0,243,255,0.05)]' : 'border-white/5 opacity-50 grayscale'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div 
                className={`p-3 rounded-xl transition-all duration-300 ${rule.simulatedState && rule.enabled ? 'bg-white/10 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-transparent'}`}
                onClick={() => rule.enabled && simulateTrigger(rule.id)}
              >
                {getActionIcon(rule.action, rule.simulatedState)}
              </div>
              
              <button 
                onClick={() => toggleRule(rule.id)}
                className={`w-12 h-6 rounded-full transition-colors relative ${rule.enabled ? 'bg-primary' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${rule.enabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="space-y-1 mb-6">
              <h3 className="font-bold text-xl text-white">{rule.target}</h3>
              <p className="text-sm text-textSecondary capitalize">IoT Action: {rule.action}</p>
            </div>

            <div className="bg-card/50 rounded-lg p-3 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-textSecondary uppercase tracking-widest">Trigger Word</span>
              <span className={`font-tech font-bold px-2 py-1 bg-white/5 rounded ${rule.enabled ? 'text-alert' : 'text-textSecondary'}`}>
                {rule.word}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
