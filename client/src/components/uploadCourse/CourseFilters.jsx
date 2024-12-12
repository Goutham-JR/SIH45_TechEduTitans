import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  School,
  Search,
  Clock,
  List,
  DollarSign,
  Star
} from 'lucide-react';

const CourseFilters = () => {
  const [filters, setFilters] = useState({
    categories: [],
    duration: [],
    priceRange: [],
    ratings: []
  });

  const categories = [
    { id: 'engineering', label: 'Engineering' },
    { id: 'management', label: 'Management' },
    { id: 'arts', label: 'Arts' },
    { id: 'science', label: 'Science' }
  ];

  const durations = [
    { id: '6months', label: '6 Months' },
    { id: '1year', label: '1 Year' },
    { id: '2years', label: '2 Years' },
    { id: '4years', label: '4 Years' }
  ];

  const priceRanges = [
    { id: 'range1', label: '₹10,000 - ₹25,000' },
    { id: 'range2', label: '₹25,000 - ₹50,000' },
    { id: 'range3', label: '₹50,000 - ₹1,00,000' },
    { id: 'range4', label: 'Above ₹1,00,000' }
  ];

  const ratings = [
    { id: '5stars', label: '5 Stars' },
    { id: '4stars', label: '4 Stars & Up' },
    { id: '3stars', label: '3 Stars & Up' },
    { id: '2stars', label: '2 Stars & Up' }
  ];

  const handleFilterChange = (section, id) => {
    setFilters(prev => ({
      ...prev,
      [section]: prev[section].includes(id)
        ? prev[section].filter(item => item !== id)
        : [...prev[section], id]
    }));
  };

  const FilterSection = ({ title, items, section, icon: Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 bg-gray-800"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-blue-500" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={item.id}
              className="peer"
              checked={filters[section].includes(item.id)}
              onChange={() => handleFilterChange(section, item.id)}
            />
            <label
              htmlFor={item.id}
              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 w-80 bg-gray-800 shadow-lg rounded-lg"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <School className="text-blue-500" />
          Course Filters
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
          />
        </div>

        {/* Filter Sections */}
        <FilterSection
          title="Course Category"
          items={categories}
          section="categories"
          icon={List}
        />

        <FilterSection
          title="Duration"
          items={durations}
          section="duration"
          icon={Clock}
        />

        <FilterSection
          title="Price Range"
          items={priceRanges}
          section="priceRange"
          icon={DollarSign}
        />

        <FilterSection
          title="Course Ratings"
          items={ratings}
          section="ratings"
          icon={Star}
        />
      </div>
    </motion.div>
  );
};

export default CourseFilters;
