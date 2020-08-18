const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
  
}); 

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id }  = request.params;
  const {title, url, techs} = request.body;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex === -1){
    return response.status(400).json({error: 'Repository Not Found'});
  }

  const oldProject = repositories[projectIndex];
  
  const updateProject = {
    ...oldProject,
    title,
    url,
    techs,
  }
  
  repositories[projectIndex] = updateProject;

  return response.json(updateProject);


    
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex === -1){
    return response.status(400).json({error: 'Repository Not Found'});
  }


  repositories.splice(projectIndex, 1);

  return response.status(204).json();
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const projectIndex = repositories.findeIndex(project => project.id === id);

  if(projectIndex === -1){
    return response.status(400).json({error: 'Repository Not Found'});
  }

  const oldProject = repositories[projectIndex];

  const updateProject = {
    ...oldProject,
    likes: oldProject.likes + 1,
  }

  repositories[projectIndex] = updateProject;

  return response.json(updateProject);



});

module.exports = app;
