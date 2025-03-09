
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Clock,
  CheckCircle,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VerificationBadge from '../VerificationBadge';
import RatingStars from '../RatingStars';
import { cn } from '@/lib/utils';
import { getAvailabilityDisplay } from './worker-card-utils';
import WorkerVerifications from './WorkerVerifications';

interface DetailedWorkerCardProps {
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
  className?: string;
}

const DetailedWorkerCard: React.FC<DetailedWorkerCardProps> = ({
  id,
  name,
  avatar,
  occupation,
  skills,
  location,
  experience,
  rating,
  reviews,
  available,
  verified,
  verificationLevel = 'basic',
  className
}) => {
  const availabilityDisplay = getAvailabilityDisplay(available);

  return (
    <Card className={cn("hover-elevate overflow-hidden border hover:border-primary/20", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 flex flex-col items-center text-center">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4">
              <img 
                src={avatar} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-xl font-medium mb-1">{name}</h3>
            
            <div className="mb-2">
              <VerificationBadge verified={verified} level={verificationLevel} />
            </div>
            
            <div className="flex items-center justify-center gap-1 mb-4">
              <RatingStars rating={rating} showValue />
              <span className="text-sm text-muted-foreground">({reviews})</span>
            </div>
            
            <Badge 
              variant="outline" 
              className={cn("whitespace-nowrap", availabilityDisplay.classes)}
            >
              {availabilityDisplay.text}
            </Badge>
          </div>
          
          <div className="md:w-3/4">
            <h4 className="text-lg font-medium mb-3">{occupation}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{experience} experience</span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <WorkerVerifications />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-muted/30 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-muted-foreground">
            <Clock className="h-4 w-4 inline-block mr-2" />
            <span>Can start {available === 'immediately' ? 'right now' : available}</span>
          </div>
          
          <Button asChild>
            <Link to={`/workers/${id}`}>
              View Profile
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DetailedWorkerCard;
