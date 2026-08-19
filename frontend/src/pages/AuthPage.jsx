import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, Wallet, Contact, Contact2Icon, Contact2, User } from "lucide-react";
import { api } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'sonner'

export default function Login ({ onLogin }) {
    const navigate = useNavigate()
    const { user, setUser } = useAuth()

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [ loading, setLoading ] = useState(false)
  const [register, setRegister] = useState(false)
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const res = await api.post(`/auth/${register ? 'register' : 'login'}`,form)        
        setUser(res.data.user)
        if (!register) {
            toast.success(`Welcome back ${res.data.user.name} 👋😀`)
        } else{
            toast.success(`Welcome to your Dashboard, ${res.data.user.name} 😊`)
        }
        navigate('/dashboard');        
    } catch (error) {
        toast.error(`Kindly enter the right credentials`)
        console.log(error); 
    } finally{ 
         setLoading(false)
        }
};

  return (
    <div className="flex min-h-screen w-full bg-black">
      {/* Left brand panel — hidden on mobile */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-10 text-slate-50 lg:flex">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-medium tracking-wide ">Expense Tracker</span>
        </div>

        <div>
          <h1 className="font-serif text-4xl leading-tight text-slate-50">
            Know exactly
            <br />
            where it goes.
          </h1>
          <p className="mt-3 max-w-xs text-sm text-slate-400">
            Track income and expenses in one place, and see your balance
            update as you go.
          </p>
        </div>

        {/* Signature element: simple balance line */}
        <svg
          viewBox="0 0 320 80"
          className="h-16 w-full text-emerald-400/70"
          fill="none"
        >
          <path
            d="M0 60 L40 60 L60 30 L90 65 L120 20 L150 45 L180 15 L210 50 L240 35 L270 55 L320 25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 ">
        {/* Mobile-only brand mark */}
        <div className="mb-8 flex items-center gap-2 lg:hidden ">
          <Wallet className="h-5 w-5 text-emerald-600" />
          <span className="text-sm font-medium tracking-wide text-white">
            Expense Tracker
          </span>
        </div>

        <Card className="w-full max-w-sm border-slate-200 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-left text-slate-900">{register ? 'Welcome😊': 'Welcome back 😊'}</h2>
            <p className="mt-1 text-sm text-slate-500">
            {register ? 'Create an account to begin tracking your spending.':' Log in to continue tracking your spending.'
              }
            </p>

            <form onSubmit={handleSubmit} className="mt-2 space-y-4">
              {register && <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm text-slate-700">
                  Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seamless"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="pl-9"
                  />
                </div>
              </div>}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm text-slate-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm text-slate-700">
                    {register && 'Set a ' }Password
                  </Label>
                  
                  {/* <a  href="/forgot-password"
                    className="text-xs text-emerald-700 hover:underline"
                  >
                    Forgot password?
                  </a> */}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="px-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

            { !register ? (<Button
              disabled={loading}
                type="submit"
                className="w-full bg-black hover:bg-gray-900"
              >
                {
                loading ? 'Logging In' : 'Log in'
                }
              </Button>)
              : (<Button
              disabled={loading}
                type="submit"
                className="w-full bg-black hover:bg-gray-900"
              >
                {
                loading ? 'Signing In' : 'Sign In'
                }
              </Button>)
            }
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
            {register ? 'Have an account?': "Don't have an account?"} {" "}
            {!register && <a onClick={() => setRegister(true)} className="font-medium cursor-pointer text-emerald-700 hover:underline">
                Sign up
              </a>}
            {register && <a onClick={() => setRegister(false)} className="font-medium cursor-pointer text-emerald-700 hover:underline">
                Login
              </a>}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}