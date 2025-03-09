
import React from 'react';
import CompactWorkerCard from './worker/CompactWorkerCard';
import DetailedWorkerCard from './worker/DetailedWorkerCard';

interface WorkerCardProps {
  id: string;
  name: string;
  avatar: string;
  occupation: string;
  skills: string[];
  location: string;
  experience: string;
  rating: number;
  reviews: number;
  available: 'immediately' | 'today' | 'tomorrow' | 'this-week';
  verified: boolean;
  verificationLevel?: 'basic' | 'complete' | 'premium';
  variant?: 'default' | 'compact';
  className?: string;
}

const WorkerCard: React.FC<WorkerCardProps> = (props) => {
  const { variant = 'default' } = props;
  
  if (variant === 'compact') {
    return <CompactWorkerCard {...props} />;
  }
  
  return <DetailedWorkerCard {...props} />;
};

export default WorkerCard;
