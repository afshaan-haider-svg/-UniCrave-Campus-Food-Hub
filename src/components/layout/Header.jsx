import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

/**
 * Header Component
 * Sticky, responsive navigation bar featuring the UniCrave brand,
 * React Router Links for Menu ("/") and Cart ("/cart"), dynamic cart count from CartContext,
 * and active Favourites filter control.
 */
function Header({
  favouritesCount = 0,
  showFavouritesOnly = false,
  onToggleFavouritesOnly = () => {}
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount } = useCart()

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleFavouritesClick = () => {
    closeMobileMenu()

    // If not currently on Menu Page ("/"), navigate to "/" first
    if (location.pathname !== '/') {
      navigate('/')
      if (!showFavouritesOnly) {
        onToggleFavouritesOnly()
      }
      setTimeout(() => {
        const menuSection = document.getElementById('menu')
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Already on Menu Page, toggle favourites filter and scroll
      onToggleFavouritesOnly()
      const menuSection = document.getElementById('menu')
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const isMenuPageActive = location.pathname === '/'
  const isCartPageActive = location.pathname === '/cart'

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand / Logo Area with React Router Link */}
        <Link to="/" className="brand-link" onClick={closeMobileMenu}>
          <div className="brand-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" className="logo-svg">
              <rect width="32" height="32" rx="8" fill="#0D9488" />
              <path
                d="M10 10V18C10 21.3137 12.6863 24 16 24C19.3137 24 22 21.3137 22 18V10"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M7 26H25"
                stroke="#14B8A6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="16" cy="14" r="2" fill="#FFFFFF" />
            </svg>
          </div>
          <div className="brand-headings">
            <span className="brand-title">UniCrave</span>
            <span className="brand-subtitle">Campus Food Hub</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <Link
                to="/"
                className={`nav-item-link ${isMenuPageActive ? 'nav-active' : ''}`}
                aria-current={isMenuPageActive ? 'page' : undefined}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Menu</span>
              </Link>
            </li>

            {/* Favourites Filter Toggle */}
            <li>
              <button
                type="button"
                onClick={handleFavouritesClick}
                className={`nav-action-btn favourites-nav-btn ${showFavouritesOnly ? 'favourites-active' : ''}`}
                title={showFavouritesOnly ? 'Show all menu dishes' : 'Filter by saved favourites'}
                aria-label={`Toggle favourites filter. Currently ${showFavouritesOnly ? 'active' : 'inactive'}, ${favouritesCount} items saved.`}
                aria-pressed={showFavouritesOnly}
              >
                <svg
                  className="action-icon fav-action-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.16-1.104c-1.39-1.385-3.04-3.153-4.14-5.062C3.183 9.07 2.75 7.428 2.75 5.75c0-2.347 1.87-4.25 4.175-4.25 1.48 0 2.82.784 3.575 1.986.756-1.202 2.095-1.986 3.575-1.986 2.306 0 4.175 1.903 4.175 4.25 0 1.678-.433 3.32-1.579 4.986-1.1 1.909-2.75 3.677-4.14 5.062a20.76 20.76 0 01-1.18 1.114l-.018.01-.005.003h-.002a.75.75 0 01-.672 0h-.002z" />
                </svg>
                <span>Favourites</span>
                <span className={`nav-fav-badge ${favouritesCount > 0 ? 'has-favs' : ''}`}>
                  {favouritesCount}
                </span>
              </button>
            </li>

            {/* Cart UI Navigation using React Router Link to /cart */}
            <li>
              <Link
                to="/cart"
                className={`nav-action-btn cart-nav-btn ${isCartPageActive ? 'cart-active' : ''}`}
                title={`View Shopping Cart (${cartCount} items)`}
                aria-label={`Shopping Cart with ${cartCount} items`}
                aria-current={isCartPageActive ? 'page' : undefined}
              >
                <svg
                  className="action-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span>Cart</span>
                <span className={`cart-badge-count ${cartCount > 0 ? 'badge-has-items' : ''}`} aria-label={`${cartCount} items in cart`}>
                  {cartCount}
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg className="toggle-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg className="toggle-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav className="mobile-nav-drawer" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            <li>
              <Link
                to="/"
                className={`mobile-nav-link ${isMenuPageActive ? 'nav-active' : ''}`}
                onClick={closeMobileMenu}
              >
                <svg className="nav-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Browse Menu</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className={`mobile-action-btn ${showFavouritesOnly ? 'mobile-fav-active' : ''}`}
                onClick={handleFavouritesClick}
                aria-pressed={showFavouritesOnly}
                title={showFavouritesOnly ? 'Show all menu dishes' : 'Filter by saved favourites'}
              >
                <div className="mobile-action-label">
                  <svg className="action-icon fav-action-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.16-1.104c-1.39-1.385-3.04-3.153-4.14-5.062C3.183 9.07 2.75 7.428 2.75 5.75c0-2.347 1.87-4.25 4.175-4.25 1.48 0 2.82.784 3.575 1.986.756-1.202 2.095-1.986 3.575-1.986 2.306 0 4.175 1.903 4.175 4.25 0 1.678-.433 3.32-1.579 4.986-1.1 1.909-2.75 3.677-4.14 5.062a20.76 20.76 0 01-1.18 1.114l-.018.01-.005.003h-.002a.75.75 0 01-.672 0h-.002z" />
                  </svg>
                  <span>{showFavouritesOnly ? 'Viewing Favourites' : 'Favourites'}</span>
                </div>
                <span className={`nav-fav-badge ${favouritesCount > 0 ? 'has-favs' : ''}`}>
                  {favouritesCount}
                </span>
              </button>
            </li>
            <li>
              <Link
                to="/cart"
                className={`mobile-action-btn mobile-cart-btn ${isCartPageActive ? 'cart-active' : ''}`}
                onClick={closeMobileMenu}
                title="View Shopping Cart"
              >
                <div className="mobile-action-label">
                  <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <span>Shopping Cart</span>
                </div>
                <span className={`cart-badge-count ${cartCount > 0 ? 'badge-has-items' : ''}`} aria-label={`${cartCount} items in cart`}>
                  {cartCount}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
