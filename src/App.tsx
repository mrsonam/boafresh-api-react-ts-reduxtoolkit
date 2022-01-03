import React from 'react';
import './App.css';
import Header from './components/main-components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/main-components/Home';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
