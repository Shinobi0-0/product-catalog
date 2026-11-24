import { useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAddedItem, setLastAddedItem] = useState("");

  const handleAddToCart = (productTitle) => {
    setCartCount((prevCount) => prevCount + 1);
    setLastAddedItem(productTitle);
  };

  const badgesById = {
    1: <span className="badge badge-new">New</span>,
    2: <span className="badge badge-sale">Sale</span>,
  };

  return (
    <main className="catalog-container">
      <header className="catalog-header">
        <h1>CvSU Mini Store</h1>
        <p className="cart-message">
          {cartCount === 0
            ? "Your cart is empty."
            : `Items added to cart: ${cartCount} (Last added: ${lastAddedItem})`}
        </p>
      </header>

      <section className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
            onAddToCart={handleAddToCart}
          >
            {badgesById[product.id]}
          </ProductCard>
        ))}
      </section>
    </main>
  );
}

export default App;
