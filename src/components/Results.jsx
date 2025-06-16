import React from 'react';
import Thumbnail from './Thumbnail';
import FlipMove from 'react-flip-move';

function Results({ movies = { results: [] } }) {
  if (!movies || !movies.results) {
    return (
      <div className='px-5 my-10 text-center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <FlipMove className='px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center'>
      {movies.results.map((movie) => (
        <Thumbnail key={movie.id} movie={movie} />
      ))}
    </FlipMove>
  );
}

export default Results;
