import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainContent from './components/MainContent';

function App() {
 
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainContent />} />
        </Routes>
      </Router>  
    </div>
 
  );
}

export default App;
