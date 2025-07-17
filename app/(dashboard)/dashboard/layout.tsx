import SideNav from '@/app/ui/dashboard/sidenav';
import TopNavbar from '@/app/ui/dashboard/top-navbar';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen md:flex">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-none z-50 bg-white border-r shadow-md">
        <SideNav />
      </aside>

      {/* Konten utama + TopNavbar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar atas */}
        <header className="sticky top-0 z-40 bg-white">
          <TopNavbar />
        </header>

        {/* Konten */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
