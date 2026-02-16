import { useState } from "react";

function Filters({ onFilter }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const empty = {
      search: "",
      category: "",
      location: "",
      startDate: "",
      endDate: "",
    };
    setFilters(empty);
    onFilter(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="filter-box">
      <input
        type="text"
        name="search"
        placeholder="Search events..."
        value={filters.search}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleChange}
      />

      <select name="category" value={filters.category} onChange={handleChange}>
        <option value="">All Categories</option>
        <option value="Tech">Tech</option>
        <option value="Music">Music</option>
        <option value="Business">Business</option>
      </select>

      <input
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={handleChange}
      />

      <input
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={handleChange}
      />

      <button type="submit">Apply</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default Filters;