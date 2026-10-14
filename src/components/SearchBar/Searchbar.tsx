// components/SearchBar/Searchbar.tsx
import React from "react";
import { FiSearch } from "react-icons/fi";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  category?: string;
  setCategory?: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex items-center gap-2 w-full md:w-72 max-w-md">
      <div className="flex items-center flex-1 bg-[#FAF7F2] border border-[#E7DCD7] rounded-full px-3.5 py-1.5 hover:border-[#812D3A] focus-within:border-[#4A101C] focus-within:ring-1 focus-within:ring-[#A66A75] transition-all duration-200">
        <FiSearch size={15} className="text-[#75676A] shrink-0" />
        <input
          type="text"
          placeholder="Search luxury collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none px-2.5 text-xs md:text-sm text-[#241719] placeholder:text-[#75676A]"
        />
      </div>
    </div>
  );
};

export default SearchBar;