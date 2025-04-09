import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import service from "../services/config.services";
import axios from "axios";

function Admin() {

  const { userRole } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [origen, setOrigen] = useState("");
  const [imageUrl, setImageUrl] = useState(null); 
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await axios.post("http://localhost:5005/api/upload", uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    try {
      await service.post("/resources", {
        title,
        category,
        content,
        author,
        origen,
        imageUrl,
      });
      console.log("Recurso creado");
      navigate("/ResourcePage");
    } catch (error) {
      console.log(error);
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

        <div>
          <label>Imagen: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          {isUploading ? <h3>... subiendo imagen</h3> : null}
          {imageUrl ? <div><img src={imageUrl} alt="img" width={200} /></div> : null}
        </div>

        <button type="submit">Crear Recurso</button>
      </form>
    </div>
  );
}

export default Admin;