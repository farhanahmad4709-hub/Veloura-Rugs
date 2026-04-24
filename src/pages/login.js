// ========================================
// Login Page
// ========================================
import { login } from '../store.js';
import { navigate } from '../router.js';

export function renderLogin(container) {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-page__image">
        <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/118114.jpg" alt="Authentic Afghan Rug" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" />
      </div>
      <div class="auth-form">
        <h1>Login</h1>
        <form id="login-form">
          <div class="form-group">
            <label>E-mail <span class="required">*</span></label>
            <input type="email" name="email" placeholder="E-mail" required />
          </div>
          <div class="form-group">
            <label>Password <span class="required">*</span></label>
            <div style="position:relative;">
              <input type="password" name="password" placeholder="Password" required id="login-password" />
              <button type="button" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#999;font-size:18px;" onclick="const inp=document.getElementById('login-password');inp.type=inp.type==='password'?'text':'password';">👁</button>
            </div>
          </div>
          <a href="#" style="font-size:13px;color:#999;display:block;margin-bottom:16px;">Forgot Your Password?</a>
          <button type="submit" class="btn btn--primary">Sign In</button>
          <div id="login-error" style="color:var(--color-sale);font-size:13px;margin-top:12px;display:none;"></div>
        </form>
        <div class="auth-form__footer">
          <span class="auth-form__footer-label">NEW CUSTOMER?</span>
          <a href="#/register">Create Account →</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = login(formData.get('email'), formData.get('password'));
    if (result.success) {
      const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
      const redirect = urlParams.get('redirect');
      if (redirect === 'checkout') {
        navigate('#/checkout');
      } else {
        navigate('#/account');
      }
    } else {
      const errEl = document.getElementById('login-error');
      errEl.textContent = result.error;
      errEl.style.display = 'block';
    }
  });
}
