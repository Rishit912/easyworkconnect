
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  CreditCard, 
  Calendar, 
  Briefcase,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VerificationBadge from './VerificationBadge';
import { cn } from '@/lib/utils';

interface JobCardProps {
  id: string;
  title: string;
  employerName: string;
  employerVerified: boolean;
  location: string;
  wage: {
    amount: number;
    period: 'hourly' | 'daily' | 'weekly';
  };
  timing: {
    type: 'full-time' | 'part-time' | 'one-time';
    duration?: string;
  };
  category: string;
  postedAt: Date;
  urgentHiring?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  employerName,
  employerVerified,
  location,
  wage,
  timing,
  category,
  postedAt,
  urgentHiring = false,
  variant = 'default',
  className
}) => {
  const formattedWage = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(wage.amount);

  const wagePeriodDisplay = {
    hourly: '/hour',
    daily: '/day',
    weekly: '/week'
  };

  const timingTypeDisplay = {
    'full-time': 'Full Time',
    'part-time': 'Part Time',
    'one-time': 'One Time Job'
  };

  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
  
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  if (variant === 'compact') {
    return (
      <Link to={`/jobs/${id}`} className="block">
        <Card className={cn("hover-elevate border hover:border-primary/20", className)}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-medium text-base line-clamp-1">{title}</h3>
                  {urgentHiring && (
                    <Badge variant="destructive" className="h-5">Urgent</Badge>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{employerName}</span>
                    {employerVerified && <VerificationBadge verified level="basic" />}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{location}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-primary">
                  {formattedWage}
                  <span className="text-xs ml-0.5">{wagePeriodDisplay[wage.period]}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {timeSince(postedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className={cn("hover-elevate overflow-hidden border hover:border-primary/20", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {urgentHiring && (
                <Badge variant="destructive">Urgent Hiring</Badge>
              )}
              <Badge variant="outline">{category}</Badge>
              <Badge variant="outline">{timingTypeDisplay[timing.type]}</Badge>
            </div>
            
            <h3 className="text-xl font-medium mb-1.5">{title}</h3>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Briefcase className="h-4 w-4" />
              <span className="font-medium">{employerName}</span>
              {employerVerified && <VerificationBadge verified level="complete" />}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-semibold text-primary">
              {formattedWage}
            </div>
            <div className="text-sm text-muted-foreground">
              {wagePeriodDisplay[wage.period]}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{timing.duration || timingTypeDisplay[timing.type]}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Posted {timeSince(postedAt)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-muted/30 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4 inline-block mr-2" />
            <span>Weekly payment</span>
          </div>
          
          <Button asChild>
            <Link to={`/jobs/${id}`}>
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
