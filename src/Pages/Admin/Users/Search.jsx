import { BiSearch } from "react-icons/bi";

export const Search = ({ search, setSearch }) => {
    return (
      <div className="relative mb-10 text-center lg:text-left items-center lg:items-start sm:mx-auto w-50 lg:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch className="text-Variant2" />
        </div>
        <input
          className="w-full pl-10 pr-3 py-3 bg-Variant3 rounded-full text-sm text-Variant2 placeholder-Variant2 outline-none"
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </div>
    );
  };