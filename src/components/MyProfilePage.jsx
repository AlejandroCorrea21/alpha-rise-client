import { useEffect, useState } from 'react';
import { AuthContext } from "../context/auth.context";
import service from "../services/config.services";
import { useNavigate } from 'react-router-dom';

function MyProfilePage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await service.get(`/users/profile`);
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);
  
  const handleUserSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedUser = {
        username,
        email
    };
      const response = await service.put(`/users/profile`, updatedUser)
      setUser(response.data);
      console.log("usurio actualizado")
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div>Cargando usuarios</div>;
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>

      <form onSubmit={handleUserSubmit}>
        <div>
          <label>Nombre de Usuario</label>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>

        <div>
          <label>Correo Electrónico</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>

        <div style={{ marginTop: "20px" }}>

          <button type="submit" style={{ margin: "5px", padding: "10px 20px", backgroundColor: "#299039", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>
          Actualizar Perfil</button>

          <button onClick={() => navigate("/")} style={{ margin: "5px", padding: "10px 20px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>
          Volver al inicio</button>

      </div>
    </form>
  </div>
);
}

export default MyProfilePage;