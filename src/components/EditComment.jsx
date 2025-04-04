import { useState} from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";

function EditComment() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [text, setText] = useState("")

  useEffect(() => {
    getComment();
  }, [])//lo monto y pido los comentarios y los comentarios.

  const getComment = async () => {

    try {
      const response = await service.get(`/comments/${id}`);
      //inicializa los valores de los estados que podemos editar
      setText(response.data.text);
    } catch (error) {
        console.log(error)
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await service.put(`/comments/${id}`, {
        text,
      });
      console.log("Comentario editado")
      const updatedComment = response.data
    navigate(`/resources/${updatedComment.resource}`)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <h3>Editar Comentario</h3>
      <form onSubmit={handleEditSubmit}>
        <div>
          <h3>Comentario</h3>
          <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditComment;