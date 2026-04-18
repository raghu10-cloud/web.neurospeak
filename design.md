# NeuroSpeak Frontend Architectural Design

## 1. Core Framework & Technologies
- **UI Architecture**: Built using React.js and scaffolded by Vite for fast hot module replacement and optimized building.
- **Styling**: Tailwind CSS is used for rapid, utility-first UI design focusing on a modern, dark-themed dashboard look (e.g., `#00f3ff` glowing text, `/10` backdrop blurs, etc.).
- **Real-Time Engine**: `socket.io-client` natively connects to a local backend `http://localhost:8000` to stream bi-directional live sockets.
- **Graphing Engine**: `recharts` dictates real-time graphing, leaning into optimized SVGs and stripped-out animations to safely display hardware data sequentially.

---

## 2. Global State & App Logic (`App.jsx`)
The main `App.jsx` entry script maintains shared system states and directs data layout:
- **Connection Diagnostics**: Manages distinct states representing logical backend connection (`connected`) and hardware connectivity (`espConnected`) using Socket.IO events.
- **Real-Time Hooks**: Prunes high-frequency streamed EMG socket events dropping continuously into `setChartData`. It artificially caps array lengths out to `150 points` for each sensor to simulate ~30Hz screen refreshes.
- **Biometric Auditory Feedback (`playAudioCue`)**: Dual-mode alerting is built into words triggers:
  1. A low-level 100ms 880Hz (A5) beeping sine wave played via the Web `AudioContext` browser APIs.
  2. System-level `window.speechSynthesis` Text-To-Speech TTS which verbalizes the exact parsed word in the host's native screen-reader voice.
- **Diagnostic Recording**: Includes UI buttons to actively emit `start_recording` or `stop_recording` socket commands to test envelope bounds or peak limits. 

---

## 3. Page Structure
The SPA utilizes a manual state-driven tab system allowing navigation among multiple pages without reloading.

### A. Real-Time Dashboard (`activeTab === 'dashboard'`)
The main operational workspace during live data monitoring. Features include:
1. **Dynamic Highlighting (`WordDisplay.jsx`)**: 
   - Uses `history` props to flash scaling opacity/sizing animations immediately once a triggered word updates.
   - Pushes previous words down an auto-scrolling log array known as the **Detection Feed**.
2. **Recording Stats HUD**: Renders backend envelopes dynamically, outlining real-time Minimums, Maximums, and average "Envelope" states immediately parsed for all 3 sensors on stop.
3. **Stacked Oscilloscopes**: Mounts three independent graphs representing precise biological placements.

### B. Configuration Page (`activeTab === 'config'`)
Located inside `WordConfigTab.jsx`, this page exposes a full CRUD interface linking the model criteria to the Database layout:
1. **Idle Noise Threshold Modeler**: Exposes `min`/`max` fields representing values per-graph. When sensors fall in these generic bounds concurrently, the backend disables downstream Firebase syncing routines to radically save bandwidth during human silence.
2. **Rule Based Prioritization Engine**: Exposes active words with numerical 'priority'. Lower priority gets verified before higher priority checks.
3. **Compound Conditions Builder**: Adds `[v1, v2, v3] [> , < , == , !=] [value]` dynamically. Users can lock arrays of distinct thresholds that MUST be met together logically to yield the trigger event for the backend rule parser.

---

## 4. Visual Graphs (`EMGChart.jsx`)
Graphs render individual real-time `<LineChart>` containers tracking 150 independent timeframes.
- **Sensor 1 (Jaw/Back Ear)**: Cyan (`#00f3ff`)
- **Sensor 2 (Chin)**: Pink (`#ff006e`)
- **Sensor 3 (Temporal/Ear)**: Purple (`#8b5cf6`)

**Graph Behaviors**:
- Responsive Width holding 200px Height bounds (`<ResponsiveContainer>`).
- Auto-Scaling domain for Y-Axis preventing clipping of random spikes.
- `<ReferenceLine>` attributes visually project dashed lines directly masking over the incoming wave (Red indicating exact Maximum Noise bounds, Yellow indicating exact Minimum bounds) letting users calibrate electrodes easily to standard levels.
- **Hardware Acceleration**: Explicitly turns off the `<Line isAnimationActive={false}>` component and prevents graphing `dots` to handle heavy point-loading arrays seamlessly.
