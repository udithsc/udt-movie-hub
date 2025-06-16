'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import Results from '@/components/Results';
import useMovieStore from '@/store/useMovieStore';

export default function Home() {
  const searchParams = useSearchParams();
  const {
    movies,
    searchResults,
    isLoading,
    error,
    fetchMoviesByGenre,
    selectedGenre,
  } = useMovieStore();

  const searchQuery = searchParams.get('search');
  const genre = searchParams.get('genre');

  useEffect(() => {
    if (genre && genre !== selectedGenre) {
      fetchMoviesByGenre(genre);
    } else if (!genre && !searchQuery) {
      fetchMoviesByGenre();
    }
  }, [genre, searchQuery, selectedGenre, fetchMoviesByGenre]);

  return (
    <main className='min-h-screen bg-[#06202A]'>
      <Header />
      <Nav />

      {isLoading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
        </div>
      ) : error ? (
        <div className='text-center text-red-500 mt-4'>{error}</div>
      ) : (
        <Results results={searchQuery ? searchResults : movies} />
      )}
    </main>
  );
}
