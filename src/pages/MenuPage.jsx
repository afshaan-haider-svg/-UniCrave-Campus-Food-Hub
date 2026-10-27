import { useState } from 'react'
import Hero from '../components/layout/Hero'
import MenuList from '../components/menu/MenuList'
import MenuSearch from '../components/menu/MenuSearch'
import CategoryFilter from '../components/menu/CategoryFilter'

const CATEGORIES = [
  'All Items',
  'Breakfast',
  'Desi Meals',
  'Fast Food',
  'Snacks',
  'Beverages'
]

/**
 * MenuPage Component
 * Main landing and dining catalog view composing the Hero banner,
 * interactive multi-filter toolbar, state boxes, and the responsive menu grid.
 */
function MenuPage({
  menuItems = [],
  loading = false,
  error = null,
  retry = () => {},
  favouriteIds = [],
  onToggleFavourite = () => {},
  showFavouritesOnly = false,
  onToggleFavouritesOnly = () => {}
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Items')

  // Reset all filters (Search, Category, and Favourites) back to defaults
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Items')
    if (showFavouritesOnly) {
      onToggleFavouritesOnly()
    }
  }

  // Multi-criteria filter derivation
  const filteredItems = menuItems.filter((item) => {
    // 1. Category Filter
    if (selectedCategory !== 'All Items' && item.category !== selectedCategory) {
      return false
    }

    // 2. Favourites Filter
    if (showFavouritesOnly && !favouriteIds.includes(item.id)) {
      return false
    }

    // 3. Search Query Filter (Case-insensitive, whitespace-trimmed)
    const trimmedQuery = searchQuery.trim().toLowerCase()
    if (trimmedQuery.length > 0) {
      const itemName = item.name.toLowerCase()
      if (!itemName.includes(trimmedQuery)) {
        return false
      }
    }

    return true
  })

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'All Items' ||
    showFavouritesOnly

  return (
    <>
      {/* Hero Section (Visible only on Menu Page) */}
      <Hero />

      {/* Dynamic Campus Food Menu Section */}
      <section id="menu" className="menu-section" aria-labelledby="menu-main-heading">
        <div className="menu-container">
          {/* Section Header */}
          <div className="menu-header-block">
            <span className="section-pill">Fresh From Canteen Hubs</span>
            <h2 id="menu-main-heading" className="section-heading">
              Today's Campus Menu
            </h2>
            <p className="section-subheading">
              Freshly prepared meals, quick canteen picks, and study fuel cooked daily
              across university dining points.
            </p>
          </div>

          {/* Filtering Toolbar Card (Rendered once data is loaded) */}
          {!loading && !error && menuItems.length > 0 && (
            <div className="menu-toolbar-card">
              {/* Search Row */}
              <div className="toolbar-search-row">
                <MenuSearch
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />

                {/* Favourites Quick Toggle Button */}
                <button
                  type="button"
                  onClick={onToggleFavouritesOnly}
                  className={`toolbar-fav-toggle-btn ${showFavouritesOnly ? 'active' : ''}`}
                  aria-pressed={showFavouritesOnly}
                  title={showFavouritesOnly ? 'Show all menu dishes' : 'Filter by saved favourites'}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="toolbar-fav-icon" aria-hidden="true">
                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.16-1.104c-1.39-1.385-3.04-3.153-4.14-5.062C3.183 9.07 2.75 7.428 2.75 5.75c0-2.347 1.87-4.25 4.175-4.25 1.48 0 2.82.784 3.575 1.986.756-1.202 2.095-1.986 3.575-1.986 2.306 0 4.175 1.903 4.175 4.25 0 1.678-.433 3.32-1.579 4.986-1.1 1.909-2.75 3.677-4.14 5.062a20.76 20.76 0 01-1.18 1.114l-.018.01-.005.003h-.002a.75.75 0 01-.672 0h-.002z" />
                  </svg>
                  <span>Favourites Only</span>
                  <span className="toolbar-fav-badge">{favouriteIds.length}</span>
                </button>
              </div>

              {/* Categories Row */}
              <div className="toolbar-category-row">
                <CategoryFilter
                  categories={CATEGORIES}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>

              {/* Active Filter Indicators & Result Count */}
              <div className="toolbar-status-bar">
                <div className="results-count-text">
                  Showing <strong>{filteredItems.length}</strong> of {menuItems.length} dishes
                </div>

                {hasActiveFilters && (
                  <div className="active-filters-chips">
                    {showFavouritesOnly && (
                      <span className="active-chip">
                        Favourites Only
                        <button
                          type="button"
                          onClick={onToggleFavouritesOnly}
                          aria-label="Remove favourites filter"
                          className="chip-remove-btn"
                        >
                          &times;
                        </button>
                      </span>
                    )}

                    {selectedCategory !== 'All Items' && (
                      <span className="active-chip">
                        {selectedCategory}
                        <button
                          type="button"
                          onClick={() => setSelectedCategory('All Items')}
                          aria-label={`Remove ${selectedCategory} filter`}
                          className="chip-remove-btn"
                        >
                          &times;
                        </button>
                      </span>
                    )}

                    {searchQuery.trim().length > 0 && (
                      <span className="active-chip">
                        &ldquo;{searchQuery.trim()}&rdquo;
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          aria-label="Remove search filter"
                          className="chip-remove-btn"
                        >
                          &times;
                        </button>
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="reset-all-link-btn"
                      title="Reset all search, category, and favourites filters"
                    >
                      Reset All
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* State 1: Loading State */}
          {loading && (
            <div className="menu-state-box loading-state" role="status" aria-live="polite">
              <div className="spinner-indicator" aria-hidden="true"></div>
              <p className="state-title">Preparing today's menu...</p>
              <p className="state-subtitle">Connecting to university canteen feeds</p>
            </div>
          )}

          {/* State 2: Error State with Working Retry Button */}
          {!loading && error && (
            <div className="menu-state-box error-state" role="alert">
              <div className="error-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <p className="state-title">Unable to load the campus menu.</p>
              <p className="state-subtitle">{error}</p>
              <button
                type="button"
                onClick={retry}
                className="retry-btn"
                aria-label="Retry loading campus menu"
              >
                <svg className="retry-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Retry Menu Load</span>
              </button>
            </div>
          )}

          {/* State 3: Empty Menu on Server */}
          {!loading && !error && menuItems.length === 0 && (
            <div className="menu-state-box empty-state">
              <div className="empty-icon-box" aria-hidden="true">🍽️</div>
              <p className="state-title">No menu items available today.</p>
              <p className="state-subtitle">Please check back in a few minutes or visit the canteen counter.</p>
            </div>
          )}

          {/* State 4: Filter Empty State (When no items match search / category / favourites) */}
          {!loading && !error && menuItems.length > 0 && filteredItems.length === 0 && (
            <div className="menu-state-box filter-empty-state" role="status">
              <div className="filter-empty-icon" aria-hidden="true">
                {showFavouritesOnly && favouriteIds.length === 0 ? '❤️' : '🔍'}
              </div>
              <p className="state-title">
                {showFavouritesOnly && favouriteIds.length === 0
                  ? 'No Favourites Saved Yet'
                  : 'No Matching Campus Dishes'}
              </p>
              <p className="state-subtitle">
                {showFavouritesOnly && favouriteIds.length === 0
                  ? 'Tap the heart icon on any canteen dish to save it here for fast ordering between lectures.'
                  : searchQuery.trim().length > 0 && selectedCategory !== 'All Items'
                  ? `No items found matching "${searchQuery.trim()}" in ${selectedCategory}.`
                  : searchQuery.trim().length > 0
                  ? `We couldn't find any dish matching "${searchQuery.trim()}". Try checking for typos or searching a broader term.`
                  : 'No dishes match your selected filter criteria.'}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="reset-filters-btn"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* State 5: Loaded & Filtered Menu Grid */}
          {!loading && !error && filteredItems.length > 0 && (
            <MenuList
              items={filteredItems}
              favouriteIds={favouriteIds}
              onToggleFavourite={onToggleFavourite}
            />
          )}
        </div>
      </section>
    </>
  )
}

export default MenuPage
