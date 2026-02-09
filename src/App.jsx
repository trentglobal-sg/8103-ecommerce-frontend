import React, { useState } from 'react';
import {Switch, Route} from 'wouter';

import ProductCard from './ProductCard';
import Navbar from './Navbar';
import MainPage from './MainPage';
import RegisterPage from './RegisterPage';
import ProductPage from './ProductPage';


export default function App() {

  return (<>
    <Navbar/>

    <Switch>
      <Route path="/" component={MainPage}/>
      <Route path="/products" component={ProductPage}/>
      <Route path="/register" component={RegisterPage}/>
    </Switch>

    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; 2023 E-Shop. All rights reserved.</p>
      </div>
    </footer>

  </>)
}