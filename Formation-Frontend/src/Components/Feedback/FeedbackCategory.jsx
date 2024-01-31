import React from "react";
import { FaStar } from "react-icons/fa";
import "./Feedback.css"

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

const labels = {
  1: "Terrible",
  2: "Bad",
  3: "Okay",
  4: "Good",
  5: "Excellent"
};

const FeedbackCategory = ({ category, handleRatingChange, rating }) => {
  return (
    <div className="category">
      <p>{category.name}</p>
      <div className="stars">
        {Array(5).fill(0).map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleRatingChange(category.id, index + 1)}
            color={rating > index ? colors.orange : colors.grey}
            style={{
              marginRight: 10,
              cursor: "pointer"
            }}
          />
        ))}
      </div>
      <p className="ratingLabel">{labels[rating]}</p>
    </div>
  );
};

export default FeedbackCategory;
