import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Successfully signed up!');
      navigate('/library');
    } catch (error) {
      toast.error('Error signing up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">Create an Account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <Button type="submit" className="w-full" isLoading={loading}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;