import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import FeedbackCategory from "./FeedbackCategory";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Feedback.css";

const categories = [
  { id: 1, name: "Pedagogical Quality" },
  { id: 2, name: "Pace" },
  { id: 3, name: "Course Materials" },
  { id: 4, name: "Subject Mastery" }
];

function Feedback() {
  const [ratings, setRatings] = useState({});
  const [id, setId] = useState("");
  const [feedback, setFeedback] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");
    setId(userId || "");
  }, [location.search]);

  const handleRatingChange = (categoryId, value) => {
    setRatings((prevRatings) => ({ ...prevRatings, [categoryId]: value }));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    // Check if all star fields have a value and text area is not empty
    const allStarsRated = Object.values(ratings).every((value) => value !== undefined);
    const isTextAreaNotEmpty = feedback.trim() !== "";

    if (allStarsRated && isTextAreaNotEmpty) {
      console.log("Submitted Ratings:", ratings);
      console.log("Feedback:", feedback);
      navigate("/");
    } else {
      console.log("Please rate all categories and provide feedback.");
      // You can display an error message to the user if needed.
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: 50 }}>Feedback Form</h2>
      {categories.map((category) => (
        <FeedbackCategory
          key={category.id}
          category={category}
          handleRatingChange={handleRatingChange}
          rating={ratings[category.id]}
        />
      ))}
      <textarea
        placeholder="Share your overall experience..."
        className="textarea"
        value={feedback}
        onChange={handleFeedbackChange}
      />
      <button className="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Feedback;
