import "./App.css";
import { Outlet } from "react-router-dom";
import { Footer } from "./Component/Common/Footer.jsx";
import { Navbar } from "./Component/Common/Navbar.jsx";

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
