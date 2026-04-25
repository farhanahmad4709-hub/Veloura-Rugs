// ========================================
// Main Entry Point — Veloura Rugs
// ========================================
console.log("Veloura Rugs: Main module loading...");

import { addRoute, initRouter, handleRoute } from './router.js';

import { getCart, getCartTotal, getCartCount, updateCartQty, setProductData, getProductData, toggleWishlist as storeToggleWishlist, updateWishlistUI, isLoggedIn } from './store.js';

// Pages
import { renderHome } from './pages/home.js';

import { renderCollections } from './pages/collections.js';
import { renderCollectionDetail } from './pages/collectionDetail.js';
import { renderProductDetail } from './pages/productDetail.js';
import { renderAbout } from './pages/about.js';
import { renderContact } from './pages/contact.js';
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';
import { renderAccount } from './pages/account.js';
import { renderWishlist } from './pages/wishlist.js';
import { renderFaq } from './pages/faq.js';
import { renderPolicy } from './pages/policy.js';
import { renderCheckout } from './pages/checkout.js';

// Global Currency Configuration
window.selectedCurrency = localStorage.getItem('selectedCurrency') || 'PKR';
const currencyRates = {
  PKR: { rate: 1, suffix: ' PKR', name: 'Pakistan (PKR Rs)' },
  USD: { rate: 1/280, prefix: '$', name: 'United States (USD $)' },
  EUR: { rate: 0.92/280, prefix: '€', name: 'European Union (EUR €)' },
  GBP: { rate: 0.79/280, prefix: '£', name: 'United Kingdom (GBP £)' },
  CAD: { rate: 1.36/280, prefix: 'C$', name: 'Canada (CAD $)' },
  AUD: { rate: 1.53/280, prefix: 'A$', name: 'Australia (AUD $)' }
};


window.formatPrice = function(price) {
  if (price === undefined || price === null || isNaN(Number(price))) return '0.00';
  const c = currencyRates[window.selectedCurrency] || currencyRates.PKR;
  const converted = Number(price) * c.rate;
  const fraction = window.selectedCurrency === 'PKR' ? 0 : 2;
  const numStr = converted.toLocaleString('en-US', {minimumFractionDigits: fraction, maximumFractionDigits: fraction});
  return `${c.prefix || ''}${numStr}${c.suffix || ''}`;
};



