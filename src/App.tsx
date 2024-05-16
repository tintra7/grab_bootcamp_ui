import { Routes, Route } from 'react-router-dom'

import Login from '@/routes/Login/Login'
import Dashboard from '@/routes/Dashboard/Dashboard'

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Login />} path='/login'></Route>
      <Route element={<Dashboard />} path='/*'></Route>
    </Routes>
  )
}

export default App
