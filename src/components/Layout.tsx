
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-6">
          <SidebarTrigger className="mr-4 lg:hidden" />
          <h1 className="text-xl font-semibold font-serif text-journal-deep-purple">Journal AI Alchemy</h1>
        </header>
        <main className="flex-1 overflow-auto bg-journal-soft-bg dark:bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
