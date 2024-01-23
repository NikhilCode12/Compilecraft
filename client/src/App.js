import { useState } from "react";
import "./App.css";
import { Navbar, Hero, Footer } from "./components/index";
import LoginForm from "./pages/auth/LoginForm";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="bg-gradient-to-t from-[#0b0019] via-[#1d033b] to-[#351b57]">
      {/* Navbar */}
      <Navbar onLoginClick={handleLogin} />
      {!showLoginForm && <Hero />}
      {!showLoginForm ? (
        <Footer
          height="500px"
          // bottomClass={true}
          showLoginForm={showLoginForm}
          time={2}
          ymove="300px"
        />
      ) : (
        <Footer
          height="80%"
          // bottomClass={false}
          showLoginForm={showLoginForm}
          time={3}
          ymove="300px"
        />
      )}
    </div>
  );
}

export default App;
