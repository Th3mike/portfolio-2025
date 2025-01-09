import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme";
import { useTranslation } from "react-i18next";
import Header from "./components/Header"; // Importando o Header
import LandingPage from "./pages/LandingPage";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import DeleteProject from "./pages/DeleteProject";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { i18n } = useTranslation();

  // Carrega as preferências do localStorage ao iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language");

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }

    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage); // Muda o idioma com base no localStorage
    }
  }, [i18n]);

  // Alterna o tema e salva a preferência no localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme); // Salva a preferência de tema no localStorage
  };

  // Muda o idioma e salva a preferência no localStorage
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      localStorage.setItem("language", lng); // Salva a preferência de idioma no localStorage após a troca
    });
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Header
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          changeLanguage={changeLanguage}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Verifica se está no modo de desenvolvimento */}
          {process.env.REACT_APP_ENV === "development" && (
            <>
              <Route path="/add-project" element={<AddProject />} />
              <Route path="/edit-project/:id" element={<EditProject />} />
              <Route path="/delete-project/:id" element={<DeleteProject />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
