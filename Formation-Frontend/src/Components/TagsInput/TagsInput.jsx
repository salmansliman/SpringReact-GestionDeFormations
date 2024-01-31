// TagsInput.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TagsInput.css';

const TagsInput = ({ selectedTags }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTag = () => {
    if (tagInput.trim() !== '' && tags.length < 6) {
      setTags([...tags, tagInput.trim()]);
      selectedTags([...tags, tagInput.trim()]);
      setTagInput('');
    } else if (tags.length >= 6) {
      toast.error('Maximum number of tags reached!')
    }
  };

  const handleInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  };

  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTag(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={tagInput}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Press enter to add tags"
        className="tags-input-field"
      />
    </div>
  );
};

export default TagsInput;
