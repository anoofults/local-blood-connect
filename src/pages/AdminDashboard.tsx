import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, LogOut, Users, Droplet, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Mock data
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "donor", bloodType: "A+" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "recipient", bloodType: "B+" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "donor", bloodType: "O-" },
];

const mockInventory = [
  { bloodType: "A+", units: 45 },
  { bloodType: "A-", units: 23 },
  { bloodType: "B+", units: 38 },
  { bloodType: "B-", units: 15 },
  { bloodType: "AB+", units: 12 },
  { bloodType: "AB-", units: 8 },
  { bloodType: "O+", units: 67 },
  { bloodType: "O-", units: 31 },
];

const mockRequests = [
  { id: 1, user: "Jane Smith", bloodType: "B+", units: 2, status: "pending", date: "2025-01-18" },
  { id: 2, user: "Alice Brown", bloodType: "O-", units: 3, status: "pending", date: "2025-01-19" },
  { id: 3, user: "Mike Johnson", bloodType: "A+", units: 1, status: "approved", date: "2025-01-17" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inventory, setInventory] = useState(mockInventory);

  const handleLogout = () => {
    toast({
      title: "Admin Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleApprove = (requestId: number, bloodType: string, units: number) => {
    // TODO: API call to approve request and update inventory
    console.log("Approving request:", requestId);
    toast({
      title: "Request Approved",
      description: `Blood request has been approved. ${units} unit(s) of ${bloodType} allocated.`,
    });
    
    // Update inventory
    setInventory(prev => 
      prev.map(item => 
        item.bloodType === bloodType 
          ? { ...item, units: Math.max(0, item.units - units) }
          : item
      )
    );
  };

  const handleDeny = (requestId: number) => {
    // TODO: API call to deny request
    console.log("Denying request:", requestId);
    toast({
      title: "Request Denied",
      description: "Blood request has been declined.",
      variant: "destructive",
    });
  };

  const handleInventoryUpdate = (bloodType: string, newUnits: number) => {
    // TODO: API call to update inventory
    setInventory(prev =>
      prev.map(item =>
        item.bloodType === bloodType ? { ...item, units: newUnits } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BloodLink Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUsers.length}</div>
              <p className="text-xs text-muted-foreground">Registered in system</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Blood Units</CardTitle>
              <Droplet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inventory.reduce((sum, item) => sum + item.units, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total available units</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockRequests.filter(r => r.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Blood Requests</CardTitle>
                <CardDescription>Manage incoming blood requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.date}</TableCell>
                        <TableCell>{request.user}</TableCell>
                        <TableCell>{request.bloodType}</TableCell>
                        <TableCell>{request.units} unit(s)</TableCell>
                        <TableCell>
                          {request.status === "pending" ? (
                            <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                              Pending
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500">Approved</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {request.status === "pending" && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleApprove(request.id, request.bloodType, request.units)}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeny(request.id)}
                              >
                                Deny
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Blood Inventory</CardTitle>
                <CardDescription>Current blood unit availability</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Available Units</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Update</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map((item) => (
                      <TableRow key={item.bloodType}>
                        <TableCell className="font-bold text-lg">{item.bloodType}</TableCell>
                        <TableCell className="text-lg">{item.units}</TableCell>
                        <TableCell>
                          {item.units < 20 ? (
                            <Badge variant="destructive">Low Stock</Badge>
                          ) : item.units < 40 ? (
                            <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                              Moderate
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500">Good Stock</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            className="w-24"
                            defaultValue={item.units}
                            onBlur={(e) => handleInventoryUpdate(item.bloodType, parseInt(e.target.value) || 0)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Registered donors and recipients</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Blood Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "donor" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.bloodType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
