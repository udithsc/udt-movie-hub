'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TrendingSection from '@/components/TrendingSection';
import TrailerSection from '@/components/TrailerSection';
import GenreRows from '@/components/GenreRows';
import Results from '@/components/Results';
import MovieModal from '@/components/MovieModal';
import Nav from '@/components/Nav';
import useMovieStore from '@/store/useMovieStore';
import Footer from '@/components/Footer';
import { Movie, fetchMovies } from '@/api';

export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  
  const {
    movies,
    searchResults,
    isLoading,
    error,
    searchMovies,
    fetchMoviesByGenre,
    selectedGenre,
    selectedMovie,
    isModalOpen,
    closeModal,
    setSelectedMovie,
    openModal,
  } = useMovieStore();

  const searchQuery = searchParams.get('search');
  const genre = searchParams.get('genre');

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch trending movies directly
        const trendingData = await fetchMovies('fetchTrending');
        setTrendingMovies(trendingData?.results || []);

        // Fetch popular movies (using top rated)
        const popularData = await fetchMovies('fetchTopRated');
        setPopularMovies(popularData?.results || []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  // Handle genre fetching
  useEffect(() => {
    if (!searchQuery) {
      if (genre && genre !== selectedGenre) {
        fetchMoviesByGenre(genre, false);
      } else if (!genre && !selectedGenre) {
        fetchMoviesByGenre('fetchTrending', false);
      }
    }
  }, [genre, searchQuery, selectedGenre, fetchMoviesByGenre]);

  // Handle search from hero section
  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
      searchMovies(query);
    }
  };

  // Handle movie click
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

  // Handle search from URL params
  useEffect(() => {
    if (searchQuery) {
      searchMovies(searchQuery);
    }
  }, [searchQuery, searchMovies]);

  return (
    <main className='min-h-screen bg-white'>
      <Header />
      
      {/* Show different layouts based on current state */}
      {searchQuery ? (
        /* Search Results */
        <div className='bg-white min-h-screen'>
          <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              Search Results for &ldquo;{searchQuery}&rdquo;
            </h1>
            <p className='text-gray-600 mb-8'>
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </p>
            {isLoading ? (
              <div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
              </div>
            ) : error ? (
              <div className='text-center text-red-500 mt-4 bg-red-50 p-4 rounded-lg'>{error}</div>
            ) : searchResults.length === 0 ? (
              <div className='text-center py-16'>
                <div className='text-gray-400 text-6xl mb-4'>🔍</div>
                <h2 className='text-2xl font-semibold text-gray-700 mb-2'>No Results Found</h2>
                <p className='text-gray-500'>Try searching with different keywords.</p>
              </div>
            ) : (
              <Results results={searchResults} onMovieClick={handleMovieClick} />
            )}
          </div>
        </div>
      ) : genre ? (
        /* Genre-based Movie Grid */
        <>
          <div className='bg-[#032541] py-4'>
            <div className='container mx-auto px-4'>
              <Nav />
            </div>
          </div>
          <div className='container mx-auto px-4 py-8'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>
              {genre.replace('fetch', '').replace(/([A-Z])/g, ' $1').trim()} Movies
            </h1>
            {isLoading ? (
              <div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
              </div>
            ) : error ? (
              <div className='text-center text-red-500 mt-4'>{error}</div>
            ) : (
              <Results results={movies} onMovieClick={handleMovieClick} />
            )}
          </div>
        </>
      ) : (
        /* Homepage with Hero and Sections */
        <>
          <HeroSection onSearch={handleSearch} />
          
          <TrendingSection
            movies={trendingMovies}
            title="Trending"
            onMovieClick={handleMovieClick}
          />
          
          <TrailerSection
            movies={popularMovies}
            onMovieClick={handleMovieClick}
          />
          
          <TrendingSection
            movies={popularMovies}
            title="What's Popular"
            onMovieClick={handleMovieClick}
          />

          {/* Genre-wise Movie Rows */}
          <GenreRows onMovieClick={handleMovieClick} />
        </>
      )}

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      
      <Footer />
    </main>
  );
}
