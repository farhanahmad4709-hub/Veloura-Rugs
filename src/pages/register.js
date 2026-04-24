// ========================================
// Register Page
// ========================================
import { register } from '../store.js';
import { navigate } from '../router.js';

export function renderRegister(container) {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-page__image">
        <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/15410.jpg" alt="Blue Oushak Rug" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" />
      </div>
      <div class="auth-form">
        <h1>Create Account</h1>
        <form id="register-form">
          <div class="auth-form__row">
            <div class="form-group">
              <label>First Name <span class="required">*</span></label>
              <input type="text" name="firstName" placeholder="First name" required />
            </div>
            <div class="form-group">
              <label>Last Name <span class="required">*</span></label>
              <input type="text" name="lastName" placeholder="Last name" required />
            </div>
          </div>
          <div class="form-group">
            <label>E-mail <span class="required">*</span></label>
            <input type="email" name="email" placeholder="E-mail" required />
          </div>
          <div class="form-group">
            <label>Password <span class="required">*</span></label>
            <div style="position:relative;">
              <input type="password" name="password" placeholder="Password" required id="reg-password" />
              <button type="button" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#999;font-size:18px;" onclick="const inp=document.getElementById('reg-password');inp.type=inp.type==='password'?'text':'password';">👁</button>
            </div>
          </div>
          <button type="submit" class="btn btn--primary">Create Account</button>
          <div id="register-error" style="color:var(--color-sale);font-size:13px;margin-top:12px;display:none;"></div>
        </form>
        <div class="auth-form__footer">
          <span class="auth-form__footer-label">ALREADY HAVE AN ACCOUNT?</span>
          <a href="#/login">Login →</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = register({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password')
    });
    if (result.success) {
      const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
      const redirect = urlParams.get('redirect');
      if (redirect === 'checkout') {
        navigate('#/checkout');
      } else {
        navigate('#/account');
      }
    } else {
      const errEl = document.getElementById('register-error');
      errEl.textContent = result.error;
      errEl.style.display = 'block';
    }
  });
}
