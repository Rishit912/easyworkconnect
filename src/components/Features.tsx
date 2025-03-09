
import React, { useEffect, useRef } from 'react';
import { CheckCircle, Clock, Shield, CreditCard, MapPin, Zap, Award, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay = 0 }) => {
  const featureRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    if (featureRef.current) {
      observer.observe(featureRef.current);
    }
    
    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={featureRef}
      className="flex flex-col p-6 rounded-2xl bg-white subtle-shadow hover-elevate transition-all duration-500 opacity-0 translate-y-6"
    >
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Weekly Payments",
      description: "Get paid every week, not monthly. Better cash flow for workers when they need it most."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Matching",
      description: "AI-powered job matching connects workers with employers based on skills and location."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Verification",
      description: "All users are verified through Aadhaar and rated by the community for safety."
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Hyper-Local Focus",
      description: "Find work or workers within your locality, reducing commute times and costs."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Scheduling",
      description: "Choose one-time gigs, recurring jobs, or full-time roles based on your availability."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Skills Training",
      description: "Access free training programs to improve your skills and increase earning potential."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Worker Welfare",
      description: "Emergency support, basic health coverage, and financial assistance when needed."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Simple Onboarding",
      description: "Voice-guided registration in multiple languages for workers of all literacy levels."
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="features" 
      className="py-20 md:py-28 relative bg-gradient-to-b from-white to-secondary/30"
    >
      <div className="container-tight">
        <div 
          ref={sectionRef}
          className="text-center mb-16 md:mb-24 transition-all duration-700 opacity-0 translate-y-8"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border mb-4">
            <span className="text-sm font-medium">Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The platform that puts workers first
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've designed every feature with both workers and employers in mind, creating 
            a fair, transparent, and efficient ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
