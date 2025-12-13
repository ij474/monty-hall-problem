import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'

/**
 * Entry Point: Main
 * This is where the React application starts.
 * It finds the HTML element with id 'root' (in index.html)
 * and renders our main <App /> component inside it.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
