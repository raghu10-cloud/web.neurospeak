import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function EMGChart({ data, title, color, idleBounds }) {
  return (
    <div className="glass rounded-xl p-4 md:p-6 w-full flex flex-col items-center">
      <h3 className="text-sm md:text-md lg:text-lg font-bold mb-4 font-tech tracking-wider w-full text-left" style={{ color, textShadow: `0 0 10px ${color}80` }}>
        {title}
      </h3>
      <div className="w-full h-48 sm:h-56 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" domain={['dataMin', 'dataMax']} hide />
            <YAxis domain={['auto', 'auto']} stroke="#475569" tick={{fill: '#94A3B8', fontSize: 12}} width={45} />
            
            {/* Draw Idle Thresholds if provided */}
            {idleBounds && (
              <>
                <ReferenceLine y={idleBounds.max} stroke="#FF006E" strokeDasharray="3 3" opacity={0.6} label={{ position: 'top', value: 'MAX', fill: '#FF006E', fontSize: 10}}/>
                <ReferenceLine y={idleBounds.min} stroke="#FACC15" strokeDasharray="3 3" opacity={0.6} label={{ position: 'bottom', value: 'MIN', fill: '#FACC15', fontSize: 10}}/>
              </>
            )}
            
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              className="drop-shadow-lg"
              filter={`drop-shadow(0px 0px 4px ${color})`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
