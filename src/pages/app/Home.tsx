import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image2 from "@/images/image2.png";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full  text-ink flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-12 border border-faded pt-30 ">
      {/* Text Section */}
      <motion.div
        className="flex-1 text-center lg:text-left mb-10 lg:mb-0 font-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6  font-bold">
          Discover Your Next Read
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-md mx-auto lg:mx-0 italic text-muted-foreground">
          A modern collection of classic stories, timeless ideas, and great
          reads.
        </p>

        <Button
          size={`lg`}
          // variant={`outline`}
          className="border border-aged font-serif hover:bg-primary hover:text-white transition duration-300"
          onClick={() => navigate("/books")}
        >
          Browse the library →
        </Button>

        {/* Extra detail */}
        <p className="mt-6 text-sm text-faded italic">
          Fresh picks for curious readers
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="p-4">
          <img
            src={image2}
            alt="Book Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
