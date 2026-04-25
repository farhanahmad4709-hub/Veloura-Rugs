// ========================================
// State Manager & Persistence
// ========================================

let productData = null;

export function setProductData(data) {
  productData = data;
}

export function getProductData() {
  return productData;
}

const KEYS = {
  CART: 'veloura_cart',
  WISHLIST: 'veloura_wishlist',
  USER: 'veloura_user',
  CONTACTS: 'veloura_contacts',
  NEWSLETTER: 'veloura_newsletter',
  ORDERS: 'veloura_orders'
};

// ... (skipping unchanged code)

// ---- Orders ----
export function getOrders() {
  const user = getUser();
  if (!user) return [];
  
  const orders = get(KEYS.ORDERS) || [];
  let updated = false;
  
  // Filter only orders for the current user
  const userOrders = orders.filter(o => o.userId === user.id);
  
  userOrders.forEach(order => {
    if (order.status !== 'Delivered' && order.timestamp) {
      const elapsed = Date.now() - order.timestamp;
      if (elapsed >= 60000) {
        order.status = 'Delivered';
        updated = true;
      } else if (elapsed >= 10000 && order.status === 'Processing') {
        order.status = 'Shipped';
        updated = true;
      }
    }
  });

  if (updated) {
    set(KEYS.ORDERS, orders);
  }
  return userOrders;
}

export function saveOrder(order) {
  const user = getUser();
  if (!user) return [];
  
  const orders = get(KEYS.ORDERS) || [];
  if (!order.timestamp) {
    order.timestamp = Date.now();
  }
  order.userId = user.id;
  orders.unshift(order); // Newest first
  set(KEYS.ORDERS, orders);
  return orders;
}

export function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    set(KEYS.ORDERS, orders);
  }
}

function get(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch {
    return null;
  }
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---- Cart ----
export function getCart() {
  return get(KEYS.CART) || [];
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  set(KEYS.CART, cart);
  updateCartUI();
  return cart;
}

export function updateCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    const item = cart.find(item => item.id === productId);
    if (item) item.qty = qty;
  }
  set(KEYS.CART, cart);
  updateCartUI();
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  set(KEYS.CART, cart);
  updateCartUI();
  return cart;
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = getCartCount();
}

// ---- Wishlist ----
export function getWishlist() {
  return get(KEYS.WISHLIST) || [];
}

export function toggleWishlist(product) {
  const list = getWishlist();
  const idx = list.findIndex(item => item.id === product.id);
  if (idx > -1) {
    list.splice(idx, 1);
  } else {
    list.push(product);
  }
  set(KEYS.WISHLIST, list);
  updateWishlistUI();
  return list;
}

export function removeFromWishlist(productId) {
  const list = getWishlist().filter(item => item.id !== productId);
  set(KEYS.WISHLIST, list);
  updateWishlistUI();
  return list;
}

export function getWishlistCount() {
  return getWishlist().length;
}

export function updateWishlistUI() {
  const countEl = document.getElementById('wishlist-count');
  if (countEl) countEl.textContent = getWishlistCount();
}

export function isInWishlist(productId) {
  return getWishlist().some(item => item.id === productId);
}

// ---- User Auth ----
export function isLoggedIn() {
  return document.cookie.includes('veloura_session=true');
}

export function getUser() {
  if (!isLoggedIn()) return null;
  return get(KEYS.USER);
}

export function login(email, password) {
  // Check if user exists in saved accounts
  const accounts = get('veloura_accounts') || [];
  const found = accounts.find(a => a.email === email && a.password === password);
  if (found) {
    set(KEYS.USER, found);
    
    // Set 30-day cookie
    const expires = new Date();
    expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = `veloura_session=true; expires=${expires.toUTCString()}; path=/`;
    
    return { success: true, user: found };
  }
  return { success: false, error: 'Invalid email or password' };
}

export function register(data) {
  const accounts = get('veloura_accounts') || [];
  if (accounts.find(a => a.email === data.email)) {
    return { success: false, error: 'Email already registered' };
  }
  const user = { ...data, id: Date.now().toString() };
  accounts.push(user);
  set('veloura_accounts', accounts);
  set(KEYS.USER, user);
  
  // Set 30-day cookie
  const expires = new Date();
  expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
  document.cookie = `veloura_session=true; expires=${expires.toUTCString()}; path=/`;
  
  return { success: true, user };
}

export function logout() {
  localStorage.removeItem(KEYS.USER);
  // Clear cookie
  document.cookie = "veloura_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function updateUser(data) {
  const user = getUser();
  if (!user) return null;
  
  const updated = { ...user, ...data };
  set(KEYS.USER, updated);
  
  // Also update in accounts list
  const accounts = get('veloura_accounts') || [];
  const idx = accounts.findIndex(a => a.id === user.id);
  if (idx > -1) {
    accounts[idx] = updated;
    set('veloura_accounts', accounts);
  }
  return updated;
}


// ---- Contact Form ----
export function saveContact(data) {
  const contacts = get(KEYS.CONTACTS) || [];
  contacts.push({ ...data, date: new Date().toISOString() });
  set(KEYS.CONTACTS, contacts);
}

// ---- Newsletter ----
export function saveNewsletter(email) {
  const list = get(KEYS.NEWSLETTER) || [];
  if (!list.includes(email)) {
    list.push(email);
    set(KEYS.NEWSLETTER, list);
  }
}
