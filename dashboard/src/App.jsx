import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConnectionProvider } from './contexts/ConnectionContext';

import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WordsConfig from './pages/WordsConfig';
import Automate from './pages/Automate';
import Settings from './pages/Settings';
import About from './pages/About';

function App() {
  return (
    <ConnectionProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/words" element={<WordsConfig />} />
            <Route path="/automate" element={<Automate />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Route>
          
          {/* Default redirect to login for aesthetic unlock flow */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConnectionProvider>
  );
}

export default App;
