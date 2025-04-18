import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"


document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root")

  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } else {
    console.error('Root element not found! Make sure there is a div with id="root" in your HTML.')
  }
})

