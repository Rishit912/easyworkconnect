
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import MobileMenu from '@/components/dashboard/MobileMenu';
import WorkerView from '@/components/dashboard/WorkerView';
import EmployerView from '@/components/dashboard/EmployerView';
import PaymentTrackerSection from '@/components/dashboard/PaymentTrackerSection';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userType, setUserType] = React.useState<'worker' | 'employer'>('worker');
  
  const toggleUserType = () => {
    setUserType(prev => prev === 'worker' ? 'employer' : 'worker');
  };

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
      <Sidebar userType={userType} />
      
      <div className="flex-grow flex flex-col">
        <MobileMenu 
          userType={userType}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        <main className="flex-grow p-4 md:p-6 overflow-auto">
          <div className="mb-8">
            <DashboardHeader 
              userType={userType}
              toggleUserType={toggleUserType}
            />
            
            <PaymentTrackerSection userType={userType} />
            
            {userType === 'worker' && <WorkerView jobs={upcomingJobs} />}
            
            {userType === 'employer' && <EmployerView workers={nearbyWorkers} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
