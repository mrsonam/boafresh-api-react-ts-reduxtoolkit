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
import Profile from './components/main-components/Profile';
import Product from './components/main-components/Product';
import Page404 from './components/main-components/Page404';
import ForgotPassword from './components/main-components/ForgotPassword';
import ChangePassword from './components/main-components/ChangePassword';
import Cart from './components/main-components/Cart';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/boafresh-api-react-ts-reduxtoolkit' element={<Home/>}/>
        <Route path='/boafresh-api-react-ts-reduxtoolkit/products' element={<Products/>}/>
        <Route path='/boafresh-api-react-ts-reduxtoolkit/product/:productId' element={<Product/>}/>
        <Route path='/boafresh-api-react-ts-reduxtoolkit/products/:searchQuery' element={<SearchedProducts/>}/>
        <Route path='/boafresh-api-react-ts-reduxtoolkit/products/category/:categoryId' element={<ProductsByCategory/>}/>
        <Route path='/boafresh-api-react-ts-reduxtoolkit/signup' element={<CreateAccount/>} />
        <Route path='/boafresh-api-react-ts-reduxtoolkit/login' element={<Login/>} />
        <Route path='/boafresh-api-react-ts-reduxtoolkit/profile' element={<Profile/>} />
        <Route path='/boafresh-api-react-ts-reduxtoolkit/forgotPassword' element={<ForgotPassword/>} />
        <Route path='/boafresh-api-react-ts-reduxtoolkit/changePassword' element={<ChangePassword/>} />
        <Route path='/boafresh-api-react-ts-reduxtoolkit/cart' element={<Cart/>} />
        <Route path="*" element={<Page404/>} />
      </Routes>
      
    </Router>
  );
}

export default App;
