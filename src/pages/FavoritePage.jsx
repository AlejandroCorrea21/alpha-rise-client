import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import { AuthContext } from "../context/auth.context";

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getFavoriteResources();
  }, []);

  const getFavoriteResources = async () => {
    try {
      const response = await service.get("/resources/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.log("Error al obtener favoritos:", error);
    }
  }

  if (!isLoggedIn) {
    return <p>Debes iniciar sesión para ver tus favoritos.</p>;
  }

  return (
    <div>
      <h1>Recursos Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes recursos en favoritos.</p>
      ) : (
        <ul>
          {favorites.map((resource) => (
            <li key={resource._id}>
              <h3>{resource.title}</h3>
              <p>{resource.category}</p>
              <button onClick={() => navigate(`/resources/${resource._id}`)} style={{ margin: "5px", padding: "10px 20px", backgroundColor: "#2980b9", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>
                Ver Detalles</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritePage;