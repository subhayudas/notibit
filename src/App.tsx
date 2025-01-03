import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotesLibrary from './pages/NotesLibrary';
import UploadNote from './pages/UploadNote';
import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/library" element={<NotesLibrary />} />
              <Route path="/upload" element={<UploadNote />} />
            </Routes>
          </main>
          <Toaster position="top-right" />
          <Footer 
            socialLinks={{
              linkedin: "https://linkedin.com/in/youractualusername",
              github: "https://github.com/youractualusername",
              twitter: "https://twitter.com/youractualusername"
            }}
            contactInfo={{
              email: "your.actual.email@example.com",
              phone: "+1 234 567 890"
            }}
            name="Your Actual Name"
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;