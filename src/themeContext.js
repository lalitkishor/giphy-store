import React from 'react';
export const themes = {
  dark: {
    backgroundColor: 'black',
    color: 'white',
  },
  light: {
    backgroundColor: 'white',
    color: 'black',
  },
};

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;
