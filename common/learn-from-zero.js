const LearnFromZero = ({ onComplete }) => {
  return React.createElement(
    "div",
    { className: "bg-indigo-50 border-4 border-indigo-200 rounded-3xl p-6 text-center space-y-4 my-4" },
    React.createElement(
      "h2",
      { className: "text-2xl font-black text-indigo-900" },
      "Learn From Zero 🚀"
    ),
    React.createElement(
      "p",
      { className: "text-indigo-700 font-semibold" },
      "You are starting from the very beginning. Let's build your foundation!"
    ),
    React.createElement(
      "button",
      {
        onClick: onComplete,
        className: "bg-indigo-600 text-white font-black px-6 py-3 rounded-2xl hover:bg-indigo-700 transition-colors shadow-sm",
      },
      "Got it! Start Practice →"
    )
  );
};

window.LearnFromZero = LearnFromZero;
