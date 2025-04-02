import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";

function ResourcePage() {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getResources();
  }, []); // lo monto y obtiene los recursos.

  const volverAtras = () => {
    navigate("/"); // Va atrás al pulsar con el botón (página / home)
  }
  const getResources = async () => {
    try {
      const response = await service.get("/resources"); // hago petición al back 
      setResources(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Todos los Recursos</h1>
      <button style={{ position: "absolute", top: "20px", left: "20px", fontSize: "18px", padding: "10px 20px", backgroundColor: "#892be9", }} onClick={volverAtras}
            >Atrás</button>

        {resources.map((resource) => (

          <div key={resource._id}>

            <h2>{resource.title}</h2>
            <h3>{resource.category}</h3>
            <Link to={`/resources/${resource._id}`}>Ver detalles</Link>

          </div>
        ))}
        
    </div>
  );
}

export default ResourcePage;