"use client"

import { useState, useEffect } from "react"
import Mole from "./Mole"
import "./App.css"

function App() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStarted, setGameStarted] = useState(false)
  const [moles, setMoles] = useState(Array(9).fill(false))
  const [gameOver, setGameOver] = useState(false)


  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameStarted(true)
    setGameOver(false)
    setMoles(Array(9).fill(false))
  }


  const whackMole = (index) => {
    if (moles[index] && gameStarted) {
      setScore(score + 1)


      const newMoles = [...moles]
      newMoles[index] = false
      setMoles(newMoles)
    }
  }


  useEffect(() => {
    let timer
    if (gameStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameStarted) {
      setGameStarted(false)
      setGameOver(true)
    }

    return () => clearTimeout(timer)
  }, [timeLeft, gameStarted])


  useEffect(() => {
    let moleTimer

    if (gameStarted) {
      moleTimer = setInterval(() => {
        const newMoles = [...moles]
        // Hide all moles first
        newMoles.fill(false)

        // Make 1-3 random moles appear
        const numMoles = Math.floor(Math.random() * 3) + 1
        for (let i = 0; i < numMoles; i++) {
          const randomIndex = Math.floor(Math.random() * 9)
          newMoles[randomIndex] = true
        }

        setMoles(newMoles)
      }, 1000)
    }

    return () => clearInterval(moleTimer)
  }, [gameStarted, moles])

  return (
    <div className="game-container">
      <h1>Whack-A-Mole</h1>

      <div className="game-info">
        <div className="score">
          Score: <span className="score-value">{score}</span>
        </div>
        <div className="time">
          Time: <span className="time-value">{timeLeft}s</span>
        </div>
      </div>

      {!gameStarted && (
        <div className="game-controls">
          <button onClick={startGame}>{timeLeft === 30 ? "Start Game" : "Play Again"}</button>

          {gameOver && (
            <div className="game-over">
              <h2>Game Over!</h2>
              <p>Your score: {score}</p>
            </div>
          )}
        </div>
      )}

      <div className="mole-grid">
        {moles.map((isVisible, index) => (
          <Mole key={index} isVisible={isVisible} onClick={() => whackMole(index)} />
        ))}
      </div>
    </div>
  )
}

export default App

