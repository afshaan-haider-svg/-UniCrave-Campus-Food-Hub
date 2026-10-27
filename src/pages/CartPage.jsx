import Cart from '../components/cart/Cart'

/**
 * CartPage Component
 * Dedicated shopping cart page that renders the reusable Cart component
 * with real-time totals, quantity controls, and order summary.
 */
function CartPage() {
  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-header-block">
        <span className="section-pill">Your Campus Order</span>
        <h1 className="cart-page-main-heading">Shopping Cart</h1>
        <p className="cart-page-subheading">
          Review your selected meals, adjust quantities, and pick up fresh at your campus dining hub.
        </p>
      </div>

      <Cart />
    </div>
  )
}

export default CartPage
