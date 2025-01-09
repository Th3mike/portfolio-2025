import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Alert } from "@mui/material";
import axios from "axios";

const DeleteProject = () => {
  const { id } = useParams(); // Pega o ID do projeto da URL
  const navigate = useNavigate(); // Para navegar de volta à página principal

  const handleDelete = () => {
    // Realiza a requisição de exclusão para a API
    axios
      .delete(`http://localhost:4000/projects/${id}`)
      .then((response) => {
        console.log(`Projeto ${id} excluído`);
        navigate("/"); // Redireciona para a página principal ou lista de projetos após exclusão
      })
      .catch((error) => {
        console.error("Erro ao excluir o projeto:", error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tem certeza que deseja excluir o projeto {id}?
      </Typography>
      <Alert severity="warning" style={{ marginBottom: "20px" }}>
        Esta ação não pode ser desfeita.
      </Alert>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Excluir Projeto
      </Button>
      <Button variant="outlined" color="primary" onClick={() => navigate("/")}>
        Cancelar
      </Button>
    </Container>
  );
};

export default DeleteProject;
