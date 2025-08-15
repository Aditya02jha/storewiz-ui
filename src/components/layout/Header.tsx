// src/components/layout/Header.tsx
import { Bell, Menu, Search, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Badge } from '../../components/ui/badge';
import { useAuth } from '../../hooks/useAuth';
import { useLowStockAlerts } from '../hooks/useInventory';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { data: lowStockAlerts = [] } = useLowStockAlerts();

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex-1 px-4 flex justify-between items-center">
        {/* Search */}
        <div className="flex-1 flex">
          <div className="w-full flex md:max-w-xs lg:max-w-none">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <Search className="h-5 w-5" />
              </div>
              <Input
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent"
                placeholder="Search products, vendors..."
                type="search"
                name="search"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-6 w-6" />
                {lowStockAlerts.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                  >
                    {lowStockAlerts.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Low Stock Alerts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {lowStockAlerts.length === 0 ? (
                <DropdownMenuItem>No alerts</DropdownMenuItem>
              ) : (
                lowStockAlerts.slice(0, 5).map((alert) => (
                  <DropdownMenuItem key={alert.product.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{alert.product.name}</span>
                      <span className="text-sm text-gray-500">
                        Stock: {alert.currentStock} (Min: {alert.minStockLevel})
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="h-6 w-6" />
                <span className="hidden md:block">{user?.username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}