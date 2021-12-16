import React, { useState } from "react";
import "./App.css";
import ThemeContext, { themes } from "./themeContext";

function App(props) {
  const [theme, setTheme] = useState("dark");

  const themeToggle = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };
  return (
      <ThemeContext.Provider
        value={{ theme: themes[theme], themeToggle, type: theme }}
      >
        {props.children}
      </ThemeContext.Provider>
  );
}

export default App;