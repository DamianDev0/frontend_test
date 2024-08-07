// src/Dashboard.js
import React, { useState } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar usuarios
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
  const [error, setError] = useState(''); // Estado para manejar errores

  const getUsers = async () => {
    setLoading(true); // Inicia el estado de carga
    setError(''); // Limpia errores anteriores

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agrega el token en la cabecera
        },
      });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const result = await response.json();
      setUsers(result.data); // Almacena los usuarios en el estado, accediendo a result.data

    } catch (error) {
      setError('Error en la solicitud: ' + error.message); // Manejo de errores
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Estás en el dashboard</p>
      <button onClick={getUsers} disabled={loading}>
        {loading ? 'Cargando...' : 'Obtener todos los usuarios'}
      </button>

      {error && <p>{error}</p>}

      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <h3>{user.email}</h3>
            </div>
          ))
        ) : (
          !loading && <p>No hay usuarios para mostrar</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
