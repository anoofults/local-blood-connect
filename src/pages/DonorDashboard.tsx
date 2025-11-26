import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Droplet, Calendar, LogOut, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Mock data - replace with API calls
const mockProfile = {
  name: "John Doe",
  email: "john@example.com",
  bloodType: "A+",
  phone: "+1 (555) 000-0000",
};

const mockDonations = [
  { id: 1, date: "2025-01-15", units: 1, location: "Central Hospital" },
  { id: 2, date: "2024-11-20", units: 1, location: "Community Center" },
  { id: 3, date: "2024-09-10", units: 1, location: "Mobile Unit - Downtown" },
];

const DonorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: "",
    location: "",
  });

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to schedule donation
    console.log("Schedule donation:", scheduleData);
    toast({
      title: "Donation Scheduled",
      description: "Your appointment has been confirmed. We'll send you a reminder.",
    });
    setScheduleOpen(false);
    setScheduleData({ date: "", location: "" });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BloodLink</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{mockProfile.name}</CardTitle>
                  <CardDescription>{mockProfile.email}</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-1">
                {mockProfile.bloodType}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{mockProfile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="font-medium">{mockDonations.length} units</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-bold text-lg">Ready to Donate?</h3>
                  <p className="text-muted-foreground">Schedule your next blood donation</p>
                </div>
              </div>
              <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">Schedule Donation</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule a Donation</DialogTitle>
                    <DialogDescription>
                      Choose your preferred date and location
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSchedule}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={scheduleData.date}
                          onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Central Hospital"
                          value={scheduleData.location}
                          onChange={(e) => setScheduleData({ ...scheduleData, location: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Confirm Appointment</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Donation History */}
        <Card>
          <CardHeader>
            <CardTitle>Donation History</CardTitle>
            <CardDescription>Your past blood donations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.date}</TableCell>
                    <TableCell>{donation.units} unit(s)</TableCell>
                    <TableCell>{donation.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
