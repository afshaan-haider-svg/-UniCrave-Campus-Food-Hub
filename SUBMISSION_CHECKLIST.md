# UniCrave — Final Submission Checklist & Verification Guide 📋

**Project:** UniCrave — Campus Food Hub  
**Student Course:** Web Engineering Semester Assignment  
**Target Submission File:** `UniCrave_Campus_Food_Hub_Submission.zip`  

---

## 1. Assignment Requirements Checklist

| Requirement | Implementation Detail | Status |
|---|---|---|
| **Vite + React Foundation** | Built with React 19, Vite 8, and modern JSX (no TypeScript). | ✅ Complete |
| **Sticky Header Navigation** | Brand typography, Campus Food Hub title, Menu, Favourites toggle with badge, and Cart badge. | ✅ Complete |
| **Hero Section** | Rendered exclusively on the home/menu route (`/`) with modern dining artwork and CTAs. | ✅ Complete |
| **Local JSON Menu Data** | `public/menu.json` with 15 original canteen food items across 5 distinct categories with PKR pricing. | ✅ Complete |
| **Dynamic Data Fetching** | Custom hook `src/hooks/useMenu.js` using `useState`, `useEffect`, `fetch`, and `async/await` with loading/error/retry states. | ✅ Complete |
| **Search Functionality** | Controlled input in `MenuSearch.jsx` with case-insensitive matching, whitespace trimming, and clear button. | ✅ Complete |
| **Category Filters** | `CategoryFilter.jsx` with *All Items*, *Breakfast*, *Desi Meals*, *Fast Food*, *Snacks*, and *Beverages*. | ✅ Complete |
| **Student Favourites Toggle** | Heart icon on cards and details page, state preserved across navigation, with Favourites Only view. | ✅ Complete |
| **React Router Setup** | Configured routes: `/` (MenuPage), `/item/:id` (ItemDetailsPage), `/cart` (CartPage), `*` (NotFoundPage). | ✅ Complete |
| **Item Details Page** | Full specifications, nutrition/canteen info, quantity stepper (min 1, default 1), and working "Add to Cart" button. | ✅ Complete |
| **Out-of-Stock Handling** | Unavailable items disabled with "Sold Out for Today" tag on cards and details page. | ✅ Complete |
| **Cart Context API** | `CartContext.jsx` with `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, and `clearCart`. | ✅ Complete |
| **Immediate Header Cart Badge** | Header badge reflects total items sum (`cartCount = sum of quantities`) synchronously across all screens. | ✅ Complete |
| **Cart Page & Component** | Reusable `Cart.jsx` with item thumbnails, steppers, subtotals, grand total, and empty-cart state. | ✅ Complete |
| **Quick Add on Menu Cards** | One-click "+ Add" button on `ItemCard.jsx` with 1.5s visual confirmation without accidental card navigation. | ✅ Complete |
| **Defensive LocalStorage** | Cart state safely persisted to `unicrave_cart_v1` with validation fallback. | ✅ Complete |
| **Responsive Navy/Teal Styling** | Mobile-first CSS verified across 375px (mobile), 768px (tablet), and 1440px (desktop). | ✅ Complete |
| **Zero Errors & Zero Warnings** | Clean `npm run lint` (Oxlint) and `npm run build` (Vite production build). | ✅ Complete |

---

## 2. Final Testing Checklist

Before archiving and submitting, ensure the following steps have been verified:

- [x] **Dev Server Test:** Running `npm run dev` serves the application without errors.
- [x] **Linter Verification:** `npm run lint` completes with `0 warnings and 0 errors`.
- [x] **Production Build:** `npm run build` generates `dist/index.html` and bundled assets cleanly in `< 500ms`.
- [x] **Headless Chrome E2E Suite:** All 29 mandatory test scenarios pass with a 100% success rate.
- [x] **Cart Calculation Integrity:** `cartTotal = ∑(price × quantity)` verified on all order modifications.
- [x] **Browser Refresh Persistence:** Cart items remain in place upon refreshing the browser window.
- [x] **Invalid Route Recovery:** Visiting `/item/invalid-id` or `/unknown-route` shows a clear error message with a working "Return to Campus Menu" button.

---

## 3. Loom Screen Recording Instructions (For Student Video Demo)

If your university professor or teaching assistant requires a 3 to 5-minute Loom video demonstration, follow this step-by-step walkthrough:

1. **Introduction (30 Seconds):**
   - Introduce yourself and mention the project name: *UniCrave — Campus Food Hub*.
   - Mention the tech stack: React 19, Vite, React Router, and Context API.

2. **Menu Browsing & Dynamic Data (1 Minute):**
   - Point out that the 15 dishes are loaded from `public/menu.json` (open browser Network tab to show the `/menu.json` HTTP request if helpful).
   - Demonstrate the controlled Search input by typing `biryani`, then clicking the clear button.
   - Switch between category tabs: *Fast Food*, *Breakfast*, *Desi Meals*, *Snacks*, and *Beverages*.
   - Click the heart icon on a couple of items to favourite them, then click "Favourites Only" to demonstrate active filtering.

3. **Item Details & Ordering (1 Minute):**
   - Click "Details" on an item (e.g. *Crispy Canteen Zinger Burger*).
   - Demonstrate the quantity stepper: increase quantity from 1 to 2.
   - Click "Add 2 to Campus Cart" and highlight the instant visual confirmation ("Added 2 to Cart!").
   - Point to the sticky Header: show that the Cart badge immediately jumped from `0` to `2`.

4. **Shopping Cart & Context API (1 Minute):**
   - Click the Cart link in the header to navigate to `/cart`.
   - Show the cart tray containing the 2 burgers and the correct subtotal (`PKR 760`).
   - Click "Add more items from menu" to navigate back to `/`.
   - Use the quick "+ Add" button on another dish (e.g. *Classic Anda Paratha Roll*).
   - Show the header badge now displaying `3`.
   - Navigate back to `/cart`: show both items, use the `+` stepper to increase quantity, use the `-` stepper, and remove an item.
   - Click "Clear Cart" to demonstrate the custom Empty Cart state with its "Browse Campus Menu" button.

5. **Responsive Design & 404 Route (30 Seconds):**
   - Open Chrome DevTools (`F12`), toggle Device Toolbar (`Ctrl+Shift+M`), and show mobile view at 375px.
   - Demonstrate the mobile hamburger menu drawer.
   - Test an unknown URL (e.g. `http://localhost:5173/test-404`) to show the user-friendly Not Found page.
   - Conclude your video.

---

## 4. ZIP Submission Instructions

### Included Files:
- `src/` (All source code: components, pages, hooks, context, styles)
- `public/` (`menu.json`, `favicon.svg`, and local SVG food images)
- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `.oxlintrc.json`
- `README.md`
- `SUBMISSION_CHECKLIST.md`

### Excluded Files (STRICTLY REQUIRED):
- `node_modules/` (Excluded — professor/evaluator will run `npm install`)
- `dist/` (Excluded — evaluator will run `npm run build`)
- `.git/` (Excluded)
- Temporary test and log files

### How the Evaluator Runs the Submitted Code:
```bash
# 1. Unzip archive into target folder
# 2. Enter folder in terminal
cd UniCrave

# 3. Install clean dependencies
npm install

# 4. Run development server
npm run dev
# OR build and preview:
npm run build
npm run preview
```
