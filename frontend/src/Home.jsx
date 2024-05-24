import React from "react"


function Home(params) {
    
// Le home c'est un peu le hub du site, en gros, juste des liens vers chaque composant...
    return(
        <>
        <h1>Yo le home, choose your way</h1>
        <div><a href="/login">Connexion</a></div>
        <div><a href="/create">Créer un compte</a></div>
        <div> <a href="/all/articles">vers les articles</a></div>
        <div><a href="/create/article">Créer des articles</a></div>
        
        
        

        </>
    )
}

export default Home