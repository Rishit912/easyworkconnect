
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const EmployerSignup = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    businessType: '',
    gstin: '',
    description: '',
    acceptTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.companyName || !formData.contactPerson || !formData.phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
    }
    
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Registration successful!",
      description: "Your employer account has been created. You can now log in.",
    });
    
    // In a real app, you would submit to your backend here
    console.log('Employer signup data:', formData);
    
    // Redirect to login (would use navigate in a real app)
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
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
      
      <main className="flex-grow py-12">
        <div className="container-tight">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Employer Registration</h1>
              <p className="text-muted-foreground">
                Create your employer account to start hiring skilled workers
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="flex justify-between mb-8">
              {[1, 2].map(i => (
                <div 
                  key={i}
                  className={`flex flex-col items-center ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                      ${i < step ? 'bg-primary text-white' : i === step ? 'border-2 border-primary' : 'border-2 border-muted'}`}
                  >
                    {i < step ? <CheckCircle className="h-5 w-5" /> : i}
                  </div>
                  <span className="text-xs">
                    {i === 1 ? 'Basic Info' : 'Business Details'}
                  </span>
                </div>
              ))}
            </div>
            
            <form onSubmit={step === 2 ? handleSubmit : undefined}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company/Organization Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      placeholder="Full name of contact person"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="company@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter your business address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              {/* Step 2: Business Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Type of Business</Label>
                    <Input
                      id="businessType"
                      name="businessType"
                      placeholder="e.g. Construction, Restaurant, Office, etc."
                      value={formData.businessType}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gstin">GSTIN (Optional)</Label>
                    <Input
                      id="gstin"
                      name="gstin"
                      placeholder="Enter GSTIN if applicable"
                      value={formData.gstin}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell us about your business and what kind of workers you're looking for"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-start gap-2">
                      <Checkbox 
                        id="acceptTerms" 
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, acceptTerms: checked === true }))
                        }
                      />
                      <Label htmlFor="acceptTerms" className="text-sm font-normal">
                        I accept the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                ) : (
                  <Button type="button" variant="outline" asChild>
                    <Link to="/">Cancel</Link>
                  </Button>
                )}
                
                {step < 2 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">
                    Complete Registration
                  </Button>
                )}
              </div>
            </form>
            
            {step === 1 && (
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerSignup;
