import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Package, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [password , setPassword]        = useState("");
  const [email , setEmail]              = useState("");
  const [rememberMe , setRememberMe]    = useState(false);
  const navigate                        = useNavigate();
  const { toast }                       = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const LoginUrl = import.meta.env.VITE_BACKEND_HOME_URL + "/public/login";
      
      const response = await fetch(LoginUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,        // ✅ Fixed key
          password: password,
          rememberMe: rememberMe
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const token = await response.headers.get("Autorization")?? "";
      const refreshToken = await response.headers.get("Refresh-Token")?? "";
        // const { token, refreshToken } = data;

        // ✅ Store based on rememberMe
        if (rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
        } else {
          sessionStorage.setItem("token", token);
          // sessionStorage.setItem("refreshToken", refreshToken);
        }

        toast({
          title: "Login successful!",
          description: "Welcome back to StoreWiz.",
        });

        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Unable to connect to the server.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-surface-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Package className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-primary">StoreWiz</span>
          </Link>
        </div>

        <Card className="border-0 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your StoreWiz account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  required
                  className="transition-all duration-300 focus:shadow-glow"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="pr-10 transition-all duration-300 focus:shadow-glow"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" checked={rememberMe} onChange={(e)=>setRememberMe(e.target.checked)} />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                variant="professional" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;