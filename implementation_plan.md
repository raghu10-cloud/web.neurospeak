# NeuroSpeak PWA Dashboard Rebuild

Rebuild the current NeuroSpeak frontend into a futuristic, high-performance PWA dashboard using modern web aesthetics (glassmorphism + neon styling), complete with dynamic animations and an expanded feature set. This will transform the dashboard from a prototype to a production-ready, assistive AT control system.

## Remote Hosting & Local Processing Architecture
You asked: **"I am planning to host the website remotely and the laptop is only depended for server processing. How can we do it? If server changes how will we handle IP?"**

> [!TIP]
> **Dynamic Connection Architecture**
> Because the backend (Python) runs on your local laptop but the frontend (React) will be hosted on the web (e.g., Vercel or Netlify), the frontend code runs in the user's browser, not on the server.
>
> **The Solution:** We will build a **Backend URL configuration** into the new **Settings** page. 
> 1. By default, it will attempt to connect to `http://localhost:8000` (if you are running the browser on the laptop).
> 2. If you open it from a tablet/phone, you can enter the laptop's Local IP (e.g., `http://192.168.1.15:8000`) into the Settings page. This will be saved in the browser's `localStorage`.
> 3. **If you change networks/IPs**: You simply update the IP in the Settings tab.
> 4. **For remote access over the internet**: You will run `ngrok http 8000` on your laptop, which gives you a public link (like `https://xyz.ngrok.io`). You paste that link into the Settings tab on your hosted website!

## User Review Required
> [!IMPORTANT]
> - Do you want to use **React Router** for real URL pathways (e.g., `/dashboard`, `/login`, `/automate`), or keep it as a Single Page state-driven tab system (like it is currently) so it feels strictly like an app?
> - Are the React Bits (`npx shadcn@latest add @react-bits/PixelBlast-JS-CSS`, etc.) strictly to be installed via `shadcn`, or can I implement them traditionally if resolving `shadcn` CLI issues limits us?

## Proposed Changes

### Configuration & Tooling
#### [MODIFY] `dashboard/package.json`
- Install `lucide-react`, `recharts`, `react-router-dom` (optional for deep-linking), `@vitejs/plugin-pwa` for PWA manifest and caching, and `tailwind-merge` + `clsx` for Shadcn.

#### [MODIFY] `dashboard/tailwind.config.js`
- Configure the strict color palette (`#020617`, `#00F3FF`, `#8B5CF6`, `#FF006E`, `#FACC15`).
- Add fonts `Poppins`, `Inter`, and `Orbitron`.

### Application State & Routing
#### [NEW] `dashboard/src/contexts/ConnectionContext.jsx`
- Handle `socket.io-client` state globally.
- Persist Backend URL mapping utilizing `localStorage` to resolve the Remote vs Local IP hosting issues.

### Components Layer
#### [NEW] `dashboard/src/components/layout/TopHeader.jsx`
- Sticky header containing the Logo, GradientText Title, and Connection Indicator.

#### [NEW] `dashboard/src/components/layout/BottomPillNav.jsx`
- Implement `@react-bits/PillNav` design centered at the bottom or top center for Tab routing.

#### [NEW] `dashboard/src/components/background/PixelBlastBackground.jsx`
- Integrate pixel blast logic running exclusively behind the login and dashboard.

### Pages
#### [NEW] `dashboard/src/pages/Login.jsx`
- Email/Password form overlay with futuristic glow and neon button to access the dashboard.

#### [NEW] `dashboard/src/pages/Dashboard.jsx` (Refactored)
- Top Status bar.
- Word detection scaling UI at the top.
- Middle panel aligns 3 `<EMGChart>` components strictly in `flex-row md:grid md:grid-cols-3` to keep them inline.
- Removes all dots/animations to enforce 30FPS hardware-accelerated charting.

#### [NEW] `dashboard/src/pages/WordsConfig.jsx` (Refactored)
- UI upgrade of current configuration layout prioritizing logic-building visuals (AND/OR trees).

#### [NEW] `dashboard/src/pages/Automate.jsx` 
- New Smart Device Control panel.
- Card grid associating words with fake IoT functionality toggles to simulate smart-home automation.

#### [NEW] `dashboard/src/pages/Settings.jsx`
- Firebase toggles, Offline mode state, and **Crucially: The dynamic Backend Server URL form** to support remote hosting.

#### [NEW] `dashboard/src/pages/About.jsx`
- Static architectural breakdown to address problem statement and project goals.

## Open Questions
- By logging in, do you need an actual Firebase Authentication flow or simply a mocked visual lock screen for the demo?

## Verification Plan
### Automated Tests
- Run `npm run dev` to verify complete lack of compile errors.
- Lighthouse PWA run in Edge/Chrome to verify Installable functionality.

### Manual Verification
- Simulate dummy backend connection to verify Graphs render smoothly.
- Resize viewport to confirm mobile-first tablet responsiveness for the 3 sequential charts.
