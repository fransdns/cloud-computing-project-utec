import React, { useState } from 'react';
import './landing.css';

const Landing = ({ onFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const validateAndSubmit = async (e) => {
    e.preventDefault();

    // Validación de los campos
    if (name.length < 5 || name.length > 50) {
      setError('El nombre debe tener entre 5 y 50 caracteres.');
      return;
    }
    if (!/^\d{5}$/.test(number)) {
      setError('El número debe tener exactamente 5 dígitos.');
      return;
    }

    // Si la validación es correcta, resetea el mensaje de error
    setError('');

    // Enviar datos al backend
    try {
      const response = await fetch('https://dnspoison.lol/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, number })
      });

      if (response.ok) {
        alert('Datos enviados exitosamente');
        onFormSubmit(); // Llamar a la función pasada como prop para cambiar de vista
      } else {
        alert('Error al enviar los datos');
      }
    } catch (error) {
      alert('Error de red: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Enviar Mensaje</h1>
      <form onSubmit={validateAndSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Número:</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Landing;
