import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";


function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null)
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    
    e.preventDefault();
    // ... contactar al backend para registrar al usuario aqui
    try {
      
      await service.post(`/auth/signup`, {
        username: username,
        email:email,
        password: password
      })

      navigate("/login")

    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        console.log(error.response.status)
        console.log(error.response.data.errorMessage)
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // aqui hacemos navigate a /error
      }
    }
  };

  return (
    <div>

      <h1>Página de Registro</h1>
    
      <form onSubmit={handleSignup}>

        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit" style={{ margin: "5px", padding: "10px 20px", backgroundColor: "#298b43", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Registrar</button>

        {errorMessage !== null ? <p>{errorMessage}</p> : null}

      </form>
      
    </div>
  );
}

export default Signup;