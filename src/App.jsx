import "./App.css"
import { Routes, Route } from "react-router"
import Homepage from "./pages/Homepage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Admin from "./pages/Admin"
import PrivatePage from "./pages/PrivatePage"
import About from "./pages/About"
import CommentsPage from "./pages/CommentsPage"
import FavoritesPage from "./pages/FavoritesPage"
import PageNotFound from "./pages/PageNotFound"
import ResourceDetailPage from "./pages/ResourceDetailPage"
import ResourcePage from "./pages/ResourcePage"
import EditResource from "./components/EditResource"

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
        <Route path="/Admin" element={<Admin />} />
        <Route path="/About" element={<About />} />
        <Route path="/CommentsPage" element={<CommentsPage />} />
        <Route path="/FavoritesPage" element={<FavoritesPage />} />
        <Route path="/PageNotFound" element={<PageNotFound />} />
        <Route path="/ResourcePage" element={<ResourcePage />} />
        <Route path="/resources/:id" element={<ResourceDetailPage />} />
        <Route path="/edit-resource/:id" element={<EditResource />} />

      </Routes>
    </div>
  )
}

export default App