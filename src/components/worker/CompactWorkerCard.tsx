
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VerificationBadge from '../VerificationBadge';
import RatingStars from '../RatingStars';
import { cn } from '@/lib/utils';
import { getAvailabilityDisplay } from './worker-card-utils';

interface CompactWorkerCardProps {
  id: string;
  name: string;
  avatar: string;
  occupation: string;
  location: string;
  rating: number;
  reviews: number;
  available: 'immediately' | 'today' | 'tomorrow' | 'this-week';
  verified: boolean;
  verificationLevel?: 'basic' | 'complete' | 'premium';
  className?: string;
}

const CompactWorkerCard: React.FC<CompactWorkerCardProps> = ({
  id,
  name,
  avatar,
  occupation,
  location,
  rating,
  reviews,
  available,
  verified,
  verificationLevel = 'basic',
  className
}) => {
  const availabilityDisplay = getAvailabilityDisplay(available);

  return (
    <Link to={`/workers/${id}`} className="block">
      <Card className={cn("hover-elevate border hover:border-primary/20", className)}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={avatar} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-base line-clamp-1">{name}</h3>
                {verified && <VerificationBadge verified level={verificationLevel} />}
              </div>
              
              <p className="text-sm text-muted-foreground truncate mb-1.5">{occupation}</p>
              
              <div className="flex items-center gap-3 text-xs">
                <RatingStars rating={rating} size="sm" />
                <span className="text-muted-foreground">({reviews})</span>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
            </div>
            
            <div className="ml-auto">
              <Badge 
                variant="outline" 
                className={cn("whitespace-nowrap", availabilityDisplay.classes)}
              >
                {availabilityDisplay.text}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CompactWorkerCard;
