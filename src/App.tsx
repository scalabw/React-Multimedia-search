import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
          {/* this part will handle the movie and serie details  
          <Route path='/movies/:movieId' element={<MultimediaSearchResults />} />
          <Route path='/series/:serieId' element={<MultimediaSearchResults />} />
          */}
          <Route path='*' element={null} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
