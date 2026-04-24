// ========================================
// Wishlist Page
// ========================================
import { getWishlist, removeFromWishlist, getUser } from '../store.js';
import { renderProductCard } from './home.js';
import { getProductData } from '../store.js';

export function renderWishlist(container) {
  const user = getUser();
  const wishlist = getWishlist();
  const data = getProductData();
  const allProducts = data?.products || [];

  container.innerHTML = `
    <div class="wishlist-page">
      ${!user ? `
        <div class="wishlist-guest">
          <p>You're browsing as a guest. Create an account to save your wishlist permanently.</p>
          <a href="#/register" class="btn btn--primary">Sign up</a>
          <a href="#/login" class="btn btn--outline">Sign in</a>
        </div>
      ` : ''}
      
      ${wishlist.length === 0 ? `
        <div class="wishlist-empty">
          <p>No items found. Add some products to wishlist first</p>
        </div>
      ` : `
        <div class="products-grid">
          ${wishlist.map((item, i) => {
            const fullProduct = allProducts.find(p => p.id === item.id) || item;
            return `
              <div style="position:relative;">
                ${renderProductCard(fullProduct, i)}
                <button class="btn btn--outline" style="width:100%;margin-top:8px;font-size:12px;" onclick="window.removeWishlistItem('${item.id}')">Remove from Wishlist</button>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;

  window.removeWishlistItem = function(id) {
    removeFromWishlist(id);
    renderWishlist(container);
  };
}
