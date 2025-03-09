
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  maxRating = 5,
  size = 'md',
  showValue = false,
  className
}) => {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);
  
  const starSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {stars.map((star) => (
          <Star
            key={star}
            className={cn(
              starSizes[size],
              star <= Math.floor(rating) 
                ? "fill-amber-400 text-amber-400" 
                : star <= rating 
                  ? "fill-amber-400/50 text-amber-400" 
                  : "text-gray-300"
            )}
          />
        ))}
      </div>
      
      {showValue && (
        <span className={cn("ml-2 font-medium text-amber-600", textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
