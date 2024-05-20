import { Route, Routes } from 'react-router-dom'

import Dashboard from '@/routes/Dashboard/Dashboard'
import Login from '@/routes/Login/Login'

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Login />} path='/login'></Route>
      <Route element={<Dashboard />} path='/*'></Route>
    </Routes>
  )
}

export default App
