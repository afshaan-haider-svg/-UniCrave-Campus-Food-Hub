/**
 * CategoryFilter Component
 * Accessible category pill navigation allowing students to switch between
 * All Items, Breakfast, Desi Meals, Fast Food, Snacks, and Beverages.
 * Supports smooth horizontal scrolling on mobile devices without layout overflow.
 */
function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <nav className="category-filter-nav" aria-label="Menu categories">
      <div className="category-scroll-container">
        {categories.map((category) => {
          const isActive = selectedCategory === category

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`category-pill-btn ${isActive ? 'category-active' : ''}`}
              aria-pressed={isActive}
              aria-label={`Filter by ${category}`}
            >
              <span className="category-name">{category}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default CategoryFilter
