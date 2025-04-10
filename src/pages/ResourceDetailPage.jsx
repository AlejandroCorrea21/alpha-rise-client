import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/auth.context";

function ResourceDetailPage() {

  const { id } = useParams()
  const [resource, setResource] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const navigate = useNavigate()
  const { userRole, loggedUserId, isLoggedIn } = useContext(AuthContext)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (loggedUserId) {
    getResources();
    getComments();
    }
}, [loggedUserId]) //lo monto y pido los recursos y los comentarios.

const getResources = async () => {

  try {
    const response = await service.get(`/resources/${id}`);
    setResource(response.data);
    if (response.data.favorites?.includes(loggedUserId)) {
      setIsFavorite(true);
      }
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

// Botones

// botón borrar recurso (admin)
const handleDelete = async () => {
  try {
    const response = await service.delete(`/resources/${resource._id}`)
    console.log(response)
    navigate("/ResourcePage")
  } catch (error) {
    console.log(error)
  }
}

//boton crear comentario
const handleCommentSubmit = async (event) => {
  event.preventDefault();

  try {
    await service.post(`/comments`, {
      text: newComment,
      resource: id,
    });

  console.log("Comentario creado")
    setNewComment("");
    getComments();
  } catch (error) {
    console.log(error)
  }
};

//botón borrar comentario
const handleCommentDelete = async (commentId) => {
  
  try {
    const response = await service.delete(`/comments/${commentId}`)
    console.log(response)
    getComments();
  } catch (error) {
    console.log(error)
  }
}

//botón añadir favoritos
const toggleFavorite = async () => {
  try {
    if (!isFavorite) {
      await service.post(`/resources/${id}/favorite`);
      setIsFavorite(true);
    } else {
      await service.delete(`/resources/${id}/favorite`);
      setIsFavorite(false);
    }
  } catch (error) {
    console.log("Error con favoritos:", error);
  }
};

if (!resource || comments === null) {   //spinner
  return <div className="spinner"></div>;  
}

const volverAtras = () => {
  navigate("/ResourcePage");
};

return (
  <div>
    <h1>{resource.title}</h1>
    {isLoggedIn && (
    <button onClick={toggleFavorite}>{isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}</button>
   )}

    {resource.imageUrl && (
      <div>
        <img src={resource.imageUrl} alt="img recurso" style={{ maxWidth: "400px", borderRadius: "10px" }} />
      </div>
    )}
    <h3>{resource.content}</h3>

    {userRole === "admin" && (
      <div>
        <button onClick={() => navigate(`/edit-resource/${id}`)}>
          Editar (ADMIN)
          </button>
        <button onClick={handleDelete}>Borrar (ADMIN)</button>
      </div>)}

    <p>Categoria: {resource.category}</p>
    <p>Autor: {resource.author}</p>
    <p>Origen: {resource.origen}</p>

    <h2>Comentarios:</h2>

    {comments === null || comments.length === 0 ? (
      <p>No hay comentarios aún.</p>
    ) : (
      comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.user.username}: {comment.text}</p> 
          
          {(userRole === "admin" || comment.user._id === loggedUserId) && (

        <div>
          <button onClick={() => handleCommentDelete(comment._id)}>Borrar</button>
          <button onClick={() => navigate(`/edit-comment/${comment._id}`)}>Editar</button>
        </div>

      )}
    </div>
  ))
)}
    <button onClick={handleCommentSubmit}>Añadir Comentario</button>
    <input type="text" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
  </div>
);

}

export default ResourceDetailPage