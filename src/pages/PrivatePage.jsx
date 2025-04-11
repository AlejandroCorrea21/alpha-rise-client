import { useEffect, useState, useContext } from 'react';
import service from '../services/config.services';
import { AuthContext } from "../context/auth.context";
import { useNavigate } from 'react-router-dom';

function PrivatePage() {

  const [data, setData] = useState(null);
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.post("/auth/private-page");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <h3>Te has logeado correctamente</h3>
      <p>Vuelve a la página principal</p>

      <form onSubmit={handleSubmit}>

        <div>
          <button type="submit" style={{ margin: "5px", padding: "10px 20px", backgroundColor: "#299039", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>
            Home</button>
        </div>

      </form>
    </div>
  );
}

export default PrivatePage;