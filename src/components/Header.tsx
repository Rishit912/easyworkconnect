
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'For Workers', href: '/worker-signup' },
    { name: 'For Employers', href: '/employer-signup' },
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container-wide flex items-center justify-between py-4">
        <Link 
          to="/" 
          className="text-2xl font-semibold text-primary relative z-10"
          aria-label="EasyWorkConnect Home"
        >
          EasyWork<span className="text-black">Connect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary relative',
                location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.name}
              {location.pathname === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild className="animate-fade-in">
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden relative z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-[40] md:hidden animate-scale-in">
            <div className="flex flex-col h-full pt-20 px-6">
              <nav className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      location.pathname === item.href ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto mb-12 space-y-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
