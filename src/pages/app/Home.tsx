import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import image2 from "@/images/image2.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-12 pt-20 md:pt-0">
      <motion.div
        className="flex-1 text-center lg:text-left mb-10 lg:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Dive Into Classic Literature
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-md mx-auto lg:mx-0 text-gray-700">
          Explore thousands of old books for free. Read anywhere, anytime.
        </p>
        <Button onClick={() => navigate("/books")}>Browse Books</Button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={image2}
          alt="Book Lover Illustration"
          className="w-full max-w-md mx-auto"
        />
      </motion.div>
    </div>
  );
};

export default Home;
