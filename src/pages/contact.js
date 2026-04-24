// ========================================
// Contact Page
// ========================================
import { saveContact } from '../store.js';

export function renderContact(container) {
  container.innerHTML = `
    <div class="contact-page">
      <h1>Contact Us</h1>
      <div class="contact-layout">
        <div class="contact-form">
          <h2>Contact form</h2>
          <p>Some text for your contact form. You can use multiple lines of text.</p>
        </div>
        <div class="contact-info">
          <h2>Heading</h2>
          <p>Description</p>
          <form id="contact-form">
            <div class="form-group">
              <label>Name <span class="required">*</span></label>
              <input type="text" name="name" placeholder="Name" required />
            </div>
            <div class="form-group">
              <label>E-mail <span class="required">*</span></label>
              <input type="email" name="email" placeholder="E-mail" required />
            </div>
            <div class="form-group">
              <label>Phone Number <span class="required">*</span></label>
              <input type="tel" name="phone" placeholder="Phone Number" required />
            </div>
            <div class="form-group">
              <label>Your Request <span class="required">*</span></label>
              <textarea name="request" placeholder="Your Request" required></textarea>
            </div>
            <button type="submit" class="btn btn--primary">Submit</button>
            <p style="margin-top:12px;font-size:13px;color:#999;">Additional text for contact form.</p>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    saveContact(data);
    e.target.innerHTML = '<div style="text-align:center;padding:40px;"><h3 style="color:var(--color-primary);">Thank you!</h3><p style="margin-top:8px;color:#666;">Your message has been sent. We will get back to you soon.</p></div>';
  });
}
