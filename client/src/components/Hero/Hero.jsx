import React from "react";

const portfolioHandler = () => {
  // alert("my portfolio button clicked");
};

const Hero = ({ onGetStarted }) => {
  // check login status of the user

  const startHandler = () => {
    // alert("get started button clicked");
  };

  const buttons = [
    { text: "My Portfolio", handler: portfolioHandler },
    { text: "Get Started", handler: startHandler },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      {/* Heading Tagline */}
      <section className="flex gap-1 justify-center">
        <span className="font-medium text-teal-400">{"#"}</span>
        <span className="text-white text-[12px] font-medium my-auto">
          Transforming Code into Reality
        </span>
      </section>
      {/* Heading */}
      <div className="flex flex-col gap-3 mt-4 mb-2 text-center">
        <p className="text-white text-5xl font-semibold">
          Coding Visions into Reality
        </p>
        <p className="text-white text-5xl font-semibold">
          {` { `}
          <span className="text-teal-400 italic">Compilecraft</span>
          {` } `}Where Every Line Counts!
        </p>
      </div>
      {/* Info Para */}
      <p className="text-gray-400 text-[15px] font-medium text-center w-[55%] my-4">
        Embrace simplicity without compromising efficiency, as CompileCraft
        Editor empowers you to craft clean and functional code with ease.
      </p>
      <div className="flex gap-6 my-3">
        {buttons.map((item) => (
          <button
            key={item.id}
            onClick={item.handler}
            className="btn text-white font-medium rounded-full border-[1px] border-teal-300 px-6 py-2
            hover:bg-teal-200  hover:border-slate-500 active:border-slate-900 active:bg-teal-500
             hover:text-[#0b0019] hover:-translate-y-1 hover:transition-all hover:ease-in-out"
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
