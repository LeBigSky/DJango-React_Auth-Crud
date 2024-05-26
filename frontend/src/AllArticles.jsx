import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Logique d'affichage d'une serie d'articles ou produits, décrit dans l'ordre logique:
// 1) je crée un usestate au format tableau pour stocker mes objets qui seront récupéré sour forme d'objets (merci Serializer)
// 2) Je vais faire une requete GET sur ma route articles pour recevoir mes données et les stocker
// 3) Je vais boucler sur tous mes produits ou articles (.Map)

function AllArticles() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/all/article/');
        setProducts(response.data); // Je remplis ici mon tableau avec les données récupérer sur la routes get 
      } catch (error) {
        // Si j'ai pas pu récupérer mes donné j'affiche ce message d'erreur
        console.error('Erreur lors de la récupération des produits:', error); 
      }
    };

    fetchProducts(); // Ici j'ai encore travaillé différement des autre composant pour montrer encore une autre manière de faire:
    // Je crée une fonction Fetch dans useEffect et je vais l'appeler simplement
  }, []); 
  // Le tableau vide en deuxième argument indique que cette fonction useEffect ne s'exécutera qu'une seule fois après le premier rendu de mon coposant

  const Delete= async (id) => {
    const token = localStorage.getItem('access_token');

      try {
        await axios.delete(`http://127.0.0.1:8000/delete/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProducts(products.filter(tralala => tralala.id !== id))
      } catch (error) {
        console.log(error)
      }
    }
    
  
  return (
    <div>
      <h1>Liste des Produits</h1>
      <a href="/create/article">Creer une article</a>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.titre}</h2>
            <p>{product.texte}</p>
            <button onClick={()=> Delete(product.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllArticles;
