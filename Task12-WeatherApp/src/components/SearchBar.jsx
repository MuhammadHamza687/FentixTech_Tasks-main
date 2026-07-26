import { useState } from "react";
import { Loader2, Search } from "lucide-react";

export default function SearchBar({ initialCity, isLoading, onSearch }) {
  const [city, setCity] = useState(initialCity);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(city);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="city-search">
        City name
      </label>
      <Search className="search-icon" aria-hidden="true" size={20} />
      <input
        id="city-search"
        type="search"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Enter city name"
        autoComplete="address-level2"
      />
      <button type="submit" disabled={isLoading || !city.trim()}>
        {isLoading ? (
          <Loader2 className="spin" aria-hidden="true" size={18} />
        ) : (
          <Search aria-hidden="true" size={18} />
        )}
        <span>{isLoading ? "Searching" : "Search"}</span>
      </button>
    </form>
  );
}
