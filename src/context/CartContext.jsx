import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'unicrave_cart_v1'

/**
 * Safely loads the cart from localStorage, handling potential parsing errors
 * or corrupted data structures gracefully.
 */
function getInitialCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (Array.isArray(parsed)) {
      // Validate that each item has basic expected properties
      return parsed.filter(
        (item) => item && item.id && typeof item.price === 'number' && typeof item.quantity === 'number' && item.quantity > 0
      )
    }
  } catch (err) {
    console.warn('Failed to load cart from localStorage:', err)
  }
  return []
}

/**
 * CartProvider Component
 * Supplies cart state and actions to the entire application hierarchy.
 */
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart)

  // Sync cart changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (err) {
      console.warn('Failed to save cart to localStorage:', err)
    }
  }, [cartItems])

  /**
   * Add an item to the cart with a specified quantity.
   * If the item is already in the cart, increases its existing quantity.
   */
  const addToCart = (item, quantity = 1) => {
    if (!item || !item.available) return

    const addQty = Math.max(1, Number(quantity) || 1)

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((ci) => String(ci.id) === String(item.id))

      if (existingIndex > -1) {
        // Immutably update the existing item's quantity
        return prevItems.map((ci, idx) =>
          idx === existingIndex ? { ...ci, quantity: ci.quantity + addQty } : ci
        )
      }

      // Add as a new item in the cart
      return [
        ...prevItems,
        {
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: addQty
        }
      ]
    })
  }

  /**
   * Remove an item completely from the cart by its ID.
   */
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => String(item.id) !== String(itemId)))
  }

  /**
   * Increase the quantity of a specific cart item by 1.
   */
  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        String(item.id) === String(itemId) ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  /**
   * Decrease the quantity of a specific cart item by 1.
   * If quantity reaches 0, removes the item.
   */
  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          String(item.id) === String(itemId) ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  /**
   * Clear all items from the shopping cart.
   */
  const clearCart = () => {
    setCartItems([])
  }

  /**
   * Calculate total quantity of items in cart (used for Header badge).
   */
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
  }, [cartItems])

  /**
   * Calculate total monetary cost of items in cart in PKR.
   */
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
  }, [cartItems])

  const contextValue = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart
    }),
    [cartItems, cartCount, cartTotal]
  )

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

/**
 * useCart Hook
 * Safe consumer hook to access CartContext values.
 */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
