import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Fingerprint } from 'lucide-react';
import PixelBlastBackground from '../components/background/PixelBlastBackground';
import GradientText from '../components/ui/GradientText';

export default function Login() {
  const navigate = useNavigate();

  const handleUnlock = () => {
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <PixelBlastBackground />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass p-12 rounded-3xl max-w-md w-full text-center relative z-10 border border-primary/20 bg-card/60"
      >
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 neon-border-primary">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-4xl font-tech font-bold mb-2">
          <GradientText>NeuroSpeak</GradientText>
        </h1>
        <p className="text-textSecondary mb-8 text-sm">Silent Speech AI Interface v2.0</p>
        
        <button 
          onClick={handleUnlock}
          className="w-full relative group bg-background border border-primary/40 p-4 rounded-xl flex justify-center items-center space-x-3 overflow-hidden transition-all duration-300 hover:border-primary/80 neon-border-primary"
        >
          <div className="absolute inset-0 bg-primary/10 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
          <Fingerprint className="w-6 h-6 text-primary group-hover:animate-pulse relative z-10" />
          <span className="font-bold text-primary tracking-widest uppercase relative z-10">Initialize System</span>
        </button>
      </motion.div>
    </div>
  );
}
