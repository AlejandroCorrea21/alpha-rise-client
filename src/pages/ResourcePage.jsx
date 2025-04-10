import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";

function ResourcePage() {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();
  const [filterResources, setFilterResources] = useState("frase");

  // console.log("Filtrando", filterResources);

  useEffect(() => {
    getResources();
  }, [filterResources]); // lo monto y obtiene los recursos.

  const volverAtras = () => {
    navigate("/"); // Va atrás al pulsar con el botón (página / home)
  }
  const getResources = async () => {
    
    try {
      let response;
      if (filterResources) {
        response = await service.get(`/resources?category=${filterResources}`);
      } else {
        response = await service.get("/resources");
      }
      setResources(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Todos los Recursos</h1>

        <h2>Filtrar por Categoría</h2>

          <button style={{ margin: "5px", padding: "10px", backgroundColor: "#299039", color: "white", }} onClick={() => setFilterResources("frase")} >
          Frase</button>

          <button style={{ margin: "5px", padding: "10px", backgroundColor: "#25348a", color: "white", }} onClick={() => setFilterResources("texto bíblico")} >
          Texto</button>

          <button style={{ margin: "5px", padding: "10px", backgroundColor: "#731b2c", color: "white", }} onClick={() => setFilterResources("libro")} >
          Libros</button>

          <button style={{ margin: "5px", padding: "10px", backgroundColor: "#888", color: "white" }} onClick={() => setFilterResources("otro")}>
          Otro</button>

          <button style={{ margin: "5px", padding: "10px", backgroundColor: "#888", color: "white" }} onClick={() => setFilterResources("")}>
          Mostrar Todos</button>

        {resources.map((resource) => (

          <div key={resource._id}>

            <h2>{resource.title}</h2>
            <h3>{resource.category}</h3>
            <Link to={`/resources/${resource._id}`}>
            <button style={{ backgroundColor: "#0373b8", color: "white", padding: "5px 10px", border: "none", cursor: "pointer", }}
            >Ver Recurso</button>
            </Link>
          </div>
        ))}
        
    </div>
  );
}

export default ResourcePage;