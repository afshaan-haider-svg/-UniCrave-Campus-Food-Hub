/**
 * MenuSearch Component
 * Controlled search input allowing users to filter dishes by name with
 * immediate feedback, case-insensitivity, space trimming, and a clear button.
 */
function MenuSearch({ searchQuery, onSearchChange, onClearSearch }) {
  return (
    <div className="menu-search-wrapper" role="search">
      <div className="search-input-container">
        {/* Search Icon */}
        <span className="search-icon-box" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="currentColor" className="search-svg">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        {/* Controlled Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search campus dishes (e.g. Biryani, Chai, Zinger)..."
          className="menu-search-input"
          aria-label="Search campus menu items"
        />

        {/* Clear Search Button */}
        {searchQuery.trim().length > 0 && (
          <button
            type="button"
            onClick={onClearSearch}
            className="search-clear-btn"
            aria-label="Clear search query"
            title="Clear search"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="clear-svg">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default MenuSearch
