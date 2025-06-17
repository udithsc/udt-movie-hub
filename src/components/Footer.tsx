import React from 'react';

function Footer() {
  return (
    <footer className='w-full py-6 mt-8 bg-black/40 text-center text-gray-400 text-sm rounded-t-lg shadow-inner'>
      <span>
        &copy; {new Date().getFullYear()} UDT Movies &mdash; Built with Next.js,
        TMDB API, and Zustand
      </span>
    </footer>
  );
}

export default Footer;
