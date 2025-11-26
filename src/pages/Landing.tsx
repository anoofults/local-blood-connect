import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Heart, Activity } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-sm font-medium text-muted-foreground">
              <Activity className="h-4 w-4 text-primary" />
              Local Blood Donation Management
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Save Lives Through
              <span className="text-primary"> BloodLink</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Connect donors with recipients. Manage blood inventory efficiently. 
              Make a difference in your community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/register">
                  <Droplet className="mr-2 h-5 w-5" />
                  Register as Donor
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                <Link to="/register?type=recipient">
                  <Heart className="mr-2 h-5 w-5" />
                  Request Blood
                </Link>
              </Button>
            </div>

            <div className="pt-8">
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                Already have an account? <span className="font-semibold">Sign in</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Droplet className="h-8 w-8 text-primary" />}
              title="Easy Registration"
              description="Quick and simple registration process for donors and recipients alike."
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8 text-primary" />}
              title="Instant Matching"
              description="Connect with compatible blood donors in your local area immediately."
            />
            <FeatureCard
              icon={<Activity className="h-8 w-8 text-primary" />}
              title="Inventory Management"
              description="Real-time tracking of blood units and donation requests for administrators."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card border rounded-2xl p-12 text-center shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of life-savers today. Every donation counts.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/register">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 BloodLink Local. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/admin/login" className="hover:text-primary transition-colors">
              Admin Access
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
