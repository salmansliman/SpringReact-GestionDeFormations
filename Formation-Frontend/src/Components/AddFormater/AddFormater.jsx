import React, { useState } from 'react';
import './AddFormater.css';

const AddFormater = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Formater');
  const [competenceType, setCompetenceType] = useState('');
  const [type, setType] = useState('Intern');

  const handleAddFormater = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
    console.log('Competence Type:', competenceType);
    console.log('Type:', type);
  };

  return (
    <div className='containerAdd'>
      <h2>Add Formater</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='inputContainerAdd'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='inputContainerAdd'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='inputContainerAdd'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='inputContainerAdd'>
          <label htmlFor='role'>Role</label>
          <select
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value='Formater'>Formater</option>
          </select>
        </div>
        <div className='inputContainerAdd'>
          <label htmlFor='competenceType'>Competence Type</label>
          <input
            type='text'
            id='competenceType'
            value={competenceType}
            onChange={(e) => setCompetenceType(e.target.value)}
          />
        </div>
        <div className='inputContainerAdd'>
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
          <div className='bottomFormAdd'>
            <button className='submitButton' type='submit' onClick={handleAddFormater}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFormater;
