import axios from '../api/axios';

const EntrepriseService = {
  getAllEntreprises: (token) => {
    return axios.get('/entreprise/all', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  },

  addEntreprise: (token, formData) => {
    const requestBody = {
      nomEntreprise: formData.nomEntreprise,
      adresseEntreprise: formData.adresseEntreprise,
      telEntreprise: formData.telEntreprise,
      url: formData.url,
      emailEntreprise: formData.emailEntreprise,
    };

    return axios.post('/entreprise/newEntreprise', requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    
    ;
  },

  deleteEntreprise: (token, idEntreprise) => {
    return axios.delete('/entreprise/delete', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        idEntreprise: idEntreprise,
      },
    });
  },
};

export default EntrepriseService;