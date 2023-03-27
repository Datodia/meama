import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Homepage/Homepage'
import { Errorpage } from './pages/Errorpage/Errorpage'
import { Products } from './pages/Productpage/Products'
import { DataProvider } from './context/DataProvider'

function App() {

  return (

    <DataProvider>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/products/:id/:name' element={<Products />} />
        <Route path='/*' element={<Errorpage />} />
      </Routes>
    </DataProvider>
  )
}

export default App
