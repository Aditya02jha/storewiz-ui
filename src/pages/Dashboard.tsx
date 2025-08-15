import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { 
  Package, 
  Download, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Bell,
  Search,
  Plus,
  Filter
} from "lucide-react";
import { Input } from "../components/ui/input";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const handleDownload = () => {
    // Simulate download functionality
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,Item,Quantity,Price\nWidget A,100,$50\nWidget B,75,$30';
    link.download = 'inventory-report.csv';
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-surface-gradient">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-background border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-4 flex-1">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search inventory..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <Button variant="professional" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                <TrendingUp className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  -3 from yesterday
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,426</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,892</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest inventory movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Added", item: "Widget Pro Max", quantity: 50, time: "2 hours ago" },
                    { action: "Sold", item: "Basic Widget", quantity: 25, time: "4 hours ago" },
                    { action: "Updated", item: "Premium Widget", quantity: 15, time: "6 hours ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{activity.action} {activity.item}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {activity.quantity}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Items that need restocking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { item: "Basic Widget", current: 5, minimum: 25, status: "Critical" },
                    { item: "Widget Accessories", current: 12, minimum: 30, status: "Low" },
                    { item: "Premium Parts", current: 8, minimum: 20, status: "Low" },
                  ].map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <div>
                        <p className="font-medium">{alert.item}</p>
                        <p className="text-sm text-muted-foreground">
                          {alert.current} in stock (min: {alert.minimum})
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.status === "Critical" 
                          ? "bg-destructive text-destructive-foreground" 
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {alert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Table */}
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>Complete list of your inventory items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Item Name</th>
                      <th className="text-left p-3">SKU</th>
                      <th className="text-left p-3">Quantity</th>
                      <th className="text-left p-3">Price</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Widget Pro Max", sku: "WPM-001", quantity: 150, price: "$89.99", status: "In Stock" },
                      { name: "Basic Widget", sku: "BW-002", quantity: 5, price: "$29.99", status: "Low Stock" },
                      { name: "Premium Widget", sku: "PW-003", quantity: 75, price: "$59.99", status: "In Stock" },
                      { name: "Widget Accessories", sku: "WA-004", quantity: 12, price: "$19.99", status: "Low Stock" },
                    ].map((item, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3 text-muted-foreground">{item.sku}</td>
                        <td className="p-3">{item.quantity}</td>
                        <td className="p-3 font-medium">{item.price}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === "In Stock" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-orange-100 text-orange-800"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;