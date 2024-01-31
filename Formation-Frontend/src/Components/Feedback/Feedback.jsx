import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import FeedbackCategory from "./FeedbackCategory";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Feedback.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api/axios";

const categories = [
  { id: 1, name: "Pedagogical Quality" },
  { id: 2, name: "Pace" },
  { id: 3, name: "Course Materials" },
  { id: 4, name: "Subject Mastery" }
];

function Feedback() {
  const [ratings, setRatings] = useState({});
  const [idStudent, setIdStudent] = useState("");
  const [idTeacher, setIdTeacher] = useState("");
  const [feedback, setFeedback] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("idStudent");
    const teacherId = searchParams.get("idTeacher");
    setIdStudent(userId || "");
    setIdTeacher(teacherId || "");
  }, [location.search]);

  const handleRatingChange = (categoryId, value) => {
    setRatings((prevRatings) => ({ ...prevRatings, [categoryId]: value }));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    const allStarsRated = Object.values(ratings).every((value) => value !== undefined);
    const isTextAreaNotEmpty = feedback.trim() !== "";

    if (allStarsRated && isTextAreaNotEmpty) {
      try {
        const requestBody = {
          qualite: ratings[1],
          rythme: ratings[2],
          cours: ratings[3],
          maitrise: ratings[4],
          message: feedback,
          student: {
            id: parseInt(idStudent, 10)
          },
          formateur: {
            id: parseInt(idTeacher, 10)
          }
        };
        const token = localStorage.getItem("token")

        const response = await axios.post("/feedback/add", requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
        }
        });

        console.log("Feedback submitted successfully:", response.data);
        toast.success("Feedback submitted successfully"); // Display success toast
        navigate("/");
      } catch (error) {
        console.error("Error submitting feedback:", error);
        toast.error("Error submitting feedback"); // Display error toast
      }
    } else {
      console.log("Please rate all categories and provide feedback.");
      toast.error("Please rate all categories and provide feedback"); // Display error toast
    }
  };

  return (
    <div className="containerFeedback">
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
