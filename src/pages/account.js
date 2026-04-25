// ========================================
// Account Page
// ========================================
import { getUser, logout, getOrders } from '../store.js';
import { navigate } from '../router.js';

export function renderAccount(container) {
  const user = getUser();
  const orders = getOrders();
  
  if (!user) {
    navigate('#/login');
    return;
  }

  container.innerHTML = `
    <div class="account-page">
      <div class="account-page__header">
        <h1>Your Account</h1>
        <a href="#" id="logout-btn" class="logout-link">Log Out →</a>
      </div>
      <div class="account-grid">
        <div class="account-orders">
          <h2>Order History</h2>
          ${orders.length > 0 ? `
            <div class="orders-list">
              ${orders.map(order => `
                <div class="order-row">
                  <div class="order-id">
                    <span class="label">Order ID</span>
                    <strong>${order.id}</strong>
                  </div>
                  <div class="order-date">
                    <span class="label">Date</span>
                    <strong>${order.date}</strong>
                  </div>
                  <div class="order-total">
                    <span class="label">Total</span>
                    <strong>${window.formatPrice(order.total)}</strong>
                  </div>
                  <div class="order-status">
                    <span class="label">Status</span>
                    <strong class="status-badge ${order.status.toLowerCase()}">${order.status}</strong>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="account-orders__empty">
              <p>You Haven't Placed Any Orders Yet</p>
              <a href="#/collection/all-rugs" class="btn btn-gold" style="margin-top:16px;display:inline-block;">Start Shopping</a>
            </div>
          `}
        </div>
        <div class="account-details">
          <h2>Account Details</h2>
          <div class="details-box">
            <p><strong>${user.firstName || 'User'} ${user.lastName || ''}</strong></p>
            <p>${user.email || ''}</p>
            <p>United States</p>
            <button class="btn btn-gold" style="margin-top:20px;padding:0.6rem 1.5rem;">Edit Address</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
    navigate('#/login');
  });
}
