import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import Header from "./components/Header"
import CountryPage from './pages/CountryPage'

function App() {

  return (
    <main>
      <Header />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:country" element={<CountryPage />} />
      </Routes>
    </main>
  )
}

export default App
