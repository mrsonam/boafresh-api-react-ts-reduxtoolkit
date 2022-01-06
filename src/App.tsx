import React from 'react';
import './App.css';
import Header from './components/main-components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/main-components/Home';
import Products from './components/main-components/Products';
import ProductsByCategory from './components/main-components/ProductsByCategory';
import SearchedProducts from './components/main-components/SearchedProducts';
import CreateAccount from './components/main-components/CreateAccount';
import Login from './components/main-components/Login';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:searchQuery' element={<SearchedProducts/>}/>
        <Route path='/products/category/:categoryId' element={<ProductsByCategory/>}/>
        <Route path='/signup' element={<CreateAccount/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      
    </Router>
  );
}

export default App;
