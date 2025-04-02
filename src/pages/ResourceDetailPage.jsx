import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ResourceDetailPage() {

  const { id } = useParams();
  const [resource, setResource] = useState(null)
  const [comments, setComments] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    getResources();
    getComments();
}, []) //lo monto y pido los recursos y los comentarios.

const getResources = async () => {

  try {
    const response = await service.get(`/resources/${id}`);
    setResource(response.data);
  } catch (error) {
    console.log(error);
  }
};

// llamo a las rutas

const getComments = async () => {
  try {
    const response = await service.get(`/comments/resources/${id}`);
    setComments(response.data);
  } catch (error) {
    console.log(error);
  }
};

if (!resource || comments === null) {  
  return <div className="spinner"></div>;  
}


const volverAtras = () => {
  navigate("/ResourcePage");
};

return (
  <div>
    <h1>{resource.title}</h1>
    <p>{resource.content}</p>
    <p>Categoria: {resource.category}</p>
    <p>Autor: {resource.author}</p>

    <button style={{position: "absolute", top: "20px", left: "20px", fontSize: "18px", padding: "10px 20px", backgroundColor: "#f2a90d"}}
      onClick={volverAtras}>Atrás
    </button>

    <h2>Comentarios:</h2>

    {comments === null || comments.length === 0 ? (
      <p>No hay comentarios aún.</p>
    ) : (
      comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.user.username}: {comment.text}</p>
        </div>
      ))
    )}
  </div>
);

}


  export default ResourceDetailPage