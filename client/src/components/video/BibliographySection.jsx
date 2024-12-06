import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react"; // Importing Lucide Icon for links

const BibliographySection = () => {
  // Sample data for references (displaying only one reference)
  const reference = {
     
    title: "Artificial Intelligence: A Modern Approach",
    authors: "Stuart J. Russell, Peter Norvig",
    publicationDate: "4th Edition, 2021",
    sourceType: "Book",
    accessLink: "https://www.amazon.com/Artificial-Intelligence-Modern-Approach-4th/dp/0134610997",
    description: "This book is widely used in AI courses and serves as a foundational text for understanding AI principles.",
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg mt-6">
      {/* Bibliography Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Bibliography and References</h2>

        <div className="border-b border-gray-600 pb-4">
          <h3 className="text-lg font-semibold text-blue-500">{reference.title}</h3>
          <p className="text-gray-400">Author(s): {reference.authors}</p>
          <p className="text-gray-400">Publication Date: {reference.publicationDate}</p>
          <p className="text-gray-400">Source Type: {reference.sourceType}</p>
          <p className="text-gray-300 mb-2">{reference.description}</p>
          <a
            href={reference.accessLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 flex items-center gap-2 hover:text-blue-700"
          >
            <ExternalLink size={16} />
            Read Here
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default BibliographySection;
