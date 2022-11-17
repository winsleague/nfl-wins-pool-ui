import React from 'react';
import {
  HashRouter as Router,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Standings from './Standings';

import './App.css';
import PickQuality from './PickQuality';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Standings />
        <PickQuality />
      </ThemeProvider>
    </Router>
  );
}
