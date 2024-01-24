import { useState } from "react";
import "./App.css";
import { Navbar, Hero, Footer } from "./components/index";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="bg-gradient-to-t from-[#0b0019] via-[#1d033b] to-[#351b57]">
      {/* Navbar */}
      <Navbar onLoginClick={handleLogin} />
      {showLoginForm ? (
        <Footer
          height={"850px"}
          showLoginForm={showLoginForm}
          time={1.75}
          ymove={"80%"}
        />
      ) : (
        <>
          <Hero />
          <Footer
            height={"500px"}
            showLoginForm={showLoginForm}
            time={1.75}
            ymove={"300px"}
          />
        </>
      )}
    </div>
  );
}

export default App;
