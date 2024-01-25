import { useState } from "react";
import "./App.css";
import { Navbar, Hero, Footer } from "./components/index";
function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = () => {
    setShowLoginForm(!showRegisterForm);
  };

  const handleRegister = () => {
    setShowRegisterForm(!showLoginForm);
  };

  return (
    <div className="bg-gradient-to-t from-[#0b0019] via-[#1d033b] to-[#351b57]">
      {/* Navbar */}
      <Navbar onLoginClick={handleLogin} onRegisterClick={handleRegister} />
      {showLoginForm || showRegisterForm ? (
        <Footer
          height={"850px"}
          showLoginForm={showLoginForm}
          showRegisterForm={showRegisterForm}
          time={1.25}
          ymove={"40%"}
        />
      ) : (
        <>
          <Hero />
          <Footer
            height={"500px"}
            showLoginForm={showLoginForm}
            showRegisterForm={showRegisterForm}
            time={1.25}
            ymove={"200px"}
          />
        </>
      )}
    </div>
  );
}

export default App;
