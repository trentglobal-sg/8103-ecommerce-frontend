
import {Switch, Route} from 'wouter';

import Navbar from './Navbar';
import MainPage from './MainPage';
import RegisterPage from './RegisterPage';
import ProductPage from './ProductPage';
import FlashMessage from './FlashMessage';
import ShoppingCart from './ShoppingCart';

import "./App.css";

export default function App() {

  return (<>
    <FlashMessage/>
    <Navbar/>

    <Switch>
      <Route path="/" component={MainPage}/>
      <Route path="/products" component={ProductPage}/>
      <Route path="/register" component={RegisterPage}/>
      <Route path="/cart" component={ShoppingCart} />
    </Switch>

    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; 2023 E-Shop. All rights reserved.</p>
      </div>
    </footer>

  </>)
}