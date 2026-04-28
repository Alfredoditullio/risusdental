import { Routes, Route } from 'react-router-dom'
import { Slider } from './components/Slider'
import { GoSmilePage } from './components/pages/GoSmilePage'
import { CandyMeloPage } from './components/pages/CandyMeloPage'
import { OdontolatamPage } from './components/pages/OdontolatamPage'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full h-screen overflow-hidden bg-black">
            <Slider />
          </div>
        }
      />
      <Route path="/proyectos/go-smile"    element={<GoSmilePage />} />
      <Route path="/proyectos/candy-melo"  element={<CandyMeloPage />} />
      <Route path="/proyectos/odontolatam" element={<OdontolatamPage />} />
    </Routes>
  )
}
