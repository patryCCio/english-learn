import { Outlet, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import MainPage from "./components/MainPage"
import New from "./components/new/New"
import Error from "./components/Error"
import "./assets/styles/main.css";
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Login from "./components/auth/Login"
import Catalogs from "./components/catalogs/Catalogs"
import SingleCatalog from "./components/catalogs/SingleCatalog"
import Teach from "./components/teach/Teach"
import SingleCatalogEdit from "./components/catalogs/SingleCatalogEdit"
import TeachTest from "./components/teach/TeachTest"

const Layout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const App = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          {currentUser !== null && <Route path="/catalogs" element={<Catalogs />} />}
          {currentUser !== null && <Route path="/teach" element={<Teach />} />}
          {currentUser !== null && <Route path="/teach/test" element={<TeachTest />} />}
          {currentUser !== null && <Route path="/catalogs/:id" element={<SingleCatalog />} />}
          {currentUser !== null && <Route path="/catalogs/edit/:id" element={<SingleCatalogEdit />} />}
          {currentUser !== null && <Route path="/add" element={<New />} />}
          {currentUser === null && <Route path="/login" element={<Login />} />}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
