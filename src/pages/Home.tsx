import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Upload, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import AnimatedSphere from '@/components/AnimatedSphere';
import TicTacToe from '@/components/TicTacToe';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50" />
        
        <div className="absolute inset-0">
          <div 
            className="absolute w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl animate-blob" 
            style={{ top: '20%', left: '0%' }}
          />
          <div 
            className="absolute w-[500px] h-[500px] bg-green-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"
            style={{ top: '50%', right: '0%' }}
          />
          <div 
            className="absolute w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"
            style={{ bottom: '0%', left: '30%' }}
          />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center space-y-12 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 animate-gradient">
              Share Knowledge, <span className="text-green-600 animate-pulse">Grow Together</span>
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
                    Upload
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

          <div className="w-full max-w-5xl mx-auto px-4 py-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="text-gray-600 mt-2">Follow these simple steps to get started</p>
            </motion.div>


            

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-green-600 font-bold">{index + 1}</span>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  {index < 3 && (
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="hidden md:block absolute top-8 -right-4 text-green-400 text-2xl"
                    >
                      →
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl mx-auto"
          >
            <AnimatedSphere />
          </motion.div>

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

          <div className="w-full max-w-5xl mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900">Take a Break!</h2>
              <p className="text-gray-600 mt-2">Challenge yourself with a game of Tic-tac-toe</p>
            </motion.div>
            <TicTacToe />
          </div>

        </div>
      </div>
    </div>
  );
};

const steps = [
  {
    title: "Create Account",
    description: "Sign up for free and join our learning community"
  },
  {
    title: "Upload Notes",
    description: "Share your knowledge by uploading your study materials"
  },
  {
    title: "Browse Library",
    description: "Explore our vast collection of educational resources"
  },
  {
    title: "Learn & Grow",
    description: "Improve your understanding and help others learn"
  }
];

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