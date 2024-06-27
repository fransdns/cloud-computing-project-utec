/*import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de tener axios instalado en tu proyecto

//TODO: Debemos usar Websockets para esto. Creo que sería bueno tener conexión bidireccional.

function ChatWindow() {
  const location = useLocation();
  const roomName = new URLSearchParams(location.search).get('room');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const RUTAGET = `http://localhost:443/messages?room=${roomName}`;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(RUTAGET);
        console.log("la data que contiene la respuesta es: ",response);
        if(response.data.messages){
          setMessages(response.data.messages);
          console.log("los mensajes que vienen del servidor son: ", response.data.messages);
        }else{
          console.log("no hay mensajes en la sala");
          setMessages([]);
        }
        //setMessages(response.data.messages || []);
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [RUTAGET]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      // Enviar el nuevo mensaje al backend
      await axios.post("http://localhost:443/messages", {
        room: roomName,
        message: newMessage.trim()
      });
      // Actualizar la lista de mensajes después de enviar el mensaje
      const response = await axios.get(RUTAGET);
      setMessages(response.data.messages || []);
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
      <div>
        <h1>Chat Room: {roomName}</h1>
        {loading ? (
            <p>Cargando mensajes...</p>
        ) : (
            <div className="chat-container">
              <div className="message-list">
                <ul>
                  {messages.map((message, index) => (
                      <li key={index}>{message}</li>
                  ))}
                </ul>
              </div>
              <div className="message-input">
                <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={newMessage}
                    onChange={handleInputChange}
                />
                <button onClick={handleSendMessage}>Enviar</button>
              </div>
            </div>
        )}
      </div>
  );
}

export default ChatWindow;*/
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de tener axios instalado en tu proyecto
import './ChatWindows.css';
function ChatWindow() {
  const location = useLocation();
  const roomName = new URLSearchParams(location.search).get('room');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const RUTAGET = `http://localhost:443/messages?room=${roomName}`;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(RUTAGET);
        console.log("Respuesta completa del servidor:", response);

        if (response.data && response.data.length > 0) {
          setMessages(response.data);
          console.log("Los mensajes que vienen del servidor son:", response.data);
        } else {
          console.log("No hay mensajes en la sala");
          setMessages([]);
        }
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [RUTAGET]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      // Enviar el nuevo mensaje al backend
      await axios.post("http://localhost:443/messages", {
        room: roomName,
        message: newMessage.trim()
      });
      // Actualizar la lista de mensajes después de enviar el mensaje
      const response = await axios.get(RUTAGET);
      if (response.data && response.data.length > 0) {
        setMessages(response.data);
      } else {
        setMessages([]);
      }
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };
  //TODO: 2._Para tener una barra que me permita ver los mensajes anteriores, qué cosa debería de cambiar?
  return (
      <div>
        <h1>Chat Room: {roomName}</h1>
        {loading ? (
            <p>Cargando mensajes...</p>
        ) : (
            <div className="chat-container">
              <div className="message-list">
                <ul>
                  {messages.map((message, index) => (
                      <div id="mensaje" key={index}>{message.message}</div>
                  ))}
                </ul>
              </div>
              <div className="message-input">
                <input
                    id="input-user"
                    type="text"
                    placeholder="  Escribe tu mensaje..."
                    value={newMessage}
                    onChange={handleInputChange}
                />
                <button onClick={handleSendMessage}>Enviar</button>
              </div>
            </div>
        )}
      </div>
  );
}

export default ChatWindow;

