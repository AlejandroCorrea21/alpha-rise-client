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
    const response = await service.get(`/resources/${id}/comments`);
    setComments(response.data);
  } catch (error) {
    console.log(error);
  }
};

if (!resource || comments.length === 0) {// cláusula de guardia
    return <div className="spinner"></div>
}

return (

  <div>

    <h1>{resource.title}</h1>
    <p>{resource.content}</p>
    <p>Categoria: {resource.category}</p>
    <p>Autor: {resource.author}</p>

    <h2>Comentarios:</h2>
      {comments.map((comment) => (
        <p key={comment._id}>
          <p>{comment.user}: {comment.text}</p>
        </p>
      ))}
      
  </div>
);
}


  export default ResourceDetailPage