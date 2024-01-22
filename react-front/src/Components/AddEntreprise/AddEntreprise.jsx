import { useState } from 'react';
import './AddEntreprise.css'; 

const AddEntreprise = () => {

  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');

  const handleAddEntreprise = () => {
    console.log('Nom:', nom);
    console.log('Adresse:', adresse);
    console.log('Téléphone:', telephone);
    console.log('URL:', url);
    console.log('Email:', email);
  };

  return (
    <div className='container'>
      <h2>Add Entreprise</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='inputContainer'>
          <label htmlFor='nom'>Nom</label>
          <input
            type='text'
            id='nom'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <label htmlFor='adresse'>Adresse</label>
          <input
            type='text'
            id='adresse'
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <label htmlFor='telephone'>Téléphone</label>
          <input
            type='tel'
            id='telephone'
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <label htmlFor='url'>URL</label>
          <input
            type='url'
            id='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
        <div>
          <div className='bottomForm'>
            <button type='submit' onClick={handleAddEntreprise}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEntreprise;
