'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import Results from '@/components/Results';
import { fetchMovies, searchMovies, MovieResponse } from '@/utils/api';

export default function Home() {
  const [movies, setMovies] = useState<MovieResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load
  useEffect(() => {
    const loadInitialMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
      setIsLoading(false);
    };
    loadInitialMovies();
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
    setIsLoading(false);
  };

  return (
    <main className='min-h-screen'>
      <Header onSearch={handleSearch} />
      <Nav />
      {isLoading ? (
        <div className='flex items-center justify-center min-h-[50vh]'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
        </div>
      ) : (
        <Results movies={movies || { results: [] }} />
      )}
    </main>
  );
}
