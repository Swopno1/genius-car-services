import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home/Home";
import About from "./Pages/About/About";

function App() {
  return (
    <div>
      <h1>MacBook: My Site</h1>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="*" element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}

export default App;
