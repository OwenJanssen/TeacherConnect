import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallBack from "../src/components/ErrorFallBack";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={ErrorFallBack}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
