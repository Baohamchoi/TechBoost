import React from 'react';
import { motion } from 'framer-motion';
import bg_home from '../assets/background/bg_home.jpg';
import img1 from '../assets/home/img_home.jpg';
import img2 from '../assets/home/img1_home.jpg';
import img3 from '../assets/home/img2_home.webp';

function Home() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.7,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg_home})` }}>
      <motion.section
        className="flex flex-col items-center justify-center text-center text-white bg-black opacity-70 py-24 px-4"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
          Master Programming with Our Courses
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg md:text-xl mb-8 max-w-2xl">
          Learn to code from beginner to pro with expert-led tutorials.
        </motion.p>
        <motion.button
          variants={itemVariants}
          className="bg-blue-600 hover:bg-blue-700 hover:shadow-xl text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform"
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Courses
        </motion.button>
      </motion.section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: img1, title: 'Hands-On Projects', desc: 'Build real-world applications to solidify your skills.' },
            { img: img2, title: 'Expert Instructors', desc: 'Learn from industry professionals with years of experience.' },
            { img: img3, title: 'Flexible Learning', desc: 'Study at your own pace, anytime, anywhere.' },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-black opacity-60 backdrop-blur-md p-6 rounded-xl text-center text-white bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${card.img})` }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-white">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        className="flex flex-col items-center justify-center text-center text-white bg-black opacity-70 py-16 px-4"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Coding?
        </motion.h2>
        <motion.button
          variants={itemVariants}
          className="bg-blue-600 hover:bg-blue-700 hover:shadow-xl text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform"
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          Join Now
        </motion.button>
      </motion.section>
    </div>
  );
}

export default Home;