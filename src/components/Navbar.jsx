import React, { useState } from "react";
import logo from "../assets/logo/logo.svg";
import { Search, Menu, ShoppingCart, Globe, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkVariants = {
    hover: { scale: 1.1, color: "#2563eb", transition: { duration: 0.3 } },
  };

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="bg-gradient-to-r from-white to-gray-50 shadow-xl fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src={logo} alt="TeachBoost Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold text-blue-600">TeachBoost</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <input
                type="text"
                placeholder="Search courses..."
                className="w-100 pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </motion.div>

            {["About", "Contact", "Courses"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 font-medium"
                variants={linkVariants}
                whileHover="hover"
              >
                {item}
              </motion.a>
            ))}

            <motion.a
              href="#login"
              className="text-gray-700 font-medium"
              variants={linkVariants}
              whileHover="hover"
            >
              Login
            </motion.a>
            <motion.a
              href="#signup"
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors duration-300"
              variants={linkVariants}
              whileHover={{ scale: 1.05 }}
            >
              Sign Up
            </motion.a>

            <motion.a
              href="#cart"
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </motion.a>

            <motion.button
              className="flex items-center space-x-1 text-gray-700"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Globe className="h-6 w-6" />
              <span>English</span>
            </motion.button>
          </div>

          <motion.div
            className="md:hidden flex items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={toggleMenu}>
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-sm border-t"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col space-y-5">
              <motion.div
                className="relative"
                variants={mobileLinkVariants}
              >
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </motion.div>

              {["About", "Contact", "Courses"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 font-medium"
                  variants={mobileLinkVariants}
                  onClick={toggleMenu}
                >
                  {item}
                </motion.a>
              ))}

              <motion.a
                href="#login"
                className="text-gray-700 font-medium"
                variants={mobileLinkVariants}
                onClick={toggleMenu}
              >
                Login
              </motion.a>
              <motion.a
                href="#signup"
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium text-center shadow-md hover:bg-blue-700 transition-colors duration-300"
                variants={mobileLinkVariants}
                onClick={toggleMenu}
              >
                Sign Up
              </motion.a>

              <motion.a
                href="#cart"
                className="flex items-center space-x-2"
                variants={mobileLinkVariants}
                onClick={toggleMenu}
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                <span className="text-gray-700 font-medium">Cart</span>
              </motion.a>

              <motion.button
                className="flex items-center space-x-2 text-gray-700"
                variants={mobileLinkVariants}
              >
                <Globe className="h-6 w-6" />
                <span>English</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;