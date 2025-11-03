import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Header from './Components/Header.jsx'
import BoardModule from './Components/BoardModule.jsx'

const App = () => {

  const [difficulty, setDifficulty] = useState("easy");

  return (
    <>
    <Header setDifficulty={setDifficulty}/>
    <BoardModule difficulty={difficulty}/>
    </>
  )
}

export default App
