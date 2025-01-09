// src/pages/EditProject.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import axios from "axios";

const EditProject = () => {
  const { id } = useParams(); // Recupera o ID do projeto da URL
  const [project, setProject] = useState({
    titlePT: "",
    titleEN: "",
    descriptionPT: "",
    descriptionEN: "",
    link: "",
    createdAt: "",
  }); // Campos do projeto
  const navigate = useNavigate(); // Para navegação

  // Carrega os dados do projeto ao acessar a página
  useEffect(() => {
    axios
      .get(`http://localhost:4000/projects/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar o projeto:", error);
      });
  }, [id]);

  // Atualiza o projeto
  const handleUpdate = () => {
    // Caso a data seja modificada, garanta o formato correto
    const formattedProject = {
      ...project,
      createdAt: new Date(project.createdAt).toISOString().split("T")[0], // Formato: YYYY-MM-DD
    };

    axios
      .put(`http://localhost:4000/projects/${id}`, formattedProject)
      .then((response) => {
        navigate("/"); // Redireciona para a lista de projetos após a atualização
      })
      .catch((error) => {
        console.error("Erro ao atualizar o projeto:", error);
      });
  };

  // Deleta o projeto
  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/projects/${id}`)
      .then(() => {
        navigate("/"); // Redireciona para a lista de projetos após a exclusão
      })
      .catch((error) => {
        console.error("Erro ao excluir o projeto:", error);
      });
  };

  // Atualiza os dados do projeto conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Editar Projeto
      </Typography>

      <TextField
        label="Título em Português"
        name="titlePT"
        value={project.titlePT}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Título em Inglês"
        name="titleEN"
        value={project.titleEN}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descrição em Português"
        name="descriptionPT"
        value={project.descriptionPT}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Descrição em Inglês"
        name="descriptionEN"
        value={project.descriptionEN}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Link"
        name="link"
        value={project.link}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="url"
      />
      <TextField
        label="Data de Criação"
        name="createdAt"
        value={project.createdAt}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="date"
      />

      <Box sx={{ marginTop: 2 }}>
        <Button
          onClick={handleUpdate}
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
        >
          Atualizar Projeto
        </Button>
        <Button onClick={handleDelete} variant="contained" color="secondary">
          Deletar Projeto
        </Button>
      </Box>
    </Container>
  );
};

export default EditProject;
