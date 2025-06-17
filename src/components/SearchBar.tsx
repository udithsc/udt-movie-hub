"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import useMovieStore from "@/store/useMovieStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchMoviesByQuery, clearSearchResults } = useMovieStore();
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchMoviesByQuery(searchQuery);
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    } else {
      clearSearchResults();
      router.push("/");
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    clearSearchResults();
    router.push("/");
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      className="flex items-center gap-2 w-full max-w-xl relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative flex-1">
        <motion.input
          type="text"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search movies..."
          className="bg-gray-800/50 text-white px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700 w-full text-lg pr-10"
          whileFocus={{ scale: 1.02 }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-2xl focus:outline-none"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <motion.button
        type="submit"
        className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Search
      </motion.button>
    </motion.form>
  );
}

export default SearchBar;
