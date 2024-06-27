import React, { useState } from 'react';
import axios from 'axios'; // Para hacer peticiones HTTP, asegúrate de instalar axios en tu proyecto

function LandingPage() {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Realizar petición al backend para verificar la existencia de la sala
      //const response = await axios.get(`http://localhost:443/api/verifyRoom?name=${roomName}`);

      window.location.href = `/chat?room=${roomName}`;
      console.log("La sala de chat existe");
    }
      catch (error) {
      console.error('Error al verificar la sala de chat:', error);
      setError('Ocurrió un error al verificar la sala de chat. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
        <h1>Bienvenido a la Sala de Chat</h1>
        <form onSubmit={handleFormSubmit}>
          <label>
            Ingrese el nombre de la sala de chat:
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Entrar a la sala de chat'}
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
  );
}

export default LandingPage;
