import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, Tag, Smile, Frown, Meh, X, Check } from "lucide-react";

const FeedbackComponent = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState([]);
  const [comment, setComment] = useState("");
  const [timeStamp, setTimeStamp] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const feedbackTypes = [
    "Content clarity",
    "Audio/visual quality",
    "Relevance to topic",
    "Pacing of the video",
  ];

  const tags = ["Poor audio", "Blurry video", "Too fast", "Too slow"];

  const handleRating = (value) => {
    setRating(value);
  };

  const toggleFeedbackType = (type) => {
    setFeedbackType((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const handleSubmitFeedback = () => {
    console.log({
      rating,
      feedbackType,
      comment,
      timeStamp,
      isAnonymous,
    });
    setIsFeedbackOpen(false);
    setRating(0);
    setFeedbackType([]);
    setComment("");
    setTimeStamp("");
    setIsAnonymous(false);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#1A202C", // gray-900
        color: "#FFFFFF", // white text
        borderRadius: "8px",
      }}
    >
      <motion.button
        onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
        whileHover={{ scale: 1.1 }}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isFeedbackOpen ? "Close Feedback" : "Give Feedback"}
      </motion.button>

      {isFeedbackOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#2D3748", // gray-800
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Was this video helpful?</h3>

          {/* Rating Section */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={30}
                color={rating >= star ? "#FFD700" : "#718096"} // yellow or gray-600
                onClick={() => handleRating(star)}
                style={{ cursor: "pointer", marginRight: "5px" }}
              />
            ))}
            <span style={{ marginLeft: "10px" }}>{rating} / 5</span>
          </div>

          {/* Categorized Feedback */}
          <div>
            <h4>Feedback Categories:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
              {feedbackTypes.map((type) => (
                <motion.button
                  key={type}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFeedbackType(type)}
                  style={{
                    padding: "5px 10px",
                    border: feedbackType.includes(type)
                      ? "2px solid #4CAF50"
                      : "1px solid #718096", // gray-600 border
                    borderRadius: "5px",
                    backgroundColor: feedbackType.includes(type) ? "#4CAF50" : "#1A202C",
                    color: feedbackType.includes(type) ? "#FFFFFF" : "#A0AEC0", // gray-400 text
                    cursor: "pointer",
                  }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tagging System */}
          <div>
            <h4>Tags for Specific Issues:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "inline-block",
                    padding: "5px 10px",
                    border: "1px solid #718096", // gray-600
                    borderRadius: "5px",
                    backgroundColor: "#2D3748", // gray-800
                    color: "#A0AEC0", // gray-400 text
                    cursor: "pointer",
                  }}
                >
                  <Tag size={14} style={{ marginRight: "5px" }} />
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <h4>Additional Comments:</h4>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback here..."
              rows={4}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #718096", // gray-600 border
                backgroundColor: "#2D3748", // gray-800
                color: "#FFFFFF", // white text
                marginBottom: "15px",
              }}
            ></textarea>
          </div>

          {/* Timestamp Section */}
          <div>
            <h4>Timestamp:</h4>
            <input
              type="text"
              value={timeStamp}
              onChange={(e) => setTimeStamp(e.target.value)}
              placeholder="E.g., 2:15"
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                border: "1px solid #718096", // gray-600 border
                backgroundColor: "#2D3748", // gray-800
                color: "#FFFFFF", // white text
                width: "100%",
                marginBottom: "15px",
              }}
            />
          </div>

          {/* Anonymous Feedback */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              style={{ marginRight: "10px" }}
            />
            <label>Submit feedback anonymously</label>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleSubmitFeedback}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit Feedback
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default FeedbackComponent;
