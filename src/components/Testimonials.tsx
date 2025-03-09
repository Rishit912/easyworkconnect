
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  workType: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Electrician",
    workType: "Worker",
    content: "I used to struggle finding consistent work. Now I get jobs through the app every week and get paid on time. The weekly payment system has changed my life.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "House Owner",
    workType: "Employer",
    content: "Finding reliable household help was always difficult. This platform made it easy to find verified workers nearby. The tracking feature gives me peace of mind.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 3,
    name: "Sunil Patel",
    role: "Construction Worker",
    workType: "Worker",
    content: "I've improved my skills through the training programs and now earn 30% more. The flexibility lets me take care of family and still earn a good living.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 4,
    name: "Deepa Nair",
    role: "Restaurant Owner",
    workType: "Employer",
    content: "As a small business owner, I need reliable staff on short notice. This platform has been a lifesaver - I can find verified workers within hours when I need them.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
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
    
    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }
    
    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-accent/30">
      <div 
        ref={testimonialsRef}
        className="container-tight transition-all duration-700 opacity-0 translate-y-8"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border mb-4">
            <span className="text-sm font-medium">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stories from our community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from workers and employers who have transformed how they work and hire.
          </p>
        </div>
        
        <div className="relative py-4">
          <div className="overflow-hidden rounded-2xl bg-white border border-border shadow-sm">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full p-2 md:p-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8">
                    <div className="md:col-span-1 flex flex-col items-center md:items-start">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4">
                        <div 
                          className="w-full h-full bg-cover bg-center" 
                          style={{ backgroundImage: `url(${testimonial.image})` }}
                        />
                      </div>
                      <h3 className="text-lg font-medium mb-1">{testimonial.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{testimonial.role}</p>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {testimonial.workType}
                      </div>
                      <div className="flex items-center mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4 mr-0.5",
                              i < testimonial.rating 
                                ? "fill-amber-400 text-amber-400" 
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 relative">
                      <Quote className="h-10 w-10 text-primary/20 absolute -top-2 -left-2" />
                      <blockquote className="relative pt-6 text-lg md:text-xl leading-relaxed text-balance">
                        "{testimonial.content}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    i === activeIndex ? "bg-primary w-5" : "bg-primary/30"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
