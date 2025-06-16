import { create } from 'zustand';
import { Movie, MovieResponse, fetchMovies, searchMovies } from '@/utils/api';

interface MovieState {
  movies: Movie[];
  searchResults: Movie[];
  selectedGenre: string | null;
  isLoading: boolean;
  error: string | null;
  fetchMoviesByGenre: (genre?: string) => Promise<void>;
  searchMoviesByQuery: (query: string) => Promise<void>;
  setSelectedGenre: (genre: string | null) => void;
}

const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  searchResults: [],
  selectedGenre: null,
  isLoading: false,
  error: null,

  fetchMoviesByGenre: async (genre?: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetchMovies(genre);
      set({
        movies: response.results,
        isLoading: false,
        selectedGenre: genre || null,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch movies',
        isLoading: false,
      });
    }
  },

  searchMoviesByQuery: async (query: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await searchMovies(query);
      set({
        searchResults: response.results,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to search movies',
        isLoading: false,
      });
    }
  },

  setSelectedGenre: (genre: string | null) => {
    set({ selectedGenre: genre });
  },
}));

export default useMovieStore;
