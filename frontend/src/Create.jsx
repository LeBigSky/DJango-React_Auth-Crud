import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// dans Create => Je vais gerer ma logique "frontend" d'inscription pour un nouveau User
// qu'est ce que la logique frontend pour une inscription ? :
// 1) recupérer les données via des inputs;
// 2) stocker les données saisies dans un objet en usestate;
// 3) envoyer une requète vers mon url inscription qui contient mes données

function Create(params) {
const nav = useNavigate()

// Mon ustestate de l'étape 2
    const [formdata, setFormdata] = useState({
        username: "",
        password : "",
        email: ""
    })

    // Ma focntion qui m epermet de récupérer les données de chque input et les stocker dans mon UseState
    const handlechange = (e) => {
        const {name,value} = e.target
        setFormdata({...formdata, [name]: value})
    }

    // L'envois d'une requête Post sur mon url inscription, avec mes données en objets.
    const inscription = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://127.0.0.1:8000/inscription/', formdata)
        console.log(response.data)
        if (response.data.status === 'success'){
            nav('/login')
        }
        else {
            console.log("Vous devez être connecté pour crée un article")
        }

    }

// Je vérifie que je récupère bien les données correctement avec un console.log
console.log(formdata)
    return(
        
        <><h1>Iscription</h1>
        <form onSubmit={inscription} >
            <label htmlFor="">Username</label>
            <input type="text" name="username" value={formdata.username} onChange={ (e)=>{handlechange(e)}} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={formdata.password} onChange={ (e)=>{handlechange(e)}}/>
            <label htmlFor="email">email</label>
            <input type="email" name="email" value={formdata.email} onChange={ (e)=>{handlechange(e)}}/>
            <button type submit>Inscrire-se de dans la db</button>
        </form>
        
        
        
        
        </>
    )
}

export default Create