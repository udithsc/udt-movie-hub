import requests from '@/utils/requests';

export async function fetchMovies(genre?: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3${
        requests[genre as keyof typeof requests]?.url ||
        requests.fetchTrending.url
      }`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { results: [] };
  }
}
