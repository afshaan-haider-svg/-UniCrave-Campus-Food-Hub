import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import MenuPage from './pages/MenuPage'
import ItemDetailsPage from './pages/ItemDetailsPage'
import CartPage from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'
import { useMenu } from './hooks/useMenu'
import './App.css'

/**
 * App Component
 * Primary application shell composing global CartProvider,
 * sticky Header, routed views (/ , /item/:id , /cart , *), and Footer.
 */
function App() {
  // 1. Single source of truth for menu data fetching
  const { menuItems, loading, error, retry } = useMenu()

  // 2. Centralized favourites state persisting across client routes
  const [favouriteIds, setFavouriteIds] = useState([])
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false)

  // Toggle single item favourite
  const handleToggleFavourite = (id) => {
    setFavouriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    )
  }

  // Toggle Favourites Only view filter
  const handleToggleFavouritesOnly = () => {
    setShowFavouritesOnly((prev) => !prev)
  }

  return (
    <CartProvider>
      <div className="app-root">
        {/* 1. Global Persistent Header with dynamic Cart count and Favourites badge */}
        <Header
          favouritesCount={favouriteIds.length}
          showFavouritesOnly={showFavouritesOnly}
          onToggleFavouritesOnly={handleToggleFavouritesOnly}
        />

        {/* 2. Main Routed View Area */}
        <main id="main-content" className="app-main">
          <Routes>
            {/* Menu Page Route (Hero + Catalog + Filters) */}
            <Route
              path="/"
              element={
                <MenuPage
                  menuItems={menuItems}
                  loading={loading}
                  error={error}
                  retry={retry}
                  favouriteIds={favouriteIds}
                  onToggleFavourite={handleToggleFavourite}
                  showFavouritesOnly={showFavouritesOnly}
                  onToggleFavouritesOnly={handleToggleFavouritesOnly}
                />
              }
            />

            {/* Item Details Route with Quantity and Add-to-Cart */}
            <Route
              path="/item/:id"
              element={
                <ItemDetailsPage
                  menuItems={menuItems}
                  loading={loading}
                  favouriteIds={favouriteIds}
                  onToggleFavourite={handleToggleFavourite}
                />
              }
            />

            {/* Shopping Cart Route */}
            <Route path="/cart" element={<CartPage />} />

            {/* Wildcard 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* 3. Global Persistent Footer */}
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
