// ========================================
// Checkout Page
// ========================================
import { getCart, getCartTotal, removeFromCart, saveOrder, getProductData, isLoggedIn } from '../store.js';
import { navigate } from '../router.js';

export function renderCheckout(container) {
  if (!isLoggedIn()) {
    navigate('#/login?redirect=checkout');
    return;
  }

  const cart = getCart();
  const total = getCartTotal();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="section" style="text-align:center;padding:100px 20px;">
        <h1>Your Cart is Empty</h1>
        <p>Add some beautiful rugs to your cart before checking out.</p>
        <a href="#/collection/all-rugs" class="btn btn-gold" style="margin-top:20px;display:inline-block;">Browse Collections</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="checkout-container">
      <div class="checkout-layout">
        <!-- Left: Checkout Form -->
        <div class="checkout-form">
          <h2>Shipping Information</h2>
          <form id="checkout-form">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" required placeholder="email@example.com" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" required placeholder="First Name" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" required placeholder="Last Name" />
              </div>
            </div>
            <div class="form-group">
              <label>Address</label>
              <input type="text" required placeholder="Street Address" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>City</label>
                <input type="text" required placeholder="City" />
              </div>
              <div class="form-group">
                <label>ZIP Code</label>
                <input type="text" required placeholder="ZIP Code" />
              </div>
            </div>
            
            <h2 style="margin-top:2rem">Payment</h2>
            <div class="payment-box">
              <p>Demo Mode: All transactions are simulated.</p>
              <div class="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" disabled value="4242 4242 4242 4242" />
              </div>
            </div>

            <button type="submit" class="btn btn-gold btn--full" style="margin-top:2rem;padding:1.2rem;">Complete Purchase — $${total.toLocaleString()}</button>
          </form>
        </div>

        <!-- Right: Order Summary -->
        <div class="checkout-summary">
          <h2>Order Summary</h2>
          <div class="summary-items">
            ${cart.map(item => {
              const data = getProductData();
              const p = data?.products.find(prod => prod.id === item.id);
              const imgSrc = p?.images?.[0] || 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=200';
              return `
              <div class="summary-item">
                <div class="summary-item-img" style="background-image:url('${imgSrc}')"></div>
                <div class="summary-item-info">
                  <div class="summary-item-title">${item.title}</div>
                  <div class="summary-item-qty">Qty: ${item.qty}</div>
                </div>
                <div class="summary-item-price">$${(item.price * item.qty).toLocaleString()}</div>
              </div>
            `;}).join('')}
          </div>
          <div class="summary-totals">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>$${total.toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>$${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Handle Form Submission
  const form = document.getElementById('checkout-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    processOrder(container);
  });
}

function processOrder(container) {
  const orderId = 'VEL-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const total = getCartTotal();
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Save order to history
  saveOrder({
    id: orderId,
    total: total,
    date: date,
    status: 'Processing'
  });

  // Clear cart
  const cart = getCart();
  cart.forEach(item => removeFromCart(item.id));

  container.innerHTML = `
    <div class="order-success">
      <div class="order-success-card">
        <div class="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your handcrafted rug is being prepared for shipment.</p>
        
        <div class="order-details">
          <div class="order-detail-row">
            <span>Order ID:</span>
            <strong>${orderId}</strong>
          </div>
          <div class="order-detail-row">
            <span>Total Amount:</span>
            <strong>$${total.toLocaleString()}</strong>
          </div>
          <div class="order-detail-row">
            <span>Status:</span>
            <strong id="order-status" class="status-badge processing">Processing</strong>
          </div>
        </div>

        <div class="tracking-timeline">
          <div class="timeline-step active" id="step-placed">Order Placed</div>
          <div class="timeline-step" id="step-shipped">Shipped</div>
          <div class="timeline-step" id="step-delivered">Delivered</div>
        </div>

        <a href="#/" class="btn btn-gold" style="margin-top:2rem;display:inline-block;">Return to Home</a>
      </div>
    </div>
  `;

  // Simulate Status Updates
  setTimeout(() => {
    const statusEl = document.getElementById('order-status');
    const stepShipped = document.getElementById('step-shipped');
    if (statusEl) {
      statusEl.textContent = 'Shipped';
      statusEl.className = 'status-badge shipped';
    }
    stepShipped?.classList.add('active');
  }, 10000); // Shipped after 10s for demo

  setTimeout(() => {
    const statusEl = document.getElementById('order-status');
    const stepDelivered = document.getElementById('step-delivered');
    if (statusEl) {
      statusEl.textContent = 'Delivered';
      statusEl.className = 'status-badge delivered';
    }
    stepDelivered?.classList.add('active');
  }, 120000); // Delivered after 2 minutes (120000ms)
}
