import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import './App.css'
import ModuleRouteGuard from './components/ModuleRouteGuard'
import Course from './pages/course'
import Module1 from './pages/module1'
import Module2 from './pages/module2'
import Module3 from './pages/module3'
import Module4 from './pages/module4'
import Module5 from './pages/module5'
import Module6 from './pages/module6'
import PremiumCurriculum from './pages/premium-curriculum'
import PremiumOverview from './pages/premium-overview'
import PremiumPayment from './pages/premium-payment'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App page="home" />} />
        <Route path="/course" element={<Course />} />
        <Route path="/premium-course" element={<PremiumOverview />} />
        <Route path="/premium-course/payment" element={<PremiumPayment />} />
        <Route path="/premium-course/curriculum" element={<PremiumCurriculum />} />
        <Route path="/course/module-1" element={<Module1 />} />
        <Route
          path="/course/module-2"
          element={
            <ModuleRouteGuard moduleNumber={2}>
              <Module2 />
            </ModuleRouteGuard>
          }
        />
        <Route
          path="/course/module-3"
          element={
            <ModuleRouteGuard moduleNumber={3}>
              <Module3 />
            </ModuleRouteGuard>
          }
        />
        <Route
          path="/course/module-4"
          element={
            <ModuleRouteGuard moduleNumber={4}>
              <Module4 />
            </ModuleRouteGuard>
          }
        />
        <Route
          path="/course/module-5"
          element={
            <ModuleRouteGuard moduleNumber={5}>
              <Module5 />
            </ModuleRouteGuard>
          }
        />
        <Route
          path="/course/module-6"
          element={
            <ModuleRouteGuard moduleNumber={6}>
              <Module6 />
            </ModuleRouteGuard>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
