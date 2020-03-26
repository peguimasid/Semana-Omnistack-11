import React, { useState } from 'react';
import { Link , useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [ongId, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { ongId });
      
      localStorage.setItem('ongId', ongId);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Essa conta nāo existe ou a verificaçāo falhou');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faca seu logon</h1>

          <input
            placeholder="Sua ID"
            value={ongId}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to='/register'>
            <FiLogIn  size={16} color="#E02041"/>
            Nāo tenho cadastro
        </Link>
        </form>
      </section>

      <img className="heroImg" src={heroesImg} alt="Heroes"/>
    </div>
  )
}