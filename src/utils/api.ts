const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  original_name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  first_air_date?: string;
  vote_count: number;
  media_type?: string;
}

export interface MovieResponse {
  results: Movie[];
}

export interface MovieVideo {
  key: string;
  site: string;
  type: string;
}

const requests = {
  fetchTrending: {
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchTopRated: {
    url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  fetchActionMovies: {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchComedyMovies: {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  fetchHorrorMovies: {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  fetchRomanceMovies: {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  fetchMystery: {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  },
  fetchSciFi: {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  },
  fetchWestern: {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  },
  fetchAnimation: {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  },
  fetchTV: {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
  },
};

export async function fetchMovies(
  genre?: string,
  page: number = 1,
): Promise<MovieResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}${
        requests[genre as keyof typeof requests]?.url ||
        requests.fetchTrending.url
      }&page=${page}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [] };
  }
}

export async function searchMovies(query: string): Promise<MovieResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query,
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to search movies");
    }

    return response.json();
  } catch (error) {
    console.error("Error searching movies:", error);
    return { results: [] };
  }
}

export async function fetchMovieTrailer(
  movieId: number,
): Promise<string | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    const trailer = (data.results as MovieVideo[]).find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer" && vid.key,
    );
    return trailer ? trailer.key : null;
  } catch {
    return null;
  }
}

export default requests;
