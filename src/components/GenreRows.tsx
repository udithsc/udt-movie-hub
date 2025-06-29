'use client';

import { useState, useEffect, useMemo } from 'react';
import TrendingSection from './TrendingSection';
import { Movie, fetchMovies, requests } from '@/api';

interface GenreRowsProps {
  onMovieClick: (movie: Movie) => void;
}

function GenreRows({ onMovieClick }: GenreRowsProps) {
  const [genreMovies, setGenreMovies] = useState<Record<string, Movie[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  // Define all genres to show as rows (excluding trending and top rated)
  const genreKeys = useMemo(() => {
    return Object.keys(requests).filter(
      key => !['fetchTrending', 'fetchTopRated'].includes(key)
    );
  }, []);

  const getGenreDisplayName = (key: string) => {
    return key
      .replace('fetch', '')
      .replace('Movies', '')
      .replace(/([A-Z])/g, ' $1')
      .trim();
  };

  useEffect(() => {
    const fetchGenreMovies = async () => {
      // Fetch movies for each genre with a small delay to avoid overwhelming the API
      for (let i = 0; i < genreKeys.length; i++) {
        const genreKey = genreKeys[i];
        setLoading(prev => ({ ...prev, [genreKey]: true }));
        
        try {
          const data = await fetchMovies(genreKey);
          setGenreMovies(prev => ({
            ...prev,
            [genreKey]: data?.results?.slice(0, 20) || []
          }));
        } catch (error) {
          console.error(`Error fetching ${genreKey}:`, error);
          setGenreMovies(prev => ({
            ...prev,
            [genreKey]: []
          }));
        } finally {
          setLoading(prev => ({ ...prev, [genreKey]: false }));
        }
        
        // Small delay between requests to be respectful to the API
        if (i < genreKeys.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    };

    fetchGenreMovies();
  }, [genreKeys]);

  return (
    <div className='bg-white'>
      {genreKeys.map((genreKey) => (
        <div key={genreKey}>
          {loading[genreKey] ? (
            <div className='py-12'>
              <div className='container mx-auto px-4'>
                <h2 className='text-2xl font-bold text-gray-800 mb-8'>
                  {getGenreDisplayName(genreKey)}
                </h2>
                <div className='flex justify-center items-center h-32'>
                  <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500'></div>
                </div>
              </div>
            </div>
          ) : genreMovies[genreKey]?.length > 0 ? (
            <TrendingSection
              movies={genreMovies[genreKey]}
              title={getGenreDisplayName(genreKey)}
              onMovieClick={onMovieClick}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default GenreRows;