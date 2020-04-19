import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
//import logo from './logo.svg';

import Header from './components/Header'
import Home from './pages/Home'
import Products from './pages/Products';
import Footer from './components/Footer';
import SpeedDialTool from './components/SpeedDial';
import SnackBar from './components/SnackBar';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Product from './pages/Product';
import LoginRegister from './pages/LoginRegister';
import PrivateRoute from './pages/PrivateRoute';
import ContextProvider from './Context/Context';
import Favorites from './pages/Favorites';



function App() {
  return (
    <ContextProvider >
      <Router>
        <div className="App">
          <Header />
          <SpeedDialTool />
          <Switch>
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/login" component={LoginRegister} />
            <PrivateRoute exact path="/account" component={Account} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
            <Route exact path="/products/:id" component={Products} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/" component={Home} />
          </Switch>
          <SnackBar />
          <Footer />
        </div>
      </Router>
    </ContextProvider>

  );
}

export default App;
