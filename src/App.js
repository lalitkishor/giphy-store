import React, { useCallback, useState } from "react";
import Header from "./Components/Header";
import "./App.css";
import ThemeContext, { themes } from "./themeContext";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));

function App(props) {
  const [theme, setTheme] = useState("dark");
  
  const themeToggle = useCallback(() => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  },[theme]);

  return (
    <Provider store={store}>
      <ThemeContext.Provider
        value={{ theme: themes[theme], themeToggle, type: theme }}
      >
        <Header />
        {props.children}
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
