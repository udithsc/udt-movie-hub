import { create } from 'zustand';
import {
  Movie,
  fetchMovies,
  searchMovies as searchMoviesAPI,
  fetchMovieTrailer,
} from '@/api';

interface MovieState {
  movies: Movie[];
  searchResults: Movie[];
  selectedGenre: string | null;
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  selectedMovie: Movie | null;
  selectedTrailerKey: string | null;
  isModalOpen: boolean;
  fetchMoviesByGenre: (genre?: string, loadMore?: boolean) => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  setSelectedGenre: (genre: string | null) => void;
  clearSearchResults: () => void;
  setSelectedMovie: (movie: Movie | null) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
}

const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  searchResults: [],
  selectedGenre: null,
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  error: null,
  selectedMovie: null,
  selectedTrailerKey: null,
  isModalOpen: false,

  fetchMoviesByGenre: async (genre?: string, loadMore: boolean = false) => {
    const {
      currentPage,
      movies,
      selectedGenre: currentSelectedGenre,
      hasMore,
    } = get();

    if (
      get().isLoading ||
      (!loadMore && genre === currentSelectedGenre && movies.length > 0) ||
      (loadMore && !hasMore)
    ) {
      return;
    }

    try {
      set({ isLoading: true, error: null });

      let nextPage = loadMore ? currentPage + 1 : 1;
      let targetGenre = genre || currentSelectedGenre;

      if (!loadMore && genre !== currentSelectedGenre) {
        set({
          movies: [],
          currentPage: 1,
          hasMore: true,
          selectedGenre: genre || null,
        });
        nextPage = 1;
        targetGenre = genre || null;
      }

      const response = await fetchMovies(targetGenre || undefined, nextPage);

      set((state) => {
        const newMovies = loadMore
          ? [...state.movies, ...response.results]
          : response.results;
        const uniqueMovies = Array.from(
          new Map(newMovies.map((movie) => [movie.id, movie])).values()
        );

        return {
          movies: uniqueMovies,
          currentPage: nextPage,
          hasMore: response.results.length > 0,
          isLoading: false,
          selectedGenre: targetGenre || null,
        };
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch movies',
        isLoading: false,
      });
    }
  },

  searchMovies: async (query: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await searchMoviesAPI(query);
      set({
        searchResults: response.results,
        isLoading: false,
        currentPage: 1,
        hasMore: false,
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

  clearSearchResults: () => {
    set({ searchResults: [], currentPage: 1, hasMore: true }); // Reset search state to allow genre fetching
  },

  setSelectedMovie: async (movie: Movie | null) => {
    set({ selectedMovie: movie, selectedTrailerKey: null });
    if (movie) {
      const trailerKey = await fetchMovieTrailer(movie.id);
      set({ selectedTrailerKey: trailerKey });
    }
  },

  openModal: () => {
    set({ isModalOpen: true });
  },

  closeModal: () => {
    set({ isModalOpen: false, selectedMovie: null, selectedTrailerKey: null });
  },
}));

export default useMovieStore;
