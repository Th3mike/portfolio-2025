import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

const AddProject = () => {
  const [titlePT, setTitlePT] = useState(""); // Título em PT
  const [titleEN, setTitleEN] = useState(""); // Título em EN
  const [descriptionPT, setDescriptionPT] = useState(""); // Descrição em PT
  const [descriptionEN, setDescriptionEN] = useState(""); // Descrição em EN
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [projects, setProjects] = useState([]); // Estado para armazenar os projetos adicionados

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      titlePT,
      titleEN,
      descriptionPT,
      descriptionEN,
      link,
      createdAt: date,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/projects",
        newProject
      );

      setProjects((prevProjects) => [...prevProjects, response.data]); // Atualiza o estado com o novo projeto
      setTitlePT(""); // Limpa os campos após o envio
      setTitleEN("");
      setDescriptionPT("");
      setDescriptionEN("");
      setLink("");
      setDate("");
    } catch (error) {
      console.error("Erro ao adicionar projeto:", error);
    }
  };

  return (
    <Container sx={{ paddingY: 6 }}>
      <Paper sx={{ padding: 4, maxWidth: 600, margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          Adicionar Novo Projeto
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Campo para título em português */}
            <Grid item xs={12}>
              <TextField
                label="Título em Português"
                variant="outlined"
                fullWidth
                value={titlePT}
                onChange={(e) => setTitlePT(e.target.value)}
                required
              />
            </Grid>

            {/* Campo para título em inglês */}
            <Grid item xs={12}>
              <TextField
                label="Título em Inglês"
                variant="outlined"
                fullWidth
                value={titleEN}
                onChange={(e) => setTitleEN(e.target.value)}
                required
              />
            </Grid>

            {/* Campo para descrição em português */}
            <Grid item xs={12}>
              <TextField
                label="Descrição em Português"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={descriptionPT}
                onChange={(e) => setDescriptionPT(e.target.value)}
                required
              />
            </Grid>

            {/* Campo para descrição em inglês */}
            <Grid item xs={12}>
              <TextField
                label="Descrição em Inglês"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={descriptionEN}
                onChange={(e) => setDescriptionEN(e.target.value)}
                required
              />
            </Grid>

            {/* Campo para o link */}
            <Grid item xs={12}>
              <TextField
                label="Link"
                variant="outlined"
                fullWidth
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                type="url"
              />
            </Grid>

            {/* Campo para a data */}
            <Grid item xs={12}>
              <TextField
                label="Data"
                variant="outlined"
                fullWidth
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Grid>

            {/* Botão para enviar o formulário */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  padding: "10px 30px",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Adicionar Projeto
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Exibindo os projetos adicionados */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Projetos Adicionados:
          </Typography>
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                <Typography variant="body1">{project.titlePT}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProject;
