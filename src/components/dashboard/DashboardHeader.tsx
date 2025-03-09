
import React from 'react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  userType: 'worker' | 'employer';
  toggleUserType: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userType, toggleUserType }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {userType === 'worker' 
              ? 'Find jobs and manage your schedule' 
              : 'Find workers and manage your job posts'}
          </p>
        </div>
        
        <Button onClick={toggleUserType}>
          Switch to {userType === 'worker' ? 'Employer' : 'Worker'} View
        </Button>
      </div>
      
      <div className="bg-amber-100 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-amber-800 text-sm">
          This is a demo dashboard. In a real application, users would only see either the worker or employer view based on their account type.
        </p>
      </div>
    </>
  );
};

export default DashboardHeader;
