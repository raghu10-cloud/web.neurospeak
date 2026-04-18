export default function GridScan({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background linear grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 243, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 243, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Sweeping scanline */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary/80 shadow-[0_0_15px_#00f3ff] animate-scan-vertical pointer-events-none z-0"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>

      <style>{`
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(10000%); opacity: 0; }
        }
        .animate-scan-vertical {
          animation: scan-vertical 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
