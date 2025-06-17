'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Results from '@/components/Results';
import MovieModal from '@/components/MovieModal';
import useMovieStore from '@/store/useMovieStore';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

export default function Home() {
  const searchParams = useSearchParams();
  const {
    movies,
    searchResults,
    isLoading,
    error,
    fetchMoviesByGenre,
    hasMore,
    selectedGenre,
    selectedMovie,
    isModalOpen,
    closeModal,
  } = useMovieStore();

  const searchQuery = searchParams.get('search');
  const genre = searchParams.get('genre');
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial fetch or genre change fetch
  useEffect(() => {
    if (!searchQuery) {
      // Only fetch genres if not in search mode
      if (genre && genre !== selectedGenre) {
        fetchMoviesByGenre(genre, false);
      } else if (!genre && !selectedGenre) {
        // Initial load for trending
        fetchMoviesByGenre(undefined, false);
      }
    }
  }, [genre, searchQuery, selectedGenre, fetchMoviesByGenre]);

  // Handle scroll for infinite loading
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (
        scrollHeight - scrollTop - clientHeight < 100 &&
        !isLoading &&
        hasMore &&
        !searchQuery
      ) {
        fetchMoviesByGenre(selectedGenre || undefined, true);
      }
    }
  }, [isLoading, hasMore, fetchMoviesByGenre, selectedGenre, searchQuery]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <main className='min-h-screen bg-[#06202A] flex flex-col'>
      <Header />
      <div className='flex justify-center mt-2 mb-4 px-4'>
        <SearchBar />
      </div>

      <div
        ref={containerRef}
        className='flex-1 overflow-y-auto'
        style={{ maxHeight: 'calc(100vh - 180px)' }}
      >
        {isLoading && movies.length === 0 ? ( // Initial loading
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
          </div>
        ) : error ? (
          <div className='text-center text-red-500 mt-4'>{error}</div>
        ) : (
          <Results results={searchQuery ? searchResults : movies} />
        )}

        {isLoading && movies.length > 0 && (
          <div className='flex justify-center py-4'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500'></div>
          </div>
        )}

        {!isLoading && !hasMore && !searchQuery && movies.length > 0 && (
          <div className='text-center text-gray-400 py-4'>
            You&apos;ve reached the end of the list.
          </div>
        )}
      </div>

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <Footer />
    </main>
  );
}
