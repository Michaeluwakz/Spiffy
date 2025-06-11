
"use client";

import { useState } from 'react';
import AuthForm from '@/components/AuthForm';
// Removed imports: Tabs, TabsContent, TabsList, TabsTrigger, Card related components, User, Heart, Briefcase, Button, Link

export default function AccountPage() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const switchAuthMode = () => {
    setAuthMode(prevMode => (prevMode === 'login' ? 'register' : 'login'));
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12">
      <h1 className="text-4xl font-headline text-center mb-8 text-primary">
        {authMode === 'login' ? 'Sign In to Your Portal' : 'Create Your Account'}
      </h1>
      <AuthForm
        mode={authMode}
        onSwitchMode={switchAuthMode}
      />
    </div>
  );
}