// Load product data
async function loadData() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/products.json`);
    const data = await res.json();
    
    // Duplicate products for testing (up to 100)
    if (data.products && data.products.length < 100) {
      const originalProducts = [...data.products];
      while (data.products.length < 100) {
        originalProducts.forEach(p => {
          if (data.products.length < 100) {
            data.products.push({
              ...p,
              id: p.id + '_' + data.products.length,
              slug: p.slug + '-' + data.products.length
            });
          }
        });
      }
    }

    setProductData(data);
  } catch (err) {
    console.error('Failed to load product data:', err);
    setProductData({ products: [], collections: [], reviews: [] });
  }
}

// Setup routes
function setupRoutes() {
  addRoute('/', renderHome);
  addRoute('/collections', renderCollections);
  addRoute('/collection/:slug', renderCollectionDetail);
  addRoute('/product/:slug', renderProductDetail);
  addRoute('/about', renderAbout);
  addRoute('/contact', renderContact);
  addRoute('/login', renderLogin);
  addRoute('/register', renderRegister);
  addRoute('/account', renderAccount);
  addRoute('/wishlist', renderWishlist);
  addRoute('/faq', renderFaq);
  addRoute('/policy/:type', renderPolicy);
  addRoute('/checkout', renderCheckout);
}

// Setup global UI (cart, search, mobile menu)
function setupUI() {
  // Cart count
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = getCartCount();

  // Wishlist count
  updateWishlistUI();

  // User Icon link update
  function updateSessionUI() {
    const userIcons = document.querySelectorAll('a[href="#/login"], a[href="#/account"]');
    userIcons.forEach(icon => {
      if (isLoggedIn()) {
        icon.setAttribute('href', '#/account');
      } else {
        icon.setAttribute('href', '#/login');
      }
    });
  }
  updateSessionUI();
  window.addEventListener('hashchange', updateSessionUI);

  // Cart drawer toggle
  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');

  function openCart() {
    cartDrawer?.classList.add('active');
    cartOverlay?.classList.add('active');
    document.body.classList.add('no-scroll');
    renderCartDrawer();
  }

  function closeCart() {
    cartDrawer?.classList.remove('active');
    cartOverlay?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  cartToggle?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // Start shopping button in cart
  document.getElementById('start-shopping-btn')?.addEventListener('click', () => {
    closeCart();
  });

  // Search modal
  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input-overlay');
  const searchResults = document.getElementById('search-results');
  const searchResultsContainer = document.getElementById('search-results-container');
  const searchClear = document.getElementById('search-clear-btn');

  searchToggle?.addEventListener('click', () => {
    searchOverlay?.classList.add('active');
    setTimeout(() => searchInput?.focus(), 300);
  });

  searchClose?.addEventListener('click', () => {
    searchOverlay?.classList.remove('active');
  });

  searchClear?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    doSearch();
  });

  function doSearch() {
    const query = searchInput?.value?.toLowerCase().trim();
    const data = getProductData();
    if (!query || !data) {
      if (searchResults) searchResults.innerHTML = '';
      searchResultsContainer?.classList.remove('has-results');
      return;
    }
    const results = data.products.filter(p => {
      const title = (p.title || '').toLowerCase();
      const style = (p.style || '').toLowerCase();
      const color = (p.color || '').toLowerCase();
      const size = (p.size || '').toLowerCase();
      return title.includes(query) || style.includes(query) || color.includes(query) || size.includes(query);
    }).slice(0, 8);

    searchResultsContainer?.classList.add('has-results');

    if (results.length === 0) {
      if (searchResults) searchResults.innerHTML = '<p style="padding:20px;color:#999;text-align:center;">No products found.</p>';
      return;
    }

    if (searchResults) {
      searchResults.innerHTML = results.map(p => {
        const imgSrc = p.images?.[0] || '🏮';
        return `
        <a href="#/product/${p.slug}" class="search-result-item" onclick="document.getElementById('search-overlay').classList.remove('active');">
          <div class="search-result-item__img" style="background-image:url('${imgSrc}');">
          </div>
          <div class="search-result-item__info">
            <h4>${p.title}</h4>
            <span class="price">${window.formatPrice(p.price)}</span>
          </div>
        </a>
      `;}).join('');
    }
  }

  searchInput?.addEventListener('input', doSearch);
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  // Mobile menu
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileClose = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    mobileNav?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeMobileNav() {
    mobileNav?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  mobileToggle?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileOverlay?.addEventListener('click', closeMobileNav);

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Chat Widget Toggle
  const chatToggle = document.getElementById('chat-toggle-btn');
  const chatPanel = document.getElementById('chat-panel');
  const chatClose = document.getElementById('chat-close');

  chatToggle?.addEventListener('click', () => {
    chatPanel?.classList.toggle('active');
  });

  chatClose?.addEventListener('click', () => {
    chatPanel?.classList.remove('active');
  });

  // Footer Currency Selector
  const currencyBtn = document.getElementById('currency-btn');
  const currencyDropdown = document.getElementById('currency-dropdown');

  if (currencyBtn) {
    const c = currencyRates[window.selectedCurrency] || currencyRates.PKR;
    currencyBtn.innerHTML = `${c.name} <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
  }

  currencyBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currencyDropdown?.classList.toggle('active');
  });

  document.querySelectorAll('.currency-option').forEach(opt => {
    if (opt.getAttribute('data-currency') === window.selectedCurrency) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem('selectedCurrency', opt.getAttribute('data-currency'));
      location.reload();
    });
  });

  // Global click to close panels
  document.addEventListener('click', (e) => {
    if (chatPanel?.classList.contains('active') && !chatToggle?.contains(e.target) && !chatPanel.contains(e.target)) {
      chatPanel.classList.remove('active');
    }
    if (currencyDropdown?.classList.contains('active') && !currencyBtn?.contains(e.target)) {
      currencyDropdown.classList.remove('active');
    }
  });

  // Close search on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchOverlay?.classList.remove('active');
      chatPanel?.classList.remove('active');
      currencyDropdown?.classList.remove('active');
      closeCart();
      closeMobileNav();
      document.body.classList.remove('no-scroll');
    }
  });

  // Make global cart functions available
  window.updateCartItem = function(id, qty) {
    updateCartQty(id, qty);
    renderCartDrawer();
  };

  window.renderCartContents = renderCartDrawer;
}

