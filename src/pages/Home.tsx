import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Upload, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Share Knowledge, <span className="text-green-600">Grow Together</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your platform for sharing and discovering educational notes. Join our community of learners today.
        </p>
      </div>

      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/upload">
              <Button size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Upload Notes
              </Button>
            </Link>
            <Link to="/library">
              <Button variant="outline" size="lg">
                <Search className="mr-2 h-5 w-5" />
                Browse Library
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-up">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-16">
        <FeatureCard
          icon={<Upload className="h-8 w-8 text-green-600" />}
          title="Easy Uploads"
          description="Share your notes with just a few clicks. Support for PDF format."
        />
        <FeatureCard
          icon={<Search className="h-8 w-8 text-green-600" />}
          title="Smart Search"
          description="Find exactly what you need with our powerful search functionality."
        />
        <FeatureCard
          icon={<BookOpen className="h-8 w-8 text-green-600" />}
          title="Organized Library"
          description="Access a well-organized collection of educational resources."
        />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;