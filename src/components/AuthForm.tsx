
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Keep Label if used by FormLabel, FormItem might also use it internally
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const registerSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters."}),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  mode: 'login' | 'register';
  onSwitchMode: () => void;
}

export default function AuthForm({ mode, onSwitchMode }: AuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    defaultValues: mode === 'login' ? { email: '', password: '' } : { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit: SubmitHandler<LoginFormValues | RegisterFormValues> = (data) => {
    console.log(mode === 'login' ? 'Login data:' : 'Register data:', data);
    // Simulate API call
    toast({
      title: `${mode === 'login' ? 'Login' : 'Registration'} Successful!`,
      description: `Welcome${mode === 'register' && 'fullName' in data ? `, ${data.fullName}` : ''}! Redirecting to dashboard...`,
      variant: 'default',
    });
    
    // In a real app, you'd handle actual authentication and then redirect.
    // For now, we'll just redirect.
    form.reset();
    router.push('/admin/dashboard'); 
  };
  
  // Placeholder for forgot password action
  const handleForgotPassword = () => {
    toast({
      title: "Forgot Password",
      description: "Forgot password functionality is not yet implemented.",
      variant: "default"
    });
  }

  return (
    <Card className="w-full max-w-md shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">
          {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
        </CardTitle>
        <CardDescription>
          {mode === 'login' ? 'Sign in to continue your journey with Abuja Stays.' : 'Join us to find and book amazing stays.'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {mode === 'register' && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} className="pl-10 pr-10" />
                    </FormControl>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === 'register' && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                     <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} className="pl-10 pr-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
            <div className="flex justify-between w-full items-center">
              <Button variant="link" type="button" onClick={onSwitchMode} className="text-sm text-primary hover:text-primary/80 px-0">
                {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </Button>
              {mode === 'login' && (
                <Button variant="link" type="button" onClick={handleForgotPassword} className="text-sm text-muted-foreground hover:text-primary/80 px-0">
                  Forgot Password?
                </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
