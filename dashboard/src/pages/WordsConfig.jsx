import { useState, useEffect } from 'react';
import { Settings2, Plus, Trash2, Cpu } from 'lucide-react';
import { useConnection } from '../contexts/ConnectionContext';

export default function WordsConfig() {
  const { backendUrl } = useConnection();
  
  const [words, setWords] = useState([]);
  const [idleRanges, setIdleRanges] = useState({
    v1: { min: -912, max: 854 },
    v2: { min: -514, max: 518 },
    v3: { min: -577, max: 584 }
  });
  const [loading, setLoading] = useState(true);

  // New Builder State
  const [newWord, setNewWord] = useState('');
  const [newPriority, setNewPriority] = useState(10);
  const [newConditions, setNewConditions] = useState([{ sensor: 'v1', operator: '>', value: 2000 }]);

  const loadWords = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/words`);
      const data = await res.json();
      setWords(data.words || []);
      if (data.idle_ranges) setIdleRanges(data.idle_ranges);
    } catch (err) {
      console.error('Failed to fetch from backendUrl', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWords();
  }, [backendUrl]);

  const saveToServer = async (idleData, wordsData) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/words`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idle_ranges: idleData, words: wordsData })
      });
      const data = await res.json();
      setWords(data.words || []);
      if (data.idle_ranges) setIdleRanges(data.idle_ranges);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleIdleChange = (sensor, field, val) => {
    setIdleRanges(prev => ({
      ...prev,
      [sensor]: { ...prev[sensor], [field]: Number(val) }
    }));
  };

  const handleRemoveCondition = (index) => {
    setNewConditions(newConditions.filter((_, i) => i !== index));
  };

  const handleConditionChange = (index, field, val) => {
    const updated = [...newConditions];
    if (field === 'value') val = Number(val);
    updated[index][field] = val;
    setNewConditions(updated);
  };

  const handleSaveNewWord = async () => {
    if (!newWord.trim()) return;
    const wordObj = {
      word: newWord.toUpperCase(),
      priority: Number(newPriority),
      conditions: newConditions
    };
    await saveToServer(idleRanges, [...words, wordObj]);
    setNewWord('');
    setNewPriority(10);
    setNewConditions([{ sensor: 'v1', operator: '>', value: 2000 }]);
  };

  const handleDeleteWord = async (indexToDelete) => {
    await saveToServer(idleRanges, words.filter((_, i) => i !== indexToDelete));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      
      {/* 1. Idle Threshold Matrix */}
      <div className="glass p-8 rounded-2xl relative overflow-hidden border border-warning/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Settings2 className="w-48 h-48 text-warning" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold font-tech mb-2 text-warning flex items-center">
            <Cpu className="mr-3 w-6 h-6" /> Idle Noise Calibration
          </h2>
          <p className="text-sm text-textSecondary mb-8 max-w-2xl">
            Strict Min/Max envelopes that define 'Human Silence'. The backend disables networking events when signals lie within these bounds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['v1', 'v2', 'v3'].map((sensor) => (
              <div key={sensor} className="bg-card/80 p-5 rounded-xl border border-white/5 shadow-inner">
                <h4 className="font-bold font-tech text-md mb-4 uppercase tracking-wider text-white">Ch {sensor.replace('v', '')} Tuning</h4>
                <div className="space-y-4">
                  <div>
                    <label className="flex justify-between text-xs text-textSecondary uppercase mb-1"><span>Minimum Threshold</span><span className="font-mono text-warning/70">{idleRanges[sensor]?.min}</span></label>
                    <input 
                      type="range" min="-2000" max="0" step="1"
                      value={idleRanges[sensor]?.min || 0}
                      onChange={(e) => handleIdleChange(sensor, 'min', e.target.value)}
                      className="w-full accent-warning cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-xs text-textSecondary uppercase mb-1"><span>Maximum Threshold</span><span className="font-mono text-alert/70">{idleRanges[sensor]?.max}</span></label>
                    <input 
                      type="range" min="0" max="2000" step="1"
                      value={idleRanges[sensor]?.max || 0}
                      onChange={(e) => handleIdleChange(sensor, 'max', e.target.value)}
                      className="w-full accent-alert cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={() => saveToServer(idleRanges, words)}
              className="bg-warning/20 text-warning hover:bg-warning hover:text-card font-bold py-3 px-8 rounded-xl transition-all border border-warning/50 uppercase tracking-widest relative"
              disabled={loading}
            >
              {loading ? 'Syncing Hardware...' : 'Sync Firmware Bounds'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 2. Rule Builder */}
        <div className="glass p-8 rounded-2xl border-primary/20">
          <h2 className="text-2xl font-bold font-tech mb-2 text-primary">Rules Engine Form</h2>
          <p className="text-sm text-textSecondary mb-6">Build complex AND/OR threshold gates strictly matching raw graph endpoints.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
             <div>
                <label className="block text-xs uppercase text-textSecondary mb-2">Target Word</label>
                <input 
                  className="w-full bg-card/80 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  value={newWord}
                  onChange={e => setNewWord(e.target.value)}
                  placeholder="e.g. YES"
                />
             </div>
             <div>
                <label className="block text-xs uppercase text-textSecondary mb-2">Priority [0=Highest]</label>
                <input 
                  type="number"
                  className="w-full bg-card/80 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 font-mono"
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value)}
                />
             </div>
          </div>

          <div className="space-y-3 mb-6">
            <label className="block text-xs uppercase text-textSecondary">Detection Conditions (ALL Required)</label>
            {newConditions.map((cond, idx) => (
              <div key={idx} className="flex space-x-2 animate-in slide-in-from-left-4">
                <select 
                  className="bg-card/80 border border-white/10 rounded-lg p-3 text-white outline-none w-1/3"
                  value={cond.sensor}
                  onChange={e => handleConditionChange(idx, 'sensor', e.target.value)}
                >
                  <option value="v1">v1 (Jaw)</option>
                  <option value="v2">v2 (Chin)</option>
                  <option value="v3">v3 (Temple)</option>
                </select>
                
                <select 
                  className="bg-card/80 border border-white/10 rounded-lg p-3 text-white font-mono text-center w-1/4 outline-none"
                  value={cond.operator}
                  onChange={e => handleConditionChange(idx, 'operator', e.target.value)}
                >
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                  <option value=">=">&gt;=</option>
                  <option value="<=">&lt;=</option>
                </select>
                
                <input 
                  type="number"
                  className="w-1/3 bg-card/80 border border-white/10 rounded-lg p-3 text-white font-mono outline-none"
                  value={cond.value}
                  onChange={e => handleConditionChange(idx, 'value', e.target.value)}
                />
                
                <button onClick={() => handleRemoveCondition(idx)} className="w-12 flex items-center justify-center bg-alert/20 border border-alert/30 text-alert rounded-lg hover:bg-alert hover:text-white transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            <button onClick={() => setNewConditions([...newConditions, { sensor: 'v1', operator: '>', value: 0 }])} className="text-secondary text-sm font-bold flex items-center hover:text-white transition mt-4">
              <Plus className="w-4 h-4 mr-1" /> Add Logical AND Condition
            </button>
          </div>

          <button 
            onClick={handleSaveNewWord}
            disabled={!newWord.trim() || loading}
            className="w-full bg-primary/20 hover:bg-primary text-primary hover:text-card transition-all font-bold tracking-widest uppercase p-4 rounded-xl border border-primary/50 relative overflow-hidden"
          >
            Deploy Logic Profile
          </button>
        </div>

        {/* 3. Active Triggers Tree */}
        <div className="glass p-8 rounded-2xl border flex flex-col h-[600px]">
          <h2 className="text-2xl font-bold font-tech mb-6 text-white border-b border-white/10 pb-4">Deployed Nodes</h2>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {words.map((w, idx) => (
              <div key={idx} className="bg-card/80 p-4 rounded-xl border border-white/5 hover:border-white/20 transition group flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-tech bg-white/10 text-textSecondary px-2 py-1 rounded">PR_{w.priority}</span>
                    <span className="font-bold text-xl text-primary drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]">{w.word}</span>
                  </div>
                  <button onClick={() => handleDeleteWord(idx)} className="text-textSecondary hover:text-alert transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {w.conditions.map((c, cdx) => (
                    <span key={cdx} className="bg-background px-3 py-1.5 rounded-lg border border-white/5 text-xs font-mono text-secondary">
                      {c.sensor} <span className="text-white mx-1">{c.operator}</span> {c.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {words.length === 0 && !loading && (
              <div className="text-center text-textSecondary/50 mt-10">No deployed nodes found on firmware.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
