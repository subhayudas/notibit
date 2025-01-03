import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogIn, LogOut, Upload, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/Button';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-gray-900">Notibit</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/library">
                  <Button variant="outline" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Library
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button variant="primary" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Note
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="outline" size="sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="primary" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;