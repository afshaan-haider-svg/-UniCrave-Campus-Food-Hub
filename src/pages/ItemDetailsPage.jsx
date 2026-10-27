import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

/**
 * ItemDetailsPage Component
 * Displays comprehensive details for a single selected campus dish including
 * full-bleed image, tags, pricing, interactive quantity selector,
 * working "Add to Cart" integration with CartContext, and confirmation feedback.
 */
function ItemDetailsPage({
  menuItems = [],
  loading = false,
  favouriteIds = [],
  onToggleFavourite = () => {}
}) {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  const { addToCart } = useCart()

  // Find target dish from loaded menuItems
  const item = menuItems.find((food) => String(food.id) === String(id))

  const handleImageError = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = '/images/fallback-food.svg'
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = () => {
    if (!item || !item.available) return

    addToCart(item, quantity)
    setShowAddedFeedback(true)

    // Reset feedback after 1.8 seconds
    setTimeout(() => {
      setShowAddedFeedback(false)
    }, 1800)
  }

  // 1. Loading State
  if (loading) {
    return (
      <div className="details-state-wrapper">
        <div className="menu-state-box loading-state" role="status" aria-live="polite">
          <div className="spinner-indicator" aria-hidden="true"></div>
          <p className="state-title">Loading dish details...</p>
          <p className="state-subtitle">Fetching nutrition and canteen counter information</p>
        </div>
      </div>
    )
  }

  // 2. Item Not Found State (Invalid ID)
  if (!item) {
    return (
      <div className="details-state-wrapper">
        <div className="menu-state-box not-found-item-box" role="alert">
          <div className="not-found-icon" aria-hidden="true">🍽️</div>
          <h2 className="state-title">Dish Not Found</h2>
          <p className="state-subtitle">
            We couldn't locate any menu item matching ID &ldquo;{id}&rdquo;.
            It may have been removed or the link is incorrect.
          </p>
          <Link to="/" className="back-to-menu-btn">
            &larr; Return to Campus Menu
          </Link>
        </div>
      </div>
    )
  }

  const isFavourite = favouriteIds.includes(item.id)

  return (
    <div className="item-details-container">
      {/* Breadcrumb / Top Return Bar */}
      <div className="details-breadcrumb-bar">
        <Link to="/" className="breadcrumb-back-link">
          <svg viewBox="0 0 20 20" fill="currentColor" className="breadcrumb-arrow" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          <span>Back to Campus Menu</span>
        </Link>
        <span className="breadcrumb-category-tag">{item.category}</span>
      </div>

      {/* Main Two-Column Card */}
      <div className="item-details-card">
        {/* Left Column: Visual Artwork & Badges */}
        <div className="details-visual-column">
          <div className="details-image-frame">
            <img
              src={item.image}
              alt={item.name}
              className="details-large-image"
              onError={handleImageError}
            />

            {/* Overlaid Badges */}
            <div className="details-overlay-badges">
              <span className="details-category-pill">{item.category}</span>
              {item.featured && (
                <span className="details-featured-pill">★ Chef Special</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Information, Pricing, & Action */}
        <div className="details-info-column">
          <div className="details-header-row">
            <div>
              <span className="canteen-location-label">Campus Canteen Fresh Prep</span>
              <h1 className="details-dish-title">{item.name}</h1>
            </div>

            {/* Favourites Toggle Button on Details Page */}
            <button
              type="button"
              onClick={() => onToggleFavourite(item.id)}
              className={`details-fav-btn ${isFavourite ? 'is-favourite' : ''}`}
              aria-label={isFavourite ? `Remove ${item.name} from favourites` : `Save ${item.name} to favourites`}
              aria-pressed={isFavourite}
              title={isFavourite ? 'Remove from favourites' : 'Save to favourites'}
            >
              <svg
                viewBox="0 0 24 24"
                className="details-fav-icon"
                fill={isFavourite ? '#F43F5E' : 'transparent'}
                stroke={isFavourite ? '#F43F5E' : 'currentColor'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Pricing & Stock Status */}
          <div className="details-price-stock-row">
            <div className="details-price-badge">
              <span className="price-currency">PKR</span>
              <span className="price-val">{item.price}</span>
            </div>

            <div className="details-stock-status">
              {item.available ? (
                <span className="availability-tag in-stock">
                  <span className="status-circle green-circle" aria-hidden="true"></span>
                  Freshly Available Today
                </span>
              ) : (
                <span className="availability-tag out-of-stock">
                  <span className="status-circle red-circle" aria-hidden="true"></span>
                  Sold Out for Today
                </span>
              )}
            </div>
          </div>

          {/* Full Description */}
          <div className="details-description-box">
            <h3 className="section-label">Description</h3>
            <p className="description-text">{item.description}</p>
          </div>

          {/* Campus Pickup Specs */}
          <div className="details-specs-grid">
            <div className="spec-card">
              <span className="spec-icon" aria-hidden="true">⚡</span>
              <div className="spec-meta">
                <span className="spec-title">Pickup Time</span>
                <span className="spec-value">Approx. 10 mins</span>
              </div>
            </div>

            <div className="spec-card">
              <span className="spec-icon" aria-hidden="true">📍</span>
              <div className="spec-meta">
                <span className="spec-title">Hub Counters</span>
                <span className="spec-value">Central &amp; Library Pod</span>
              </div>
            </div>
          </div>

          {/* Interactive Quantity Selector */}
          <div className="quantity-control-section">
            <label htmlFor="dish-quantity" className="quantity-label">
              Order Quantity:
            </label>
            <div className="quantity-stepper">
              <button
                type="button"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1 || !item.available}
                className="stepper-btn decrease-btn"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span id="dish-quantity" className="stepper-value" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncreaseQuantity}
                disabled={!item.available}
                className="stepper-btn increase-btn"
                aria-label="Increase quantity"
              >
                &#43;
              </button>
            </div>
            <span className="quantity-subtotal">
              Subtotal: <strong>PKR {item.price * quantity}</strong>
            </span>
          </div>

          {/* Order Actions: Functional Add to Cart with Feedback */}
          <div className="details-actions-group">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!item.available}
              className={`add-to-cart-action-btn ${showAddedFeedback ? 'added-success' : ''}`}
              title={item.available ? `Add ${quantity} to cart` : 'Item currently sold out'}
            >
              {showAddedFeedback ? (
                <>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="cart-btn-icon" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Added {quantity} to Cart!</span>
                </>
              ) : item.available ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cart-btn-icon" aria-hidden="true">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <span>Add {quantity} to Campus Cart &bull; PKR {item.price * quantity}</span>
                </>
              ) : (
                <span>Item Sold Out</span>
              )}
            </button>

            <div className="details-secondary-links-row">
              <Link to="/cart" className="view-cart-link">
                View Shopping Cart &rarr;
              </Link>
              <Link to="/" className="return-menu-link">
                &larr; Back to Campus Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailsPage
