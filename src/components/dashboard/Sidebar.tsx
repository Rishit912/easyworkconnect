
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, User, Briefcase, CalendarClock, Bell, LogOut
} from 'lucide-react';

interface SidebarProps {
  userType: 'worker' | 'employer';
}

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card">
      <div className="p-4 border-b">
        <Link to="/" className="text-xl font-semibold text-primary">
          EasyWork<span className="text-black">Connect</span>
        </Link>
      </div>
      
      <nav className="flex-grow p-4">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          {userType === 'worker' ? (
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" />
              My Jobs
            </Button>
          ) : (
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" />
              Posted Jobs
            </Button>
          )}
          <Button variant="ghost" className="w-full justify-start">
            <CalendarClock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
