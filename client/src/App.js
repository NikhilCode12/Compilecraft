import "./App.css";
import { Navbar, Hero, Footer } from "./components/index";

function App() {
  return (
    <div className="bg-gradient-to-t from-[#0b0019] via-[#1d033b] to-[#402266] h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* Footer */}
    </div>
  );
}

export default App;
