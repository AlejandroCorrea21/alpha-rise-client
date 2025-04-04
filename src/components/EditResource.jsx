import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import service from '../services/config.services';

function EditResource() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [origen, setOrigen] = useState("")

  useEffect(() => {
    getResource();
  }, [])//lo monto y pido los recursos y los recursos.

  const getResource = async () => {

    try {
      const response = await service.get(`/resources/${id}`);
      //inicializa los valores de los estados que podemos editar
      setTitle(response.data.title);
      setCategory(response.data.category);
      setContent(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    
    try {
      await service.put(`/resources/${id}`, {
        title,
        category,
        content,
        author
      });
      console.log("Recurso editado");
      navigate(`/resources/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Editar Recurso</h3>
      <form onSubmit={handleEditSubmit}>
        <div>
          <h3>Título</h3>
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>

        <div>
          <h3>Categoría</h3>
          <input type="text" value={category} onChange={(event) => setCategory(event.target.value)}/>
        </div>

        <div>
          <h3>Contenido</h3>
          <input type="text" value={content} onChange={(event) => setContent(event.target.value)}/>
        </div>

        <div>
          <h3>Autor</h3>
          <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)}/>
        </div>

        <div>
          <h3>Origen</h3>
          <input type="text" value={origen} onChange={(event) => setOrigen(event.target.value)}/>
        </div>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditResource;