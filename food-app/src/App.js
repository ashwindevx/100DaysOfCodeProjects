import React, { useState } from "react";
import Header from "./components/Layout/Header.js";
import Meals from "./components/Meals/Meals.js";
import Cart from "./components/Cart/Cart";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const showCartHandler = () => {
    setIsOpen(true);
  };

  const hideCartHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
