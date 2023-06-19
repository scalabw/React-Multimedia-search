import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MultimediaSearch, { MultimediaType } from './components/MultimediaSearch'
import './App.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/movies'
            element={<MultimediaSearch multimediaType={MultimediaType.movies} />}
          />
          <Route
            path='/series'
            element={<MultimediaSearch multimediaType={MultimediaType.series} />}
          />
          <Route path='*' element={<Navigate to='/movies' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
