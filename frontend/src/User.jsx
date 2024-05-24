
import { useState, useEffect } from "react"
import axios from "axios"

// Logique de mon coposant user; Je veux afficher des donner du user connecté et permettre de logout également
// Décription de ma logique dans l'ordre:
// 1) Je vais créer un useState pour stocker mes données user
// 2) je vais faire une requêtes 'GET' sur ma route user en envoyant mon token en header
// 3) Je vais afficher mes donné utilisateur: affichage conditonnel => connecté/pas connecté
// 4) Je vais créer une fonction pour me logout, concretement elle post sur une route logout...

function User(params) {
    const [user, setUser] = useState(null)

    useEffect( ()=> {
    try {
        // Etape 2: Je fais un get sur ma route user et j'envois mon token dans mon header:   'Authorization': `Bearer ${token}`
        const token = localStorage.getItem('access_token') // mon token stocké en LocalStorage (depuis mon composant login, j'avais mis le token dans Localstorage) 
        axios.get('http://127.0.0.1:8000/user/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setUser(res.data.user) // Ici je remplis mon user avec les données recup du la route Get
            console.log(res.data); // un ptit check up des données
        })
    }
    catch (error) {
        console.log(error) // si ça marche pas je récupère l'erreur axios et je la console log
    }
        
    }, [])

// Etape 4 ma fonction logout va d'abord vider le local storage de mon token
// Ensuite, je post une requete sur la route logout
// enfin, je set mon user en tant que Null, pour mon affichage conditonnel
    const logout = () => {
        localStorage.removeItem('access_token')
        axios.post('http://127.0.0.1:8000/logout/')
        setUser(null)
    }

    return(

        <><h1>Si vous voyez votre nom ci dessus, c'est que vous êtes connecté</h1>
        {user ? <div>
            <h1>Nom user: {user.username}</h1>
            <h3>L'id du user :{user.id}</h3>
            <button onClick={logout}>Logout</button>
        </div> : <div>"Ya rien lo
            <a href="/login">Se reconnecter</a>
          
        </div> }
        </>
    )
}

export default User