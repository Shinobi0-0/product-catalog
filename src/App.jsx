import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Lab 3 cart state
  const [cartCount, setCartCount] = useState(0);
  const [lastAddedItem, setLastAddedItem] = useState("");

  const handleAddToCart = (productTitle) => {
    setCartCount((prevCount) => prevCount + 1);
    setLastAddedItem(productTitle);
  };

  // Debounce searchText by 300ms with cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Derived filtered and sorted list without mutating original products
  const visibleProducts = [...products]
    .filter((product) => {
      const matchesKeyword = product.title
        .toLowerCase()
        .includes(debouncedSearch.trim().toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesKeyword && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc") {
        return a.price - b.price;
      }
      if (sortOrder === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

  // Update browser tab title when result count changes
  useEffect(() => {
    document.title = `CvSU Mini Store (${visibleProducts.length} results)`;
  }, [visibleProducts.length]);

  const handleClearFilters = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
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

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClearFilters={handleClearFilters}
      />

      <p className="results-count">
        Showing {visibleProducts.length} of {products.length} products
      </p>

      {visibleProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found. Try a different keyword or category.</p>
        </div>
      ) : (
        <section className="product-grid">
          {visibleProducts.map((product) => (
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
      )}
    </main>
  );
}

export default App;
