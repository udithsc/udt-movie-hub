import { Metadata } from 'next';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import Results from '@/components/Results';
import { fetchMovies } from '@/lib/fetchMovies';

export const metadata: Metadata = {
  title: 'Hulu 2.0',
  description: 'Watch movies and TV shows on Hulu',
};

export default async function Home({
  searchParams,
}: {
  searchParams: { genre?: string };
}) {
  const movies = await fetchMovies(searchParams.genre);

  return (
    <main className='min-h-screen'>
      <Header />
      <Nav />
      <Results movies={movies} />
    </main>
  );
}
