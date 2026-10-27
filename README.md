# UniCrave — Campus Food Hub 🍔🎓

> **Course:** CS-301 / SE-312 Web Engineering & Modern Web Technologies  
> **Assignment:** University Campus Food Hub & Shared Shopping Cart System  
> **Student Developer:** Frontend Engineering Student  
> **Live Development Environment:** React 19 + Vite 8 + React Router 7 + Context API  
> **Approved Design Theme:** Navy (`#0B1E38`) / Dark Teal (`#0D9488`) / Pure Slate (`#F8FAFC`)

---

## 1. Project Overview

**UniCrave** is a phone-friendly, responsive Single Page Application (SPA) custom-designed for university campus dining. University students often face crowded canteen counters between back-to-back lectures. UniCrave allows students to:
1. Browse daily canteen items loaded dynamically from a local JSON catalog.
2. Filter dishes by category (*Breakfast*, *Desi Meals*, *Fast Food*, *Snacks*, *Beverages*).
3. Search instantly by dish name with immediate results and clear functionality.
4. Save favorite meals using an interactive heart toggle that persists across page views.
5. Inspect individual dish specifications (pickup time, chef specials, availability, description).
6. Manage an active campus food tray using a shared global Cart powered by React's Context API.
7. Experience seamless client-side page routing (`/`, `/item/:id`, `/cart`, `*`) without full-page reloads.

---

## 2. University Assignment Objectives

The project strictly fulfills all core requirements established for the university web engineering semester assignment:
- **Phone-Friendly & Accessible:** Clean, touch-friendly UI optimized for viewports ranging from 375px mobile screens up to 1440px desktop displays with zero horizontal overflow.
- **Dynamic JSON-Powered Catalog:** Food items are loaded dynamically via `fetch` from `public/menu.json` instead of being hardcoded into JSX templates.
- **Real-Time Header Synchronization:** The cart count badge in the persistent sticky header accurately displays the total number of items across all screens and route changes.
- **Shared State Architecture:** Cart state is centralized in a React Context Provider and backed by `localStorage` for robust data preservation during browser reloads.
- **Client-Side Routing:** Multi-page navigation utilizes React Router with dynamic parameters (`:id`) and fallback route handling (`*`).

---

## 3. Technology Stack

- **Library / Core:** [React 19](https://react.dev/) (`react`, `react-dom`)
- **Build Tool & Dev Server:** [Vite 8](https://vitejs.dev/) with Fast Refresh (`@vitejs/plugin-react`)
- **Routing:** [React Router 7](https://reactrouter.com/) (`react-router-dom`)
- **State Management:** React Context API (`createContext`, `useContext`, `useState`, `useMemo`)
- **Persistence:** Browser `localStorage` API with defensive validation
- **Styling:** Modular Pure CSS (`index.css`, `App.css`) utilizing CSS Grid, Flexbox, CSS Custom Properties, and responsive media queries
- **Typography:** Google Fonts (`Plus Jakarta Sans` & `Outfit`)
- **Code Quality / Linter:** [Oxlint](https://oxc.rs/)

---

## 4. Key Application Features

### 🌟 4.1. Dynamic Campus Food Menu
- Loaded asynchronously from `/menu.json` using custom hook `useMenu`.
- 15 realistic university canteen dishes spanning 5 food categories.
- Real Pakistani Rupee (PKR) pricing, dietary descriptions, and local vector illustrations.
- Graceful handling of network latency (spinner) and fetch errors (retry button).

### 🔍 4.2. Search & Category Filtering
- **Controlled Search Input:** Case-insensitive, whitespace-trimmed text search updating in real-time.
- **Category Filter Pills:** Switch between *All Items*, *Breakfast*, *Desi Meals*, *Fast Food*, *Snacks*, and *Beverages*.
- **Active Filter Chips & Reset All:** Displays active filters with single-click dismissal and full reset button.
- **Empty Filter State:** Contextual messaging when search queries or filters yield zero matches.

### ❤️ 4.3. Student Favourites System
- Heart icon on every dish card and item details page.
- Persistent favourite state across client-side page navigation.
- Dedicated "Favourites Only" filter switch with real-time counter in the header and toolbar.

### 📦 4.4. Dish Details View (`/item/:id`)
- Deep-linked route using React Router's `useParams()`.
- Interactive quantity stepper (minimum 1, default 1).
- Out-of-stock safeguard: Disables "Add to Cart" and displays "Sold Out for Today" tag.
- Temporary visual confirmation ("Added 2 to Cart!") with auto-reset after 1.8 seconds.
- Friendly error handling for invalid or nonexistent dish IDs with return link.

### 🛒 4.5. Shared Shopping Cart (`CartContext`)
- **Global Context Provider:** Cart state shared synchronously across Header, Menu, Details, and Cart views.
- **Quantity Management:** Increment, decrement (removes item when reaching 0), or remove item entirely.
- **Total Calculation:** Real-time calculation of item subtotals (`price × quantity`) and grand order total in PKR.
- **Clear Cart:** One-click clear button to empty tray.
- **Persistent Storage:** Synchronized with `localStorage` (`unicrave_cart_v1`) with malformed JSON safety guard.
- **Empty Cart State:** Features custom illustration, clear messaging, and a direct "Browse Campus Menu" button.

---

## 5. Folder Structure

```text
UniCrave/
├── public/
│   ├── favicon.svg               # UniCrave logo favicon
│   ├── menu.json                 # 15 original canteen food dishes (source of truth)
│   └── images/                   # Local vector SVG artwork for every canteen item
│       ├── anda-paratha.svg
│       ├── bun-kabab.svg
│       ├── cheese-omelette.svg
│       ├── chicken-biryani.svg
│       ├── chicken-karahi.svg
│       ├── chicken-patty.svg
│       ├── club-sandwich.svg
│       ├── daal-chawal.svg
│       ├── fallback-food.svg
│       ├── halwa-puri.svg
│       ├── karak-chai.svg
│       ├── loaded-fries.svg
│       ├── mint-lemonade.svg
│       ├── samosa-chaat.svg
│       ├── spanish-latte.svg
│       └── zinger-burger.svg
├── src/
│   ├── assets/                   # Static icons & brand assets
│   ├── components/
│   │   ├── cart/
│   │   │   └── Cart.jsx          # Reusable Cart list, controls & order summary
│   │   ├── layout/
│   │   │   ├── Footer.jsx        # Semantic university footer with campus hub info
│   │   │   ├── Header.jsx        # Sticky navigation header with dynamic cart badge
│   │   │   └── Hero.jsx          # Canteen brand hero section (rendered on "/" only)
│   │   └── menu/
│   │       ├── CategoryFilter.jsx# Horizontal scrollable category pill selector
│   │       ├── ItemCard.jsx      # Individual food card with Quick-Add & details link
│   │       ├── MenuList.jsx      # CSS grid container for food cards
│   │       └── MenuSearch.jsx    # Controlled search input with clear button
│   ├── context/
│   │   └── CartContext.jsx       # Cart Context, Provider, & custom useCart() hook
│   ├── hooks/
│   │   └── useMenu.js            # Custom hook for fetching and retrying menu.json
│   ├── pages/
│   │   ├── CartPage.jsx          # Routed page hosting <Cart />
│   │   ├── ItemDetailsPage.jsx   # Routed page for /item/:id with quantity stepper
│   │   ├── MenuPage.jsx          # Landing catalog page hosting Hero, filters & MenuList
│   │   └── NotFoundPage.jsx      # Wildcard 404 page with return link
│   ├── App.css                   # Component styles, CSS Grid, media queries
│   ├── App.jsx                   # Application root shell, routing & CartProvider
│   ├── index.css                 # CSS variables, typography reset & design tokens
│   └── main.jsx                  # React 19 entry point with BrowserRouter wrapper
├── index.html                    # HTML5 shell with Google Fonts & viewport meta
├── package.json                  # Dependencies, scripts, and project metadata
├── package-lock.json             # Locked dependency versions
├── vite.config.js                # Vite build and plugin configuration
├── .oxlintrc.json                # Linter configuration rules
├── README.md                     # Comprehensive project documentation (this file)
└── SUBMISSION_CHECKLIST.md       # University evaluation and verification checklist
```

---

## 6. Installation & Running Instructions

### Prerequisites
- **Node.js:** v18.0.0 or higher (Tested on Node v24.22.0)
- **npm:** v9.0.0 or higher

### Steps to Run Locally

1. **Open Terminal / PowerShell:**
   ```bash
   cd D:\React_Projects\UniCrave
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

4. **Run Linter:**
   ```bash
   npm run lint
   ```
   *Expected output: 0 warnings and 0 errors.*

5. **Build for Production:**
   ```bash
   npm run build
   ```
   Builds the optimized production bundle into the `dist/` folder.

6. **Preview Production Build:**
   ```bash
   npm run preview
   ```
   Serves the production build on `http://localhost:4173/`.

---

## 7. Explanation of React Concepts Used

### 7.1. Props (Properties)
Props represent read-only inputs passed from a parent component down to child components, establishing a unidirectional data flow.
- In UniCrave, `MenuList.jsx` receives `items`, `favouriteIds`, and `onToggleFavourite` as props from `MenuPage.jsx`.
- `ItemCard.jsx` receives an individual `item` object and `isFavourite` boolean flag. This decouples presentation from data management and makes `ItemCard` completely reusable.

### 7.2. `useState` (Component State Management)
The `useState` hook allows functional components to store and update local, reactive state. When the state setter function is called, React schedules a re-render of the component with the new state.
- **Search Query State:** `const [searchQuery, setSearchQuery] = useState('')` in `MenuPage.jsx` controls the input field in real-time.
- **Category Selection:** `const [selectedCategory, setSelectedCategory] = useState('All Items')` tracks which category filter is active.
- **Quantity Stepper:** `const [quantity, setQuantity] = useState(1)` in `ItemDetailsPage.jsx` allows incrementing and decrementing the order quantity prior to cart insertion.
- **Button Feedback:** `const [showAdded, setShowAdded] = useState(false)` displays temporary "Added!" feedback to reassure the user.

### 7.3. `useEffect` (Side Effects)
`useEffect` enables performing side effects in functional components, such as data fetching, manual DOM manipulations, or persisting data to browser storage.
- In `useMenu.js`, `useEffect` executes upon component mounting (`[]` dependency array) to trigger `fetch('/menu.json')`.
- In `CartContext.jsx`, `useEffect` listens to changes in `cartItems` (`[cartItems]` dependency array) and automatically synchronizes the serialized array with browser `localStorage`.

### 7.4. `fetch` & `async/await` (Asynchronous Data Fetching)
Rather than blocking the main browser thread, modern JavaScript uses Promises with `async/await` syntax for clean asynchronous code.
- Inside `useMenu.js`:
  ```javascript
  const fetchMenu = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/menu.json')
      if (!response.ok) {
        throw new Error(`Failed to load menu: HTTP ${response.status}`)
      }
      const data = await response.json()
      setMenuItems(data)
    } catch (err) {
      setError(err.message || 'Error fetching menu')
    } finally {
      setLoading(false)
    }
  }
  ```
- This cleanly handles all three lifecycle states: *Loading*, *Success*, and *Error*.

### 7.5. React Router (Client-Side Navigation)
React Router enables navigation in Single Page Applications without triggering full browser reloads:
- `<BrowserRouter>` in `main.jsx` wraps the DOM tree to monitor browser history.
- `<Routes>` and `<Route>` in `App.jsx` define application routes:
  - `/`: Main campus dining menu and hero section.
  - `/item/:id`: Dynamic parameter route using `useParams()` to look up the dish by its unique ID.
  - `/cart`: Shopping cart view.
  - `*`: Catch-all wildcard rendering `NotFoundPage.jsx`.
- `<Link>` and `<NavLink>` replace traditional `<a>` tags to intercept URL clicks and update the DOM using client-side JavaScript history methods.

### 7.6. Context API (`createContext` & `useContext`)
The Context API solves the "prop drilling" problem where deeply nested components require access to shared global data.
- **Context Creation:** `CartContext = createContext(null)` creates the data vessel.
- **Provider Pattern:** `<CartProvider>` wraps the entire application in `App.jsx`. It holds the shared `cartItems` state and provides helper actions (`addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`).
- **Consumer Hook:** The custom hook `useCart()` exposes these values directly to any component in the tree (e.g. `Header.jsx` accesses `cartCount`, `ItemCard.jsx` accesses `addToCart`).
- **Dynamic Cart Count Calculation:**
  ```javascript
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
  }, [cartItems])
  ```
  This guarantees that if a student orders 2 Zinger Burgers and 1 Karak Chai, `cartCount` equals `3`, updating instantly in the Header across all screens.

### 7.7. Responsive CSS Architecture
UniCrave uses a mobile-first, semantic CSS architecture without bulky external CSS frameworks:
- **CSS Custom Properties (Variables):** Standardized color palette (`--color-navy-900: #071324`, `--color-teal-600: #0D9488`, `--color-teal-500: #14B8A6`, `--color-slate-50: #F8FAFC`).
- **CSS Grid:** Powers the responsive food catalog (`grid-template-columns: repeat(auto-fill, minmax(290px, 1fr))`) and the two-column Cart layout.
- **Flexbox:** Used for navigation alignment, category pill scroll containers, quantity steppers, and badge alignments.
- **Media Queries:** Tailored breakpoints at `480px`, `640px`, `768px`, `1024px`, and `1200px` ensure seamless adaptation on mobile phones (375px), tablets (768px), and desktops (1440px).

---

## 8. Test Verification Summary

All 29 mandatory university test scenarios were executed and verified through automated headless browser automation (Chrome v155 + CDP):

| # | Test Scenario | Status | Verified Result |
|---|---|---|---|
| 01 | Open Menu page | ✅ PASS | Verified page title and root mount |
| 02 | Confirm 15 JSON items load | ✅ PASS | Loaded all 15 dishes from `/menu.json` |
| 03 | Search for "biryani" | ✅ PASS | Filtered accurately to "Special Canteen Chicken Biryani" |
| 04 | Clear the search | ✅ PASS | Restored full 15 items immediately |
| 05 | Filter by Fast Food | ✅ PASS | Filtered to 3 Fast Food items |
| 06 | Favourite a burger | ✅ PASS | Heart icon toggled; Header badge incremented to 1 |
| 07 | Activate Favourites Only | ✅ PASS | Favourites Only filter activated |
| 08 | Verify the burger appears | ✅ PASS | Exactly 1 favourited burger displayed |
| 09 | Return to All Items | ✅ PASS | Reset filters returned all 15 items |
| 10 | Open burger Item Details | ✅ PASS | Navigated to `/item/item-7` with item info |
| 11 | Increase quantity to 2 | ✅ PASS | Stepper updated quantity to 2 |
| 12 | Add 2 burgers to cart | ✅ PASS | Visual feedback "Added 2 to Cart!" appeared |
| 13 | Verify Header cart count = 2 | ✅ PASS | Header badge updated to 2 immediately |
| 14 | Navigate to Cart | ✅ PASS | Client-side navigation to `/cart` |
| 15 | Verify quantity = 2 in Cart | ✅ PASS | Cart item row displays quantity of 2 |
| 16 | Add another item from menu | ✅ PASS | Navigated back; quick-added Anda Paratha Roll |
| 17 | Verify Header cart count = 3 | ✅ PASS | Header badge updated to 3 |
| 18 | Verify cart total is correct | ✅ PASS | Calculated PKR 860 === Displayed PKR 860 |
| 19 | Increase quantity in Cart | ✅ PASS | Stepper incremented count to 4 |
| 20 | Verify total updates | ✅ PASS | Total recalculated from PKR 860 to PKR 1000 |
| 21 | Decrease quantity in Cart | ✅ PASS | Decremented back to PKR 860 |
| 22 | Remove an item from Cart | ✅ PASS | Second item removed; 1 dish remains |
| 23 | Verify Header count updates | ✅ PASS | Header badge decremented back to 2 |
| 24 | Clear cart | ✅ PASS | Entire cart emptied; badge reset to 0 |
| 25 | Verify empty-cart state | ✅ PASS | Displayed "Your cart is empty" with Browse button |
| 26 | Test invalid item ID | ✅ PASS | Displays "Dish Not Found" with Return button |
| 27 | Test unknown route (404) | ✅ PASS | Displays 404 Page with Return button |
| 28 | Test mobile responsiveness | ✅ PASS | Tested 375px, 768px, 1440px without layout overflow |
| 29 | Verify SPA navigation | ✅ PASS | Preserved window memory across all client routes |

---

## 9. Conclusion

UniCrave provides a clean, maintainable, and fully compliant solution for modern university campus food ordering. It demonstrates mastery over core React 19 architecture, asynchronous data loading, client-side routing, shared state with Context API, and modern responsive frontend design.
