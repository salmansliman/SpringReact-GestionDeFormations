import React, { useState } from 'react';
import './AddFormation.css';

const AddFormation = () => {

  const [courseTitle, setCourseTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState('');
  const [goals, setGoals] = useState('');
  const [courseDetails, setCourseDetails] = useState('');


  const MyAdd = () => {
    console.log('Course Title:', courseTitle);
    console.log('Duration:', duration);
    console.log('Cost:', cost);
    console.log('Goals:', goals);
    console.log('Course Details:', courseDetails);
  };

  return (
    <div className='containerAdd'>
      <h2>Add Formation</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='inputContainerAdd'>
          <p>Course Title</p>
          <input type='text' value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
        </div>
        <div className='inputContainerAdd'>
          <p>Duration</p>
          <input type='number' value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div className='inputContainerAdd'>
          <p>Cost</p>
          <input type='number' value={cost} onChange={(e) => setCost(e.target.value)} />
        </div>
        <div className='inputContainerAdd'>
          <p>Goals</p>
          <input type='text' value={goals} onChange={(e) => setGoals(e.target.value)} />
        </div>
        <div className='inputContainerAdd'>
          <p>Course Details</p>
          <input type='text' value={courseDetails} onChange={(e) => setCourseDetails(e.target.value)} />
        </div>
        <div>
          <div className='bottomFormAdd'>
            <button type='submit' onClick={MyAdd}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFormation;
