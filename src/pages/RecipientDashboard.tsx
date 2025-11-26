import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, LogOut, User, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Mock data
const mockProfile = {
  name: "Jane Smith",
  email: "jane@example.com",
  bloodType: "B+",
  phone: "+1 (555) 111-2222",
};

const mockRequests = [
  { id: 1, bloodType: "B+", units: 2, status: "approved", date: "2025-01-20", notes: "Emergency surgery" },
  { id: 2, bloodType: "B+", units: 1, status: "pending", date: "2025-01-18", notes: "Regular treatment" },
  { id: 3, bloodType: "B+", units: 3, status: "declined", date: "2025-01-10", notes: "Routine checkup" },
];

const RecipientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestData, setRequestData] = useState({
    bloodType: "",
    units: "",
    notes: "",
  });

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to create blood request
    console.log("Blood request:", requestData);
    toast({
      title: "Request Submitted",
      description: "Your blood request has been received. We'll notify you when it's approved.",
    });
    setRequestOpen(false);
    setRequestData({ bloodType: "", units: "", notes: "" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Pending</Badge>;
      case "declined":
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
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
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="font-medium">{mockRequests.length} requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Plus className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-bold text-lg">Need Blood?</h3>
                  <p className="text-muted-foreground">Submit a new blood request</p>
                </div>
              </div>
              <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">Request Blood</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Blood</DialogTitle>
                    <DialogDescription>
                      Fill in the details for your blood request
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleRequest}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodType">Blood Type</Label>
                        <Select 
                          value={requestData.bloodType} 
                          onValueChange={(value) => setRequestData({ ...requestData, bloodType: value })}
                        >
                          <SelectTrigger id="bloodType">
                            <SelectValue placeholder="Select blood type" />
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
                      <div className="space-y-2">
                        <Label htmlFor="units">Units Needed</Label>
                        <Input
                          id="units"
                          type="number"
                          min="1"
                          placeholder="e.g., 2"
                          value={requestData.units}
                          onChange={(e) => setRequestData({ ...requestData, units: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Provide any additional information..."
                          value={requestData.notes}
                          onChange={(e) => setRequestData({ ...requestData, notes: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit Request</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Request History */}
        <Card>
          <CardHeader>
            <CardTitle>Request History</CardTitle>
            <CardDescription>Your blood requests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.date}</TableCell>
                    <TableCell>{request.bloodType}</TableCell>
                    <TableCell>{request.units} unit(s)</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="max-w-xs truncate">{request.notes}</TableCell>
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

export default RecipientDashboard;
