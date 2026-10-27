import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

/**
 * Cart Component
 * Reusable shopping cart list displaying items, unit prices, responsive quantity controls,
 * individual subtotals, grand total calculations, and empty cart states.
 */
function Cart() {
  const {
    cartItems,
    cartTotal,
    cartCount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart()

  const handleImageError = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = '/images/fallback-food.svg'
  }

  // 1. Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state-card" role="status">
        <div className="empty-cart-icon-circle" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="empty-cart-svg">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h2 className="empty-cart-heading">Your cart is empty</h2>
        <p className="empty-cart-message">
          Your cart is empty. Explore today's campus menu!
        </p>
        <Link to="/" className="browse-menu-action-btn">
          Browse Campus Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-container-layout">
      {/* Top Header Row with Clear Cart */}
      <div className="cart-list-header">
        <div className="cart-header-title-group">
          <h2 className="cart-list-heading">Your Campus Tray</h2>
          <span className="cart-items-counter-badge">
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="clear-cart-text-btn"
          title="Clear all items from your cart"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="trash-icon" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="cart-columns-grid">
        {/* Left Column: Cart Items List */}
        <div className="cart-items-column">
          <ul className="cart-items-list" aria-label="Cart Items">
            {cartItems.map((item) => {
              const itemSubtotal = item.price * item.quantity

              return (
                <li key={item.id} className="cart-item-row">
                  {/* Thumbnail Image */}
                  <div className="cart-item-thumb-box">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-thumb"
                      onError={handleImageError}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.category}</span>
                    <Link to={`/item/${item.id}`} className="cart-item-name-link">
                      {item.name}
                    </Link>
                    <span className="cart-item-unit-price">
                      PKR {item.price} each
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="cart-quantity-control">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="cart-stepper-btn"
                      aria-label={`Decrease quantity of ${item.name}`}
                      title="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span className="cart-stepper-qty" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="cart-stepper-btn"
                      aria-label={`Increase quantity of ${item.name}`}
                      title="Increase quantity"
                    >
                      &#43;
                    </button>
                  </div>

                  {/* Item Subtotal & Remove */}
                  <div className="cart-item-subtotal-group">
                    <div className="cart-subtotal-val">
                      PKR {itemSubtotal}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="cart-remove-item-btn"
                      aria-label={`Remove ${item.name} from cart`}
                      title="Remove from cart"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="cart-summary-column">
          <div className="order-summary-card">
            <h3 className="summary-card-title">Order Summary</h3>

            <div className="summary-lines-group">
              <div className="summary-line">
                <span className="line-label">Items Subtotal ({cartCount})</span>
                <span className="line-val">PKR {cartTotal}</span>
              </div>
              <div className="summary-line">
                <span className="line-label">Canteen Pickup Fee</span>
                <span className="line-val free-val">Free</span>
              </div>
              <div className="summary-line">
                <span className="line-label">Student Campus Discount</span>
                <span className="line-val free-val">Applied</span>
              </div>
            </div>

            <div className="summary-total-divider" aria-hidden="true"></div>

            <div className="summary-total-row">
              <span className="total-label">Grand Total:</span>
              <span className="total-amount">PKR {cartTotal}</span>
            </div>

            <div className="canteen-pickup-notice">
              <span className="notice-icon" aria-hidden="true">⚡</span>
              <span>Ready for pickup in ~10 minutes at Central Canteen Counter.</span>
            </div>

            {/* Note: In accordance with university instructions, no actual payment gateway is processed */}
            <div className="cart-checkout-actions">
              <button
                type="button"
                className="checkout-demo-btn"
                onClick={() => alert(`Order placed successfully for PKR ${cartTotal}! Your pickup code is #UC-${Math.floor(100 + Math.random() * 900)}.`)}
              >
                Proceed to Canteen Pickup &rarr;
              </button>

              <Link to="/" className="continue-shopping-link">
                &larr; Add more items from menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
