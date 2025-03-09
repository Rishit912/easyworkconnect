
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const WorkerSignup = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    skills: [] as string[],
    experience: '',
    aadharNumber: '',
    acceptTerms: false,
  });

  const availableSkills = [
    'Construction', 'Plumbing', 'Electrical', 'Carpentry', 
    'Painting', 'Cleaning', 'Driving', 'Cooking', 'Gardening'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
    } else if (step === 2) {
      if (formData.skills.length === 0) {
        toast({
          title: "Missing skills",
          description: "Please select at least one skill",
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
      description: "Your worker profile has been created. You can now log in.",
    });
    
    // In a real app, you would submit to your backend here
    console.log('Worker signup data:', formData);
    
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
              <h1 className="text-3xl font-bold mb-2">Worker Registration</h1>
              <p className="text-muted-foreground">
                Create your worker profile to start finding jobs in your area
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map(i => (
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
                    {i === 1 ? 'Basic Info' : i === 2 ? 'Skills' : 'Verification'}
                  </span>
                </div>
              ))}
            </div>
            
            <form onSubmit={step === 3 ? handleSubmit : undefined}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
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
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, district or area"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}
              
              {/* Step 2: Skills */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Your Skills</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSkills.map(skill => (
                        <div 
                          key={skill}
                          className={`p-3 rounded-md border cursor-pointer hover:border-primary transition-colors ${
                            formData.skills.includes(skill) ? 'bg-accent border-primary' : ''
                          }`}
                          onClick={() => handleSkillToggle(skill)}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox 
                              id={`skill-${skill}`}
                              checked={formData.skills.includes(skill)}
                              onCheckedChange={() => handleSkillToggle(skill)}
                            />
                            <Label 
                              htmlFor={`skill-${skill}`}
                              className="cursor-pointer"
                            >
                              {skill}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      name="experience"
                      placeholder="E.g. 2 years"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              {/* Step 3: Verification */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber">Aadhar Number (For Verification)</Label>
                    <Input
                      id="aadharNumber"
                      name="aadharNumber"
                      placeholder="Enter your 12-digit Aadhar number"
                      value={formData.aadharNumber}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      We use this for identity verification to ensure trust and safety.
                    </p>
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
                
                {step < 3 ? (
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

export default WorkerSignup;
