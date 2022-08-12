import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  const [darkToggle, setDarkToggle] = React.useState(false);
  const toggleTheme = () => {
    setDarkToggle(!darkToggle);
  };

  return (
    <div
      data-theme={`${darkToggle ? "myDark" : "mytheme"}`}
      className="App bg-base-100 "
    >
      {/* <label class="toggleDarkBtn">
        <input type="checkbox" onClick={() => setDarkToggle(!darkToggle)} />
        <span class="slideBtnTg round"></span>
      </label> */}

      <div className={` mx-auto max-w-screen-xl `}>
        <Navbar toggleTheme={toggleTheme} darkToggle={darkToggle} />
        <Home />
        <Footer />
      </div>
    </div>
  );
}

export default App;
