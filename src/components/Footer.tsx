
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-16 pb-8 border-t border-border">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-2xl font-semibold text-primary mb-6 inline-block">
              EasyWork<span className="text-black">Connect</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Connecting skilled workers with employers through a simple, transparent platform that puts dignity and fair pay first.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">For Workers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/worker-signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up as Worker
                </Link>
              </li>
              <li>
                <Link to="/find-jobs" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/worker-resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Worker Resources
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-muted-foreground hover:text-primary transition-colors">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link to="/worker-faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Worker FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">For Employers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/employer-signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up as Employer
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-muted-foreground hover:text-primary transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/find-workers" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Workers
                </Link>
              </li>
              <li>
                <Link to="/verification" className="text-muted-foreground hover:text-primary transition-colors">
                  Verification Process
                </Link>
              </li>
              <li>
                <Link to="/employer-faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Employer FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} EasyWorkConnect. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
