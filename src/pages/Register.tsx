import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Droplet, Heart } from "lucide-react";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const defaultType = searchParams.get("type") === "recipient" ? "recipient" : "donor";
  const [userType, setUserType] = useState<"donor" | "recipient">(defaultType);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bloodType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with actual API call to local backend
    try {
      // Simulated registration
      console.log("Registration data:", { ...formData, userType });
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please sign in.",
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Join BloodLink to start saving lives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(v) => setUserType(v as "donor" | "recipient")} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="donor" className="flex items-center gap-2">
                <Droplet className="h-4 w-4" />
                Donor
              </TabsTrigger>
              <TabsTrigger value="recipient" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Recipient
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                <SelectTrigger id="bloodType">
                  <SelectValue placeholder="Select your blood type" />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
