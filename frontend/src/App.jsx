import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Home'
import Create from './Create'
import Login from './Login' 
import User from './User'
import CreateArticle from './CreateArticle'
import AllArticle from './AllArticles'


function App() {

  // APP: rien de neuf, on a crée le hub logique du site (BrowserRouter), c'est a dire les route vers les différents componsants qu'on va utiliser

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/create" Component={Create} />
        <Route path="/login" Component={Login} />
        <Route path="/user" Component={User} />
        <Route path="/create/article" Component={CreateArticle} />
        <Route path="/all/articles" Component={AllArticle} />
      </Routes>
    </Router>
    </>
  )
}

export default App
