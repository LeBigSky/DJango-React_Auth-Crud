import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// ici je vais détailler ma logique de création d'article. dans l'ordre logique d'une création d'article:
// 1) Je vais d'abord récupérer les données entrée dans les inputs, titre, texte, etc... (ici je le fais différement, un a un dans chaque input pour donner un exemple différent de inscription, le principe est le même)
// 2) Je vais stocker les données dans différents string en usestate (je pourrais aussi faire un seul objet, ça changera juste ma manière de les gérer après en backend..)
// 3) J'ai crée un useState message pour y stcoker un message qui sera affiché en fonction du résultat du submit. L'idée est de prévenir le user si ça marche pas et lui dire pourquoi.
// 4) je fais une vérification pour voir si j'ai bien le token de connexion, sinon je met dans message un message d'erreur concernant l'authentification
const CreateArticle = () => {

const nav = useNavigate()

// Etape 2 je stock en usestate
  const [titre, setTitre] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');


  // Expliqué en etape 4: qui vérifie si le user est connecté, c'est a dire on a les token
  // Si c'est pas le cas, on pourra pas post un article car j'ai mis un prérequis dans mon backend (le user doit être co pour poster)
  // Donc si on est pas co, on as pas les token, donc on renvoit un message qui dit: vous devez être connnecté

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) {
      setMessage('Vous devez être connecté');
      return;
    }
// Ici je vais poster sur ma route create article => j'envois cette fois 3 éléments distinct qui composeront mon article
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/create/article/',
        { titre, text, date },
        {
          // On doit pas oublier ce header essentiel => 'Authorization': `Bearer ${token}`
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // si l'article a été ajouté on affiche un message et on est redirigé
      setMessage('Un nouvel article a été crée');
      nav("/all/articles")

    }
      // si il y a un soucis a cette étape, c'est sans doute une erreur du backend ou il faut déco/reco 
    catch (error) {
      setMessage('Une erreur a eu lieu... Essayer de vous déco/reco si ça marche toujours pas => Go check backend');
    }
  };

  return (
    <div>
      <h2>Create Article</h2>
      
      <form onSubmit={handleCreateArticle}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={titre}
            //Cette fois, j'ai pas fais une fonction, je change directement les valeur des usestate un a un...
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Article</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateArticle;