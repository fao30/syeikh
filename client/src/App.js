import { Routes, Route } from "react-router-dom";
import RequireAuth from "./Components/requireAuth";


import Login from "./pages/Login";
import Home from "./pages/Home";


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
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
