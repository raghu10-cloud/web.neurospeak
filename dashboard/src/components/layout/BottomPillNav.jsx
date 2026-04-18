import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Brain, Zap, Settings, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomPillNav() {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/words', label: 'Words', icon: Brain },
    { path: '/automate', label: 'Automate', icon: Zap },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="glass rounded-full px-2 py-2 flex items-center space-x-2 bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl shadow-primary/10">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-semibold transition-all duration-300 ${
                isActive ? 'text-background' : 'text-textSecondary hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="pill-active-bg"
                    className="absolute inset-0 bg-primary rounded-full neon-border-primary"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-background' : ''}`} />
                <span className="relative z-10 hidden md:block">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
