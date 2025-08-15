import { Button } from "./ui/button";
import { 
  Package, 
  BarChart3, 
  Users, 
  Settings, 
  Home,
  ShoppingCart,
  FileText,
  Bell,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Team", href: "/team", icon: Users },
    { name: "Notifications", href: "/notifications", icon: Bell },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-background border-r border-border shadow-elegant flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center space-x-2">
          <Package className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">StoreWiz</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          to="/settings"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive("/settings")
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </Link>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => {
            // Handle logout
            window.location.href = "/";
          }}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;