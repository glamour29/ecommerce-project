# Cart & Favorites Feature

Branch: `feature/frontend/cart-favorites-duy`

## 📦 What's Included

### Stores (Zustand + localStorage)
- `src/store/cartStore.ts` - Shopping cart state management
- `src/store/favoriteStore.ts` - Favorites/wishlist state management
- `src/store/types.ts` - Shared TypeScript types

### Pages
- `src/pages/Cart.tsx` - Shopping bag/cart page
- `src/pages/Favorites.tsx` - Saved items/wishlist page

### Components
- `src/components/cart/CartItem.tsx` - Individual cart item with qty controls
- `src/components/favorites/FavoriteItem.tsx` - Favorite product card

## 🎨 Design System

- **Style**: Nike-inspired minimalist design
- **Colors**: White background, black text, clean spacing
- **Typography**: Bold headings, medium body text
- **Buttons**: Large rounded-full black buttons
- **Spacing**: Generous padding and margins
- **Responsive**: Mobile-first, adapts to desktop

## 🚀 Features

### Cart Page
✅ Add/remove items  
✅ Update quantity with +/- buttons  
✅ Real-time price calculation  
✅ Order summary sidebar  
✅ Free delivery indicator  
✅ Empty state with CTA  
✅ Responsive layout  
✅ Smooth animations  

### Favorites Page
✅ Product grid (1-4 columns responsive)  
✅ Add to cart from favorites  
✅ Remove from favorites  
✅ Product images with hover effects  
✅ Price display with sale badges  
✅ Rating stars  
✅ Empty state with CTA  

## 📱 Routes

- `/` → Home
- `/cart` → Shopping Cart
- `/favorites` → Saved Items
- `/catalogue` → All Products
- `/auth` → Login/Signup

## 🧪 How to Test

1. **Navigate to Cart:**
   - Click cart icon in header
   - Should show empty state initially

2. **Add Items to Cart:**
   - Go to product catalogue
   - Click "Add to Cart" on any product
   - See cart count badge update in header

3. **Navigate to Favorites:**
   - Click heart icon in header
   - Should show empty state initially

4. **Add Items to Favorites:**
   - Go to product catalogue
   - Click heart icon on product card
   - Item appears in favorites page

5. **Test Cart Functions:**
   - Increase/decrease quantity
   - Remove items
   - See total update real-time

6. **Test Favorites Functions:**
   - Add to cart from favorites
   - Remove from favorites
   - Item disappears with animation

## 💾 Data Persistence

Both cart and favorites use `localStorage`:
- `cart-storage` - Persists cart items
- `favorites-storage` - Persists favorite items

Data persists across:
- Page refreshes
- Browser restarts
- Tab closes

## 🔧 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **localStorage** - Data persistence

## 📝 Code Structure

```
frontend/src/
├── store/
│   ├── types.ts           # Shared types
│   ├── cartStore.ts       # Cart state + actions
│   └── favoriteStore.ts   # Favorites state + actions
├── pages/
│   ├── Cart.tsx           # Cart page component
│   └── Favorites.tsx      # Favorites page component
├── components/
│   ├── cart/
│   │   └── CartItem.tsx   # Cart item component
│   └── favorites/
│       └── FavoriteItem.tsx # Favorite item component
└── App.tsx                # Main app with routing
```

## 🎯 Future Enhancements

- [ ] Backend integration (API calls)
- [ ] Real checkout flow
- [ ] Order history
- [ ] Product quick view
- [ ] Size/color selection in cart
- [ ] Share favorites
- [ ] Move to wishlist from cart
- [ ] Saved cart for later
- [ ] Price alerts for favorites

## ✅ Ready for Review

All features implemented and tested. No linter errors.

**Commits:**
1. feat(cart): add cart and favorites stores with Zustand
2. feat(cart): implement Cart page with Nike-inspired UI
3. feat(favorites): implement Favorites page with grid layout
4. feat(routing): integrate Cart and Favorites into app routing

**Branch:** `feature/frontend/cart-favorites-duy`
**Status:** ✅ Complete, ready for PR


