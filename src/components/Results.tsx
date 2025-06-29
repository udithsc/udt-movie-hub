'use client';

import React from 'react';
import Thumbnail from './Thumbnail';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie } from '@/api';

interface ResultsProps {
  results: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Results({ results = [], onMovieClick }: ResultsProps) {
  if (!results || results.length === 0) {
    return (
      <div className='px-5 my-10 text-center text-gray-400'>
        <p>
          No movies found. Try searching for something else or select a
          different category.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='show'
      className='grid px-5 my-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4'
    >
      <AnimatePresence mode='wait'>
        {results.map((movie) => (
          <motion.div
            key={movie.id}
            variants={item}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className='transform transition-all duration-200'
            layout
          >
            <Thumbnail movie={movie} onClick={onMovieClick} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default Results;
