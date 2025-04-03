import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import service from "../services/config.services";

function Admin() {

  const { userRole } = useContext(AuthContext)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [origen, setOrigen] = useState("")
  const navigate = useNavigate()

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    try {
      await service.post("/resources", {
        title,
        category,
        content,
        author,
        origen
      });
      console.log("Recurso creado")
      navigate("/ResourcePage")
    } catch (error) {
      console.log(error)
    }
  };

  if (userRole !== "admin") {
    return <h1>No tienes permiso para acceder a esta página</h1>;
  }

  return (
    <div>
      <h3>Crear Recurso</h3>
      <form onSubmit={handleCreateSubmit}>
        <div>
          <h3>Título</h3>
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>

        <div>
          <h3>Categoría</h3>
          <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} />
        </div>

        <div>
          <h3>Contenido</h3>
          <textarea value={content} onChange={(event) => setContent(event.target.value)} />
        </div>

        <div>
          <h3>Autor</h3>
          <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>

        <div>
          <h3>Origen</h3>
          <input type="text" value={origen} onChange={(event) => setOrigen(event.target.value)} />
        </div>

        <button type="submit">Crear Recurso</button>
      </form>
    </div>
  );
}

export default Admin;
