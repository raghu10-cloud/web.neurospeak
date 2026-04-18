import { Outlet } from 'react-router-dom';
import TopHeader from '../components/layout/TopHeader';
import BottomPillNav from '../components/layout/BottomPillNav';
import SoftAurora from '../components/background/SoftAurora';

export default function MainLayout() {
  return (
    <div className="relative min-h-screen pb-24">
      <SoftAurora />
      <TopHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Outlet />
      </main>
      <BottomPillNav />
    </div>
  );
}
