'use client';

import React from 'react';
import Thumbnail from './Thumbnail';
import { motion, AnimatePresence } from 'framer-motion';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_count: number;
  media_type?: string;
}

interface ResultsProps {
  movies: {
    results: Movie[];
  };
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

function Results({ movies = { results: [] } }: ResultsProps) {
  if (!movies || !movies.results) {
    return (
      <div className='px-5 my-10 text-center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='show'
      className='px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center gap-4'
    >
      <AnimatePresence>
        {movies.results.map((movie) => (
          <motion.div
            key={movie.id}
            variants={item}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className='transform transition-all duration-200'
          >
            <Thumbnail movie={movie} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default Results;
