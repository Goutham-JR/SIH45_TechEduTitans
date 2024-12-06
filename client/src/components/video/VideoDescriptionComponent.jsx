import React, { useState } from 'react'; 
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Flag, 
  ChevronDown, 
  ChevronUp, 
  BookmarkPlus 
} from 'lucide-react';

const VideoDescriptionComponent = ({ 
  title, 
  instructor, 
  uploadDate, 
  views, 
  likes, 
  description 
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(null);

  // Truncate description if too long
  const truncateDescription = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return isDescriptionExpanded 
      ? text 
      : `${text.slice(0, maxLength)}...`;
  };

  // Format view count
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  // Format upload date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      {/* Video Title */}
      <h1 className="text-xl font-bold mb-2">{title}</h1>

      {/* Video Metadata */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="text-gray-100 w-full sm:w-auto">
          <p>{formatViewCount(views)} • {formatDate(uploadDate)}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Like Button */}
          <button 
            className={`flex items-center space-x-1 ${isLiked === true ? 'text-blue-600' : 'text-gray-100'}`}
            onClick={() => setIsLiked(isLiked === true ? null : true)}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{likes}</span>
          </button>

          {/* Dislike Button */}
          <button 
            className={`flex items-center space-x-1 ${isLiked === false ? 'text-red-600' : 'text-gray-100'}`}
            onClick={() => setIsLiked(isLiked === false ? null : false)}
          >
            <ThumbsDown className="w-5 h-5" />
          </button>

          {/* Share Button */}
          <button className="text-gray-100 hover:text-blue-600">
            <Share2 className="w-5 h-5" />
          </button>

          {/* Bookmark Button */}
          <button className="text-gray-100 hover:text-green-600">
            <BookmarkPlus className="w-5 h-5" />
          </button>

          {/* Report Button */}
          <button className="text-gray-100 hover:text-red-600">
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Instructor Information */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 mr-3"></div>
        <div>
          <h2 className="font-semibold">{instructor}</h2>
          <p className="text-sm text-gray-100">Course Instructor</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-100">
          {truncateDescription(description)}
          {description.length > 200 && (
            <button 
              className="text-blue-600 ml-2 flex items-center"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          )}
        </p>
      </div>

      {/* Hashtags and Course Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['Learning', 'Web Development', 'React', 'Frontend'].map((tag) => (
          <span 
            key={tag} 
            className="bg-gray-700 text-gray-100 px-2 py-1 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default VideoDescriptionComponent;
