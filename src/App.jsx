import "./App.css"
import { Routes, Route } from "react-router"
import Homepage from "./pages/Homepage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Admin from "./pages/Admin"
import About from "./pages/About"
import CommentsPage from "./pages/CommentsPage"
import FavoritesPage from "./pages/FavoritesPage"
import PageNotFound from "./pages/PageNotFound"
import ResourceDetailPage from "./pages/ResourceDetailPage"
import ResourcePage from "./pages/ResourcePage"
import EditResource from "./components/EditResource"
import EditComment from "./components/EditComment"
import MyProfilePage from "./components/MyProfilePage"
import Navbar from "./components/Navbar"
import OnlyPrivate from "./components/OnlyPrivate"
import OnlyAdmin from "./components/OnlyAdmin"
import Error500 from './components/Error500'
import FavoritePage from "./pages/FavoritePage"

function App() {

  return (
    <div>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/About" element={<About />} />
        <Route path="/CommentsPage" element={<CommentsPage />} />
        <Route path="/FavoritesPage" element={<FavoritesPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/ResourcePage" element={<ResourcePage />} />
        <Route path="/resources/:id" element={<ResourceDetailPage />} />
        <Route path="/edit-resource/:id" element={<EditResource />} />
        <Route path="/edit-comment/:id" element={<EditComment />} />
        <Route path="/profile" element={<OnlyPrivate><MyProfilePage /></OnlyPrivate>} />
        <Route path="/admin" element={<OnlyAdmin><Admin /></OnlyAdmin>} />
        <Route path="/500" element={<Error500 />} />
        <Route path="/favorites" element={<FavoritePage />} />


      </Routes>
    </div>
  )
}

export default App