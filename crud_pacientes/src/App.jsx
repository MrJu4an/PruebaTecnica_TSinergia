import { Route, Routes } from "react-router-dom";
import { routes } from "./Components/Utils/routes";
import Home from "./Routes/Home";
import Create from "./Routes/Create";
import Edit from "./Routes/Edit";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path={routes.index} element={<Home />} />
          <Route path={routes.create} element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path={routes.notFound} element={<h1>Error 404 Not Found</h1>} />
        </Routes>
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </>
  )
}

export default App
