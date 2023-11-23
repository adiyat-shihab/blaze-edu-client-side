import "./App.css";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Component/Common/Navbar.jsx";
import { Footer } from "./Component/Common/Footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
