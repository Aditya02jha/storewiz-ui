import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Package,
  Building2,
  Warehouse,
  FolderOpen,
  TrendingUp,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { useAuth } from '../../hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Vendors', href: '/vendors', icon: Building2 },
  { name: 'Inventory', href: '/inventory', icon: Warehouse },
  { name: 'Categories', href: '/categories', icon: FolderOpen },
  { name: 'Reports', href: '/reports', icon: TrendingUp },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Warehouse className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Inventory
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
            (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              )}
            >
              <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <Separator />

      {/* Bottom section */}
      <div className="p-2 space-y-1">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Settings className="mr-3 h-6 w-6" />
          Settings
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
          size="sm"
          onClick={logout}
        >
          <LogOut className="mr-3 h-6 w-6" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}