"use client"

import { useState, useEffect } from "react"
import "./Mole.css"

function Mole({ isVisible, onClick }) {
  const [whacked, setWhacked] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setWhacked(false)
    }
  }, [isVisible])

  const handleClick = () => {
    if (isVisible && !whacked) {
      setWhacked(true)
      onClick()
    }
  }

  return (
    <div className="mole-hole" onClick={handleClick}>
      {isVisible && (
        <div className={`mole ${isVisible ? "visible" : ""} ${whacked ? "whacked" : ""}`}>
          <div className="mole-face">
            <div className="mole-eyes">
              <div className="mole-eye"></div>
              <div className="mole-eye"></div>
            </div>
            <div className="mole-nose"></div>
            <div className="mole-mouth"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mole

