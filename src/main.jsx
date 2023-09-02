import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes/Routes'
import './app.css'
import AuthProvider from './context/AuthContext'
import ProyectosProvider from './context/ProyectosProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProyectosProvider>
        <Routes />
      </ProyectosProvider>
    </AuthProvider>
  </React.StrictMode>,
)
