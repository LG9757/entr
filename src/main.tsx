import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import './App.css'
import Course from './pages/course'
import Module1 from './pages/module1'
import Module2 from './pages/module2'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App page="home" />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/module-1" element={<Module1 />} />
        <Route path="/course/module-2" element={<Module2 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
