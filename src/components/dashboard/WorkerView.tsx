
import React from 'react';
import { Button } from '@/components/ui/button';
import JobCard from '@/components/JobCard';

// Define the job type
interface Job {
  id: string | number;
  title: string;
  location: string;
  date: string;
  wage: string;
  employer: string;
  status: string;
}

interface WorkerViewProps {
  jobs: Job[];
}

const WorkerView: React.FC<WorkerViewProps> = ({ jobs }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Upcoming Jobs</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div className="grid gap-4">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            id={job.id.toString()}
            title={job.title}
            employerName={job.employer}
            employerVerified={true}
            location={job.location}
            wage={{
              amount: parseInt(job.wage.replace(/[^0-9]/g, '')),
              period: 'daily'
            }}
            timing={{
              type: 'one-time',
              duration: job.date
            }}
            category="Construction"
            postedAt={new Date()}
            urgentHiring={job.status === 'urgent'}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <Button className="w-full">Find More Jobs</Button>
      </div>
    </div>
  );
};

export default WorkerView;