function renderCartDrawer() {
  const cart = getCart();
  const cartBody = document.getElementById('cart-body');
  const cartFooter = document.getElementById('cart-footer');
  const itemsCount = document.getElementById('cart-items-count');
  const cartCount = document.getElementById('cart-count');

  if (cartCount) cartCount.textContent = getCartCount();

  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <p>Your Cart is Empty.</p>
        <p>Don't miss out on the best deals.</p>
        <a href="#/collection/all-rugs" class="btn btn--primary" onclick="document.getElementById('cart-drawer').classList.remove('active');document.getElementById('cart-overlay').classList.remove('active');document.body.classList.remove('no-scroll');">Start Shopping</a>
      </div>`;
    if (cartFooter) cartFooter.style.display = 'none';
    if (itemsCount) itemsCount.textContent = '0 ITEMS';
    return;
  }

  cartBody.innerHTML = cart.map(item => {
    const data = getProductData();
    const p = data?.products.find(prod => prod.id === item.id);
    const imgSrc = p?.images?.[0] || '🏮';
    return `
    <div class="cart-item">
      <div class="cart-item__image" style="background-image: url('${imgSrc}'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center;">
        ${imgSrc.startsWith('http') ? '' : imgSrc}
      </div>
      <div class="cart-item__details">
        <div class="cart-item__title">${item.title}</div>
        <div class="cart-item__price">${window.formatPrice(item.price)}</div>
        <div class="cart-item__qty">
          <button onclick="window.updateCartItem('${item.id}', ${item.qty - 1})">−</button>
          <span>${item.qty}</span>
          <button onclick="window.updateCartItem('${item.id}', ${item.qty + 1})">+</button>
        </div>
        <button class="cart-item__remove" onclick="window.updateCartItem('${item.id}', 0)">Remove</button>
      </div>
    </div>
  `;}).join('');

  if (cartFooter) cartFooter.style.display = 'block';
  const subtotal = document.getElementById('cart-subtotal');
  if (subtotal) subtotal.textContent = `${window.formatPrice(getCartTotal())}`;
  if (itemsCount) itemsCount.textContent = `${getCartCount()} ITEMS`;
}

// Global functions for inline handlers

window.toggleWishlist = (id) => {
  const data = getProductData();
  const product = data.products.find(p => p.id === id);
  if (product) storeToggleWishlist(product);
};

window.openQuickView = (id) => {
  const data = getProductData();
  const product = data.products.find(p => p.id === id);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  const overlay = document.getElementById('quick-view-overlay');
  const content = document.getElementById('quick-view-content');

  const validImages = (product.images || []).filter(img => img && img.trim() !== '' && !img.includes('15343.jpg'));
  const mainImg = validImages[0] || 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=600';
  
  content.innerHTML = `
    <div class="quick-view-layout">
      <div class="quick-view-images">
        <div class="quick-view-main" id="qv-main-img" style="background-image:url('${mainImg}');"></div>
        <div class="quick-view-thumbs">
          ${validImages.slice(0, 4).map(img => `<div class="qv-thumb" style="background-image:url('${img}');" onclick="document.getElementById('qv-main-img').style.backgroundImage='url(${img})'"></div>`).join('')}
        </div>
      </div>
      <div class="quick-view-info">
        <span class="qv-vendor">VELOURA RUGS</span>
        <h2>${product.title}</h2>
        <div class="qv-price">${window.formatPrice(product.price)} ${product.comparePrice ? `<span class="qv-compare">${window.formatPrice(product.comparePrice)}</span>` : ''}</div>
        <p class="qv-desc">${product.description?.material || 'Hand-knotted with premium wool'}. Origin: ${product.description?.origin || 'Afghanistan'}.</p>
        <div class="qv-actions">
          <button class="btn btn--dark btn--full" onclick="window.location.hash='#/product/${product.slug}'; window.closeQuickView();">VIEW FULL DETAILS</button>
        </div>
      </div>
    </div>
  `;

  modal?.classList.add('active');
  overlay?.classList.add('active');
  document.body.classList.add('no-scroll');
};

window.closeQuickView = () => {
  document.getElementById('quick-view-modal')?.classList.remove('active');
  document.getElementById('quick-view-overlay')?.classList.remove('active');
  document.body.classList.remove('no-scroll');
};

// Initialize app
async function init() {
  try {
    await loadData();
    setupRoutes();
    setupUI();
    initRouter();
    
    // Explicitly handle the initial route if the router didn't set content
    const container = document.getElementById('main-content');
    if (container && container.innerHTML.trim() === "") {
      renderHome(container);
    }
  } catch (err) {
    console.error("Initialization error:", err);
    const container = document.getElementById('main-content');
    if (container) {
      container.innerHTML = `<div class="section" style="text-align:center;padding:100px 20px;">
        <h2>Oops! Something went wrong.</h2>
        <p>We couldn't load the page content. Please try refreshing.</p>
        <button class="btn btn-gold" onclick="location.reload()">Refresh Page</button>
      </div>`;
    }
  }
}

init();



