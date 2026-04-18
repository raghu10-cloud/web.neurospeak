import { Fingerprint, Quote, Link } from 'lucide-react';
import GradientText from '../components/ui/GradientText';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-20">
      
      <div className="text-center mb-12 flex flex-col items-center">
         <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            <Fingerprint className="w-10 h-10 text-primary" />
         </div>
         <h1 className="text-5xl font-tech font-bold mb-4">
            <GradientText>NeuroSpeak AI</GradientText>
         </h1>
         <p className="text-lg text-textSecondary max-w-2xl">
            A real-time, non-invasive assistive technology system designed to decode sub-vocalizations directly from facial electromyography (EMG) signals.
         </p>
      </div>

      <div className="glass p-8 rounded-2xl border border-secondary/20 relative overflow-hidden mb-8">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <Quote className="w-32 h-32 text-secondary" />
         </div>
         <h2 className="text-2xl font-tech font-bold text-secondary mb-4 relative z-10">The Problem</h2>
         <p className="text-textSecondary leading-relaxed relative z-10">
            For individuals suffering from conditions like ALS, locked-in syndrome, or severe vocal cord damage, traditional communication methods become impossible. High-end eye trackers are expensive and exhausting, while BCI (Brain-Computer Interfaces) are highly invasive and experimental.
         </p>
         <h2 className="text-2xl font-tech font-bold text-secondary mt-8 mb-4 relative z-10">Our Solution</h2>
         <p className="text-textSecondary leading-relaxed relative z-10">
            NeuroSpeak utilizes ultra-sensitive surface electrodes placed strategically on the jaw, chin, and temporal muscles. Even when a user cannot physically speak or move their lips, their brain still sends micro-electrical signals to the vocal tract when they "think" or sub-vocalize a word. 
            <br/><br/>
            By capturing these signals at 1000Hz, streaming them over TCP natively to an Edge AI Engine, and filtering the envelopes in real-time, we provide an affordable, highly-accurate method of generating speech and controlling IoT hardware systems seamlessly.
         </p>
      </div>

      <div className="flex justify-center mt-12">
         <a href="https://github.com/raghu10-cloud" target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-textSecondary hover:text-white transition group">
            <Link className="w-5 h-5 group-hover:text-primary transition" />
            <span className="font-mono text-sm border-b border-transparent group-hover:border-primary transition">raghu10-cloud / NeuroSpeak</span>
         </a>
      </div>

    </div>
  );
}
