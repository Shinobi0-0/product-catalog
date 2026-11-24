function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children,
}) {
  const formattedPrice = `₱${Number(price).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <article
      className={`product-card ${inStock ? "in-stock" : "out-of-stock"}`}
    >
      {children && <div className="badge-slot">{children}</div>}
      <p className="product-category">{category}</p>
      <h2 className="product-title">{title}</h2>
      <p className="product-price">{formattedPrice}</p>
      <p
        className={`stock-status ${inStock ? "stock-available" : "stock-unavailable"}`}
      >
        {inStock ? "In Stock" : "Out of Stock"}
      </p>
      <button
        type="button"
        className="add-to-cart-btn"
        disabled={!inStock}
        onClick={() => onAddToCart(title)}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;
