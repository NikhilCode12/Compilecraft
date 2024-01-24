import "./App.css";
import { NavbarAuth, Hero, Footer } from "./components/index";
function AuthApp() {
  return (
    <div className="bg-gradient-to-t from-[#0b0019] via-[#1d033b] to-[#351b57]">
      {/* Navbar */}
      <NavbarAuth />
      <Hero />
      <Footer
        height={"500px"}
        showLoginForm={false}
        time={1.75}
        ymove={"300px"}
      />
    </div>
  );
}

export default AuthApp;
