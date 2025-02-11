import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dropdown from './components/Layout/Dropdown';

function App() {

  return (
    <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={<Dropdown/>} 
                />
            </Routes>
        </Router>
  )
}

export default App;
