import React, { useEffect } from 'react';

import "./styles.css";
import { useState } from "react";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories(){
      const response = await api.get('repositories');
      setRepositories(response.data);
    }
    
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'http://www.github.com.br',
      techs: ["NodeJS", "ReactJS", "React Native", "Javascript"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(
            repository => 
            <li key={repository.id}>{repository.title} 
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
