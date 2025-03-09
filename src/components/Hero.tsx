
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background z-0" />
      
      {/* Hero content */}
      <div 
        ref={heroRef}
        className="container-tight relative z-10 pt-14 pb-24 md:pt-28 md:pb-32 transition-all duration-700 opacity-0 translate-y-8"
      >
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent border border-accent-foreground/10 mb-6 animate-fade-in">
            <Star className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Revolutionizing daily wage work</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Connect with local workers <br className="hidden md:block" />
            <span className="text-primary">instantly & securely</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 text-balance">
            Weekly payments, instant matching, and trust-verified workers. 
            The simplest way to find jobs or hire skilled workers in your area.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link to="/worker-signup">
                I'm a Worker
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
              <Link to="/employer-signup">
                I'm an Employer
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 md:mt-16 flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by workers and employers across India</p>
            <div className="flex items-center gap-8 md:gap-12">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-sm font-medium",
                      i === 1 && "bg-blue-100 text-blue-600",
                      i === 2 && "bg-green-100 text-green-600",
                      i === 3 && "bg-amber-100 text-amber-600",
                      i === 4 && "bg-purple-100 text-purple-600",
                    )}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="h-8 w-px bg-border mx-2" />
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5</span>
                <span className="text-xs text-muted-foreground">(230+ reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
};

export default Hero;
