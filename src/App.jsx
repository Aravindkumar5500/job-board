import { } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import JobList from './page/JobList'
import JobDetail from './page/JobDetails'
import './App.css'

function App() {
  

  return (
    <>
   <BrowserRouter>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/JobDetail/:id" element={<JobDetail />} />
        </Routes>
    </BrowserRouter>
   
      
    </>
  )
}

export default App
