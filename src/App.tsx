import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin1579ak918309ezd7" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
