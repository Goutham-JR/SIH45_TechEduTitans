import React from "react";

function FilterBar({ filter, setFilter, searchTerm, setSearchTerm, filters }) {
  return (
    <div className="flex justify-between mb-6">
      <div className="flex gap-4">
        {filters.map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-6 py-3 rounded-lg text-base ${
              filter === filterOption ? "bg-blue-600" : "bg-gray-800"
            } hover:bg-blue-500 transition-colors`}
          >
            {filterOption}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-800 text-white"
      />
    </div>
  );
}

export default FilterBar;
