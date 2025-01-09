import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next"; // Para usar a tradução

const ProjectList = () => {
  const { t, i18n } = useTranslation(); // Pega o idioma atual e a função de tradução
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/projects");

        // Ordenar os projetos pela data (mais recente primeiro)
        const sortedProjects = response.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Ordena do mais recente para o mais antigo
        });

        setProjects(sortedProjects); // Define o estado com os dados ordenados
      } catch (error) {
        console.error("Erro ao carregar os projetos:", error);
      }
    };

    fetchProjects();
  }, [i18n.language]); // Recarregar a lista sempre que o idioma mudar

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return "Data inválida"; // Caso a data seja inválida
    }

    // Formatação da data de acordo com o idioma atual
    return parsedDate.toLocaleDateString(i18n.language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box sx={{ my: 8, padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 700, color: "primary.main" }}
      >
        {t("projects")} {/* Traduzir título da página */}
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Paper
              elevation={6}
              sx={{
                padding: 3,
                borderRadius: 3,
                backgroundColor: "background.paper",
                boxShadow: 4,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)", // Efeito hover
                  boxShadow: 8,
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                {i18n.language === "pt" ? project.titlePT : project.titleEN}
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ color: "text.secondary" }}
              >
                {i18n.language === "pt"
                  ? project.descriptionPT
                  : project.descriptionEN}
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 2, color: "text.primary" }}
              >
                <strong>{t("date")}:</strong> {formatDate(project.createdAt)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    padding: "8px 20px",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  {t("viewProject")} {/* Traduzir botão */}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectList;
