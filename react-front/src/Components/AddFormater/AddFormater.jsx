import React, { useState } from 'react';
import './AddFormater.css'; // Assuming you have an AddFormater.css file

const AddFormater = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Formater'); // Default to Formater
  const [competenceType, setCompetenceType] = useState('');
  const [type, setType] = useState('Intern'); // Default to Intern

  const handleAddFormater = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
    console.log('Competence Type:', competenceType);
    console.log('Type:', type);
  };

  return (
    <div className='container'>
      <h2>Add Formater</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='inputContainer'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <label htmlFor='role'>Role</label>
          <select
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value='Formater'>Formater</option>
          </select>
        </div>
        <div className='inputContainer'>
          <label htmlFor='competenceType'>Competence Type</label>
          <input
            type='text'
            id='competenceType'
            value={competenceType}
            onChange={(e) => setCompetenceType(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <label htmlFor='type'>Type</label>
          <select
            id='type'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value='Intern'>Intern</option>
            <option value='Extern'>Extern</option>
          </select>
        </div>
        <div>
          <div className='bottomForm'>
            <button type='submit' onClick={handleAddFormater}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFormater;
