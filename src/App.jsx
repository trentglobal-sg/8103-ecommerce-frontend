import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import MainPage from './MainPage';
import {Switch, Route} from 'wouter';

export default function App() {

  



  return (<>
    <Navbar/>

    <Switch>
      <Route path="/" component={MainPage}/>
    </Switch>

    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; 2023 E-Shop. All rights reserved.</p>
      </div>
    </footer>

  </>)
}