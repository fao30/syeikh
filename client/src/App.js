import { Routes, Route } from "react-router-dom";
import RequireAuth from "./Components/requireAuth";

import Login from "./pages/Login";
import Home from "./pages/Home";
import VisitDetail from "./pages/VisitDetail";
import CardExampleGroups from "./pages/MedCard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              {" "}
              <Home />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/visit/:id"
          element={
            <RequireAuth>
              {" "}
              <VisitDetail />{" "}
            </RequireAuth>
          }
        />
        <Route path="/medcard/:id" element={<CardExampleGroups />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
