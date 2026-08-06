import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Geopolitics from './pages/Geopolitics'
import Compare from './pages/Compare'
import InternalAffairs from './pages/InternalAffairs'
import Market from './pages/Market'
import Funds from './pages/Funds'
import Recommendations from './pages/Recommendations'
import Simulation from './pages/Simulation'
import Chatbot from './pages/Chatbot'
import AdminSources from './pages/admin/AdminSources'
import AdminUpload from './pages/admin/AdminUpload'
import AdminUsers from './pages/admin/AdminUsers'
import NotFound from './pages/NotFound'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (!token) return <Navigate to="/login" replace />
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><Navigate to="/dashboard" replace /></PrivateRoute>} />
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/geopolitics" element={<Geopolitics />} />
              <Route path="/geopolitics/compare" element={<Compare />} />
              <Route path="/internal-affairs" element={<InternalAffairs />} />
              <Route path="/market" element={<Market />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/simulation" element={<Simulation />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/admin/sources" element={<AdminRoute><AdminSources /></AdminRoute>} />
              <Route path="/admin/upload" element={<AdminRoute><AdminUpload /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
