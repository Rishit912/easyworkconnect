
import React from 'react';
import { Button } from '@/components/ui/button';
import WorkerCard from '@/components/WorkerCard';

// Define the worker type
interface Worker {
  id: string | number;
  name: string;
  skills: string[];
  rating: number;
  experience: string;
  location: string;
  availability: string;
  verified: boolean;
}

interface EmployerViewProps {
  workers: Worker[];
}

const EmployerView: React.FC<EmployerViewProps> = ({ workers }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Nearby Available Workers</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div className="grid gap-4">
        {workers.map(worker => (
          <WorkerCard
            key={worker.id}
            id={worker.id.toString()}
            name={worker.name}
            avatar="/placeholder.svg"
            occupation={worker.skills[0]}
            skills={worker.skills}
            rating={worker.rating}
            reviews={Math.floor(Math.random() * 50) + 10}
            location={worker.location}
            experience={worker.experience}
            available={worker.availability.includes('now') ? 'immediately' : 'today'}
            verified={worker.verified}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <Button className="w-full">Post a New Job</Button>
      </div>
    </div>
  );
};

export default EmployerView;
