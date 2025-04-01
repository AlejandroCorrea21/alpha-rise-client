import "./App.css";
import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Admin from "./pages/Admin"
import PrivatePage from "./pages/PrivatePage";

// components
import Navbar from "./components/Navbar"
import OnlyPrivate from "./components/OnlyPrivate";

function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private-page" element={<OnlyPrivate><PrivatePage /></OnlyPrivate>} />


      </Routes>
    </div>
  )
}

export default App