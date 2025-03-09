
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, User, Briefcase, CalendarClock, Bell, LogOut, Menu, X
} from 'lucide-react';

interface MobileMenuProps {
  userType: 'worker' | 'employer';
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  userType, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  return (
    <header className="md:hidden border-b p-4 bg-card">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-primary">
          EasyWork<span className="text-black">Connect</span>
        </Link>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {mobileMenuOpen && (
        <nav className="mt-4 border-t pt-4">
          <div className="space-y-3">
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
            <Button variant="outline" className="w-full" asChild>
              <Link to="/">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default MobileMenu;
