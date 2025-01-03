import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin} from 'react-icons/fa';
import styled from '@emotion/styled';

// Styled component for the animated background
const AnimatedBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    #16a34a,
    #eab308,
    #22c55e
  );
  background-size: 200% 200%;
`;

const Footer = () => {
  // Define social links with their URLs
  const socialLinks = [
    { Icon: FaGithub, url: 'https://github.com/subhayudas' },
    { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/subhayu-das/' },
    { Icon: FaInstagram, url: 'https://www.instagram.com/just_subhayu/' }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative text-white py-8 overflow-hidden font-semibold"
    >
      <AnimatedBackground
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Main content with relative positioning */}
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <motion.h3 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white drop-shadow-lg"
            >
              Notibit
            </motion.h3>
            <p className="text-white drop-shadow-md">
              Best place for your notes NoCap
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About'].map((link) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="#" className="text-white drop-shadow-md hover:text-gray-100">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">Connect With Me</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, url }, index) => (
                <motion.a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white text-3xl drop-shadow-lg hover:text-gray-100"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="text-center mt-8 pt-8 border-t border-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white drop-shadow-md">
            © {new Date().getFullYear()} Notibit. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
