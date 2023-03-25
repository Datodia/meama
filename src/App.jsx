import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Homepage/Homepage'
import { Errorpage } from './pages/Errorpage/Errorpage'
import { Products } from './pages/Productpage/Products'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/products/:id' element={<Products />} />
      <Route path='/*' element={<Errorpage />} />
    </Routes>
  )
}

export default App
