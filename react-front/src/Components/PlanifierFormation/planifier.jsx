import React, { useState } from 'react';
import './planifier.css';

const Planifier = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState('');
  const [goals, setGoals] = useState('');
  const [courseDetails, setCourseDetails] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [formatter, setFormatter] = useState('');
  const [enterprise, setEnterprise] = useState('');

  const MyPlanifier = () => {
    console.log('Course Title:', courseTitle);
    console.log('Duration:', duration);
    console.log('Cost:', cost);
    console.log('Goals:', goals);
    console.log('Course Details:', courseDetails);
    console.log('City:', city);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Category:', category);
    console.log('Formatter:', formatter);
    console.log('Enterprise:', enterprise);
  };

  return (
    <div className='customcontainer'>
      <h2>Planification</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='inputcustomcontainer'>
          <p>Course Title</p>
          <input type='text' value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
        </div>
        <div className='inputcustomcontainer'>
          <p>Duration</p>
          <input type='number' value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div className='inputcustomcontainer'>
          <p>Cost</p>
          <input type='number' value={cost} onChange={(e) => setCost(e.target.value)} />
        </div>
        <div className='inputcustomcontainer'>
          <p>Goals</p>
          <input type='text' value={goals} onChange={(e) => setGoals(e.target.value)} />
        </div>
        <div className='inputcustomcontainer'>
          <p>Course Details</p>
          <input type='text' value={courseDetails} onChange={(e) => setCourseDetails(e.target.value)} />
        </div>
        <div className='inputcustomcontainerr'>
          <p>City</p>
          <input type='text' value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className='inputcustomcontainer'>
          <p>Start Date</p>
          <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className='inputcustomcontainerr'>
          <p>End Date</p>
          <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className='inputcustomcontainer'>
          <p>Category</p>
          <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className='inputcustomcontainer'>
          <p>Formatter</p>
          <select value={formatter} onChange={(e) => setFormatter(e.target.value)}>
            <option value='option1'>Zaka</option>
            <option value='option2'>Salman</option>
          </select>
        </div>
        <div className='inputcustomcontainer'>
          <p>Enterprise</p>
          <select value={enterprise} onChange={(e) => setEnterprise(e.target.value)}>
            <option value='enterprise1'>babel</option>
            <option value='enterprise2'>nttdata</option>
          </select>
        </div>
        <div>
          <div className='bottomcustomForm'>
            <button type='submit' onClick={MyPlanifier}>
              Planifier
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Planifier;
