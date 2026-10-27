import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

/**
 * ItemCard Component
 * Displays an individual food item with photo, category, featured badge,
 * interactive favourite heart toggle, PKR pricing, canteen stock status,
 * "View Details" button, and direct "Add to Cart" button with instant feedback.
 */
function ItemCard({ item, isFavourite = false, onToggleFavourite = () => {} }) {
  const [showAdded, setShowAdded] = useState(false)
  const { addToCart } = useCart()

  // Graceful fallback if image fails to load or path is broken
  const handleImageError = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = '/images/fallback-food.svg'
  }

  const {
    id,
    name,
    category,
    price,
    description,
    image,
    available,
    featured
  } = item

  const handleFavouriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleFavourite(id)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!available) return

    addToCart(item, 1)
    setShowAdded(true)

    // Reset button feedback state after 1.5s
    setTimeout(() => {
      setShowAdded(false)
    }, 1500)
  }

  return (
    <article className={`menu-item-card ${!available ? 'card-unavailable' : ''}`}>
      {/* Food Image & Overlay Container */}
      <div className="card-media-wrapper">
        <img
          src={image}
          alt={name}
          className="card-image"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Floating Badges & Action Overlay */}
        <div className="card-badges-overlay">
          <span className="card-category-badge">{category}</span>

          <div className="card-top-actions">
            {featured && (
              <span className="card-featured-badge" title="Chef's Campus Special">
                ★ Featured
              </span>
            )}

            {/* Accessible Favourite Heart Button */}
            <button
              type="button"
              onClick={handleFavouriteClick}
              className={`card-fav-btn ${isFavourite ? 'is-favourite' : ''}`}
              aria-label={isFavourite ? `Remove ${name} from favourites` : `Save ${name} to favourites`}
              aria-pressed={isFavourite}
              title={isFavourite ? 'Remove from favourites' : 'Save to favourites'}
            >
              <svg
                viewBox="0 0 24 24"
                className="fav-heart-icon"
                fill={isFavourite ? '#F43F5E' : 'rgba(7, 19, 36, 0.45)'}
                stroke={isFavourite ? '#F43F5E' : '#FFFFFF'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-content-body">
        <div className="card-header-row">
          <h3 className="card-food-name">{name}</h3>
        </div>

        <p className="card-food-description">{description}</p>

        {/* Card Footer: Price, Availability, and Action Buttons */}
        <div className="card-footer-block">
          <div className="card-footer-meta">
            <div className="card-price-group">
              <span className="currency-label">PKR</span>
              <span className="price-amount">{price}</span>
            </div>

            <div className="card-status-indicator">
              {available ? (
                <span className="availability-tag in-stock">
                  <span className="status-circle green-circle" aria-hidden="true"></span>
                  Available
                </span>
              ) : (
                <span className="availability-tag out-of-stock">
                  <span className="status-circle red-circle" aria-hidden="true"></span>
                  Sold Out
                </span>
              )}
            </div>
          </div>

          {/* Action Row: View Details and Quick Add to Cart */}
          <div className="card-actions-grid">
            <Link
              to={`/item/${id}`}
              className="view-details-btn"
              aria-label={`View details for ${name}`}
            >
              <span>Details</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="view-details-arrow" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!available}
              className={`quick-add-btn ${showAdded ? 'btn-added' : ''}`}
              aria-label={available ? `Add ${name} to cart` : `${name} is sold out`}
              title={available ? 'Add 1 to cart' : 'Sold out'}
            >
              {showAdded ? (
                <>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="btn-icon-check" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Added!</span>
                </>
              ) : available ? (
                <>
                  <span className="plus-sign" aria-hidden="true">+</span>
                  <span>Add</span>
                </>
              ) : (
                <span>Sold Out</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ItemCard
