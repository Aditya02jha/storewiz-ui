// import { Toaster } from "./components/ui/toaster";
// import { Toaster as Sonner } from "./components/ui/sonner";
// import { TooltipProvider } from "./components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NotFound from "./pages/Notfound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { queryClient } from './services/queryClient';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Vendors from './pages/Vendors';
import VendorDetail from './pages/VendorDetail';
import Inventory from './pages/Inventory';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/products/:id" element={<ProductDetail />} />
                          <Route path="/vendors" element={<Vendors />} />
                          <Route path="/vendors/:id" element={<VendorDetail />} />
                          <Route path="/inventory" element={<Inventory />} />
                          <Route path="/categories" element={<Categories />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Toaster position="top-right" richColors />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
