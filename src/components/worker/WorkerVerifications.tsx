
import React from 'react';
import { CheckCircle } from 'lucide-react';

const WorkerVerifications: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <div className="flex items-center text-green-600">
        <CheckCircle className="h-4 w-4 mr-1.5" />
        <span>Background Verified</span>
      </div>
      <div className="flex items-center text-green-600">
        <CheckCircle className="h-4 w-4 mr-1.5" />
        <span>ID Verified</span>
      </div>
      <div className="flex items-center text-green-600">
        <CheckCircle className="h-4 w-4 mr-1.5" />
        <span>Skills Certified</span>
      </div>
    </div>
  );
};

export default WorkerVerifications;
