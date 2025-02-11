import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Layout/Navigation';

function App() {

  return (
    <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={<Navigation/>} 
                />
            </Routes>
        </Router>
  )
}

export default App;
