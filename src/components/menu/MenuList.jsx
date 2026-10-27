import ItemCard from './ItemCard'

/**
 * MenuList Component
 * Renders a responsive grid mapping each item in the filtered items array
 * to an ItemCard, passing favourite state and toggle handler down as props.
 */
function MenuList({ items, favouriteIds = [], onToggleFavourite }) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="menu-items-grid" role="region" aria-label="Campus Food Menu Items">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isFavourite={favouriteIds.includes(item.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  )
}

export default MenuList
