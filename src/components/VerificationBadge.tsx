
import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface VerificationBadgeProps {
  verified: boolean;
  level?: 'basic' | 'complete' | 'premium';
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  verified, 
  level = 'basic',
  className 
}) => {
  if (!verified) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs",
              className
            )}>
              <Info className="h-3 w-3" />
              <span>Unverified</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>This profile is not yet verified</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const badgeStyles = {
    basic: "bg-blue-50 text-blue-600",
    complete: "bg-green-50 text-green-600",
    premium: "bg-amber-50 text-amber-600",
  };

  const badgeLabels = {
    basic: "Verified",
    complete: "Fully Verified",
    premium: "Premium Verified",
  };

  const badgeDescriptions = {
    basic: "Basic identity verification completed",
    complete: "ID and background verification completed",
    premium: "Premium verification with skills assessment",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
            badgeStyles[level],
            className
          )}>
            <ShieldCheck className="h-3 w-3" />
            <span>{badgeLabels[level]}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{badgeDescriptions[level]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
