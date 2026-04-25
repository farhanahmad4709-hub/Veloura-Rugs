// ========================================
// Account Page
// ========================================
import { getUser, logout, getOrders, updateUser } from '../store.js';
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
            <!-- Details rendered here via JS -->
          </div>
        </div>
      </div>
    </div>
  `;

  const accountDetailsContainer = container.querySelector('.account-details');

  function renderDetails(isEditing = false) {
    const user = getUser();
    const detailsBox = accountDetailsContainer.querySelector('.details-box');
    
    if (isEditing) {
      detailsBox.innerHTML = `
        <form id="edit-address-form" style="display:flex; flex-direction:column; gap:10px;">
          <div class="form-group-mini">
            <label>First Name</label>
            <input type="text" name="firstName" value="${user.firstName || ''}" class="form-control-mini">
          </div>
          <div class="form-group-mini">
            <label>Last Name</label>
            <input type="text" name="lastName" value="${user.lastName || ''}" class="form-control-mini">
          </div>
          <div class="form-group-mini">
            <label>Email Address</label>
            <input type="email" name="email" value="${user.email || ''}" class="form-control-mini">
          </div>
          <div class="form-group-mini">
            <label>Shipping Address</label>
            <input type="text" name="address" value="${user.address || 'United States'}" class="form-control-mini">
          </div>
          <div style="display:flex; gap:10px; margin-top:10px;">
            <button type="submit" class="btn btn-gold" style="flex:1; padding:0.6rem;">Save Changes</button>
            <button type="button" id="cancel-edit" class="btn" style="flex:1; padding:0.6rem; background:#eee; color:#333;">Cancel</button>
          </div>
        </form>
      `;

      document.getElementById('edit-address-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        updateUser({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          address: formData.get('address')
        });
        renderDetails(false);
      });

      document.getElementById('cancel-edit').addEventListener('click', () => renderDetails(false));
    } else {
      detailsBox.innerHTML = `
        <p class="detail-name"><strong>${user.firstName || 'User'} ${user.lastName || ''}</strong></p>
        <p class="detail-email">${user.email || ''}</p>
        <p class="detail-address">${user.address || 'United States'}</p>
        <button id="edit-address-btn" class="btn btn-gold" style="margin-top:20px;padding:0.6rem 1.5rem;">EDIT ADDRESS</button>
      `;
      
      document.getElementById('edit-address-btn').addEventListener('click', () => renderDetails(true));
    }
  }

  // Initial render of details
  renderDetails(false);

  document.getElementById('logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
    navigate('#/login');
  });
}
