import React, { useState, useEffect } from "react";
import ProjectList from "../components/ProjectList"; // Importando o ProjectList
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  LinearProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next"; // Importa o hook useTranslation
import { styled } from "@mui/system";

// Estilizando o Typography
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 500,
  lineHeight: 1.5,
  marginBottom: theme.spacing(3),
}));

const LandingPage = () => {
  const { t } = useTranslation(); // Usa o hook useTranslation para acessar as traduções

  // Função para renderizar as barras de progresso com porcentagem
  const renderProgressBar = (value, label) => (
    <Box sx={{ width: "100%", marginBottom: 2 }}>
      <Typography variant="body1">{label}</Typography>
      <Box sx={{ position: "relative" }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 12, // Aumentando a altura da barra para 12px
            borderRadius: 5,
            backgroundColor: "", // Para um fundo mais visível
          }}
        />
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            color: "white",
            fontSize: "0.9rem", // Ajustando o tamanho da fonte para melhor visibilidade
          }}
        >
          {value}%
        </Typography>
      </Box>
    </Box>
  );

  // Barra especial "Sempre Buscando Mais"
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => (oldProgress === 100 ? 0 : oldProgress + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Pegando a lista de ferramentas diretamente do arquivo de tradução
  const tools = t("aboutMe.skills.toolsList", { returnObjects: true })
    .map((tool) => ({
      ...tool,
      proficiency: parseInt(tool.proficiency),
    }))
    .sort((a, b) => a.proficiency - b.proficiency); // Ordenando pela porcentagem

  return (
    <Container sx={{ paddingY: 8 }}>
      {/* Seção de Introdução */}
      <Box sx={{ textAlign: "center", marginBottom: 6 }}>
        <StyledTypography variant="h3" gutterBottom>
          {t("helloImMarcio")}
        </StyledTypography>
        <StyledTypography variant="h6" paragraph>
          {t("fullStackDeveloper")}
        </StyledTypography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#9c27b0", // Cor roxa das barras de progresso
            "&:hover": {
              backgroundColor: "#7b1fa2", // Cor roxa mais escura ao passar o mouse
            },
          }}
          href="/path-to-cv.pdf"
          download
        >
          {t("downloadCV")}
        </Button>
      </Box>

      {/* Seção "Sobre mim" */}
      <Box sx={{ my: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <StyledTypography variant="h5" gutterBottom>
              {t("aboutMe.intro")}
            </StyledTypography>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTypography variant="h5" gutterBottom>
              {t("aboutMe.skills.devTools")}
            </StyledTypography>

            {/* Exibindo as ferramentas com progresso dentro de uma lista */}
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {tools.map((tool, index) => (
                <li key={index}>
                  {renderProgressBar(tool.proficiency, tool.name)}
                </li>
              ))}

              {/* Barra especial "Sempre Buscando Mais" */}
              <li>
                <Typography variant="body1">
                  {t("alwaysSeekingMore")}
                </Typography>
                <Box sx={{ position: "relative" }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 12,
                      borderRadius: 5,
                      backgroundColor: "rgba(0, 0, 0, 0.1)", // Fundo comum com as outras barras
                      "& .MuiLinearProgress-bar": {
                        background: "", // Cor roxa padrão
                        boxShadow: "0px 0px 8px 2px rgba(156, 39, 176, 0.6)", // Efeito de brilho suave
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "0.9rem", // Ajustando o tamanho da fonte para a barra especial
                    }}
                  >
                    {progress}%
                  </Typography>
                </Box>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Box>

      {/* Seção de Projetos */}
      <ProjectList />
    </Container>
  );
};

export default LandingPage;
