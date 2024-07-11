import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      window.location.href = `/chat?room=${roomName}`;
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
