import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/config.services";
import Error500 from "../components/Error500";

function ResourcePage() {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();
  const [filterResources, setFilterResources] = useState("frase");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getResources();
  }, [filterResources]);

  const volverAtras = () => {
    navigate("/");
  };

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
      setHasError(true);
    }
  };

  if (hasError) {
    return <Error500 />;
  }

  return (
    <div>
      <h1>Todos los Recursos</h1>

      <h2>Filtrar por Categoría</h2>

      <button style={{ margin: "5px", padding: "10px", backgroundColor: "#299039", color: "white" }} onClick={() => setFilterResources("frase")}>
        Frase</button>

      <button style={{ margin: "5px", padding: "10px", backgroundColor: "#25348a", color: "white" }} onClick={() => setFilterResources("texto bíblico")}>
        Texto</button>

      <button style={{ margin: "5px", padding: "10px", backgroundColor: "#731b2c", color: "white" }} onClick={() => setFilterResources("libro")}>
        Libros</button>

      <button style={{ margin: "5px", padding: "10px", backgroundColor: "#cd33ff", color: "white" }} onClick={() => setFilterResources("otro")}>
        Otro</button>

      <button style={{ margin: "5px", padding: "10px", backgroundColor: "#ff5733", color: "white" }} onClick={() => setFilterResources("")}>
        Mostrar Todos</button>

      <div className="resource-container">

        {resources.map((resource) => (
          <div className="resource-card" key={resource._id}>
            <div>
              <h2>{resource.title}</h2>
              <h3>{resource.category}</h3>
              <Link to={`/resources/${resource._id}`}>
                <button className="btn-see">Ver Recurso</button>
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ResourcePage;