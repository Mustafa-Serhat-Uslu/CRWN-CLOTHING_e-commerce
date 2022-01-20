import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./components/page/homepage/homepage.component";
import ShopPage from "./components/page/shop/shop.component";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

//without exact the router will add pages end to end (if there is no switch) if a sub regex matches
function App() {
  return (
    <div> 
      <Routes>
        <Route exact path='/' element={<HomePage/>} />
        <Route path='/shop' element={<ShopPage/>} />
      </Routes>
    </div>
  );
}

export default App;
