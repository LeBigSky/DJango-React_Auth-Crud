import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


// Logique frontend du login:
// Idem que pour la création d'un user avec la différence que l'on va récupérer des informations: "Token" pour légitimer l'authentification
// 1) Je vais récupérer les données entrés des les inputs par user qui se connecte
// 2) Je vais stocker les données de connexion: username et mdp
// 3) Je vais poster une requetes sur ma route de connexion avec mon objet contenant les données du user: username & mdp 
// 4) Dans la même fonction ou je post ma requetes de connexion, je récupère une donnée du serveur, c'est le token que je stock en LocalStorage (en bref, les cookies du navigateur)

function Login(params) {

    // Ici le usestate expliqué a l'étape 2 pour stocker mes données user
    const [formdata, setFormdata] = useState({
        username: "",
        password : ""
    })

const nav = useNavigate() // fonction built in de React router pour rediriger vers une autre page...

// Ma fonction décrite a l'étape 1 pour récupérer les données des inputs a chaque changement détécté dans la valeur de l'input
const handlechange = (e) => {
    const {name,value} = e.target
    setFormdata({...formdata, [name]: value})
}


// Ma fonction qui va faire la requetes sur la route connexion en envoyant les données de connexion, 
// La réponse (du serveur) pour ma requete, contiens un token que je stock dans le local storage 
// si je suis connecté Je redirige vers une page ou j'afficherais les données user
const login = async (e) => {
    e.preventDefault()
    const response = await axios.post('http://127.0.0.1:8000/connexion/', formdata)
    const accessToken = response.data.access_token
    localStorage.setItem('access_token', accessToken)
    if (response.data.status === 'success'){
        nav('/user')
    }
    else {
        console.log("Problème de connexion")
    }
}

    return (

        <>
        <h1>Login</h1>
        <form onSubmit={login}>
            <label htmlFor="">Username</label>
            <input type="text" name="username" value={formdata.username} onChange={ (e)=>{handlechange(e)}} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={formdata.password} onChange={ (e)=>{handlechange(e)}}/>
            <button type submit>Se connecter</button>
        </form>
        </>
    )
}

export default Login