
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, User, Briefcase, CalendarClock, 
  Bell, LogOut, Menu, X
} from 'lucide-react';
import { JobCard } from '@/components/JobCard';
import { WorkerCard } from '@/components/WorkerCard';
import { PaymentTracker } from '@/components/PaymentTracker';

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userType, setUserType] = React.useState<'worker' | 'employer'>('worker');
  
  // Toggle between worker and employer view (for demo purposes)
  const toggleUserType = () => {
    setUserType(prev => prev === 'worker' ? 'employer' : 'worker');
  };

  // Dummy data for demonstration
  const upcomingJobs = [
    {
      id: 1,
      title: "Construction Helper",
      location: "Whitefield, Bangalore",
      date: "Tomorrow, 7:00 AM - 4:00 PM",
      wage: "₹650 per day",
      employer: "MK Constructions",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Plumbing Work",
      location: "HSR Layout, Bangalore",
      date: "Wed, Sep 15, 9:00 AM - 2:00 PM",
      wage: "₹800 per day",
      employer: "Urban Homes",
      status: "pending",
    }
  ];

  const nearbyWorkers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      skills: ["Painting", "Carpentry"],
      rating: 4.8,
      experience: "5 years",
      location: "2.5 km away",
      availability: "Available now",
      verified: true,
    },
    {
      id: 2,
      name: "Sunil Verma",
      skills: ["Plumbing", "Electrical"],
      rating: 4.6,
      experience: "3 years",
      location: "1.8 km away",
      availability: "Available tomorrow",
      verified: true,
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar (desktop) */}
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
      
      {/* Main content */}
      <div className="flex-grow flex flex-col">
        {/* Mobile header */}
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
          
          {/* Mobile menu */}
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
        
        {/* Main content */}
        <main className="flex-grow p-4 md:p-6 overflow-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                  {userType === 'worker' 
                    ? 'Find jobs and manage your schedule' 
                    : 'Find workers and manage your job posts'}
                </p>
              </div>
              
              {/* For demo purposes: toggle between worker and employer views */}
              <Button onClick={toggleUserType}>
                Switch to {userType === 'worker' ? 'Employer' : 'Worker'} View
              </Button>
            </div>
            
            {/* Demo alert */}
            <div className="bg-amber-100 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800 text-sm">
                This is a demo dashboard. In a real application, users would only see either the worker or employer view based on their account type.
              </p>
            </div>
            
            {/* Weekly payment tracker */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Weekly Earnings</h2>
              <PaymentTracker />
            </div>
            
            {/* Worker view */}
            {userType === 'worker' && (
              <>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Upcoming Jobs</h2>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {upcomingJobs.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Button className="w-full">Find More Jobs</Button>
                  </div>
                </div>
              </>
            )}
            
            {/* Employer view */}
            {userType === 'employer' && (
              <>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Nearby Available Workers</h2>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {nearbyWorkers.map(worker => (
                      <WorkerCard key={worker.id} worker={worker} />
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Button className="w-full">Post a New Job</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
