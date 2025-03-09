
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send OTP via API
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your phone",
    });
    
    setOtpSent(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.otp) {
      toast({
        title: "OTP required",
        description: "Please enter the verification code",
        variant: "destructive"
      });
      return;
    }
    
    // For demo purposes, any OTP works
    toast({
      title: "Login successful!",
      description: "You are now logged in",
    });
    
    console.log('Login data:', formData);
    
    // Redirect to dashboard (would use navigate in a real app)
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b py-4">
        <div className="container-tight flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-primary">
            EasyWork<span className="text-black">Connect</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="bg-card rounded-xl shadow-sm p-8 border">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Log in to your EasyWorkConnect account
              </p>
            </div>
            
            <form onSubmit={otpSent ? handleLogin : handleSendOTP}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your registered phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={otpSent}
                    required
                  />
                </div>
                
                {otpSent && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="otp">Verification Code (OTP)</Label>
                      <button 
                        type="button"
                        className="text-xs text-primary hover:underline"
                        onClick={() => {
                          toast({
                            title: "OTP Resent",
                            description: "A new verification code has been sent to your phone",
                          });
                        }}
                      >
                        Resend Code
                      </button>
                    </div>
                    <Input
                      id="otp"
                      name="otp"
                      placeholder="Enter 6-digit verification code"
                      value={formData.otp}
                      onChange={handleChange}
                      maxLength={6}
                      required
                    />
                  </div>
                )}
              </div>
              
              <Button className="w-full mt-6" type="submit">
                {otpSent ? 'Log In' : 'Send Verification Code'}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Don't have an account? Sign up as a
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="w-1/2" asChild>
                  <Link to="/worker-signup">Worker</Link>
                </Button>
                <Button variant="outline" className="w-1/2" asChild>
                  <Link to="/employer-signup">Employer</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
