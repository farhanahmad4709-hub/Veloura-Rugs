// ========================================
// Product Detail Page
// ========================================
import { getProductData } from '../store.js';
import { renderProductCard } from './home.js';
import { rugColors, generateRugSVG } from '../utils.js';
import { addToCart, toggleWishlist, isInWishlist } from '../store.js';

export function renderProductDetail(container, params) {
  const data = getProductData();
  const products = data?.products || [];
  const product = products.find(p => p.slug === params.slug);
  
  if (!product) {
    container.innerHTML = '<div class="section" style="text-align:center;padding:100px;"><h1>Product Not Found</h1><a href="#/collection/all-rugs" class="btn btn--primary" style="margin-top:20px;">Browse All Rugs</a></div>';
    return;
  }

  const idx = products.indexOf(product);
  const colors = rugColors[idx % rugColors.length];
  
  let mainImg = generateRugSVG(colors, idx % 4);
  let thumbImgs = [0,1,2].map(i => generateRugSVG(rugColors[(idx + i) % rugColors.length], (idx + i) % 4));

  if (product.images && product.images.length > 0 && product.images[0].startsWith('http')) {
     const validImages = product.images.filter(img => img && img.trim() !== '' && !img.includes('15343.jpg'));
     if (validImages.length > 0) {
       mainImg = validImages[0];
       thumbImgs = validImages.slice(0, 4);
     } else {
       // Fallback for empty image array
       if (product.collections && product.collections.includes('rug-pads')) {
         mainImg = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800';
       } else {
         mainImg = 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=800';
       }
       thumbImgs = [mainImg];
     }
  }
  
  // Related products
  const related = products.filter(p => p.id !== product.id && (p.style === product.style || p.color === product.color)).slice(0, 4);
  const inWishlist = isInWishlist(product.id);

  const desc = product.description || {};

  container.innerHTML = `
    <div class="product-detail">
      <!-- Thumbnails -->
      <div class="product-thumbnails">
        ${thumbImgs.map((img, i) => `
          <div class="product-thumbnail ${i === 0 ? 'active' : ''}" data-img="${img}" style="background-image:url('${img}');background-size:cover;background-position:center;">
          </div>
        `).join('')}
      </div>

      <!-- Main Image -->
      <div class="product-main-image" id="product-main-img" style="background-image:url('${mainImg}');background-size:cover;background-position:center;">
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <div class="product-info__vendor">VELOURA RUGS</div>
        <h1 class="product-info__title">${product.title}</h1>
        <div class="product-info__sku">${product.sku}</div>
        
        <div class="product-info__prices">
          <span class="product-info__price">$${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
          ${product.comparePrice ? `<span class="product-info__compare">$${product.comparePrice.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>` : ''}
        </div>

        ${product.inStock ? '<div class="product-info__stock">⟡ 1 in Stock</div>' : '<div class="product-info__stock" style="color:var(--color-sale);">Out of Stock</div>'}

        <div class="product-info__actions">
          <div class="quantity-selector">
            <button id="qty-minus">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="99" />
            <button id="qty-plus">+</button>
          </div>
          <button class="btn btn--dark product-info__add-cart" id="add-to-cart-btn">Add To Cart</button>
        </div>

        <button class="btn btn--primary product-info__wishlist" id="add-wishlist-btn">
          Add to wishlist ${inWishlist ? '✓' : '♥'}
        </button>

        <!-- Description Accordion -->
        <div class="product-accordion">
          <div class="product-accordion__item">
            <button class="product-accordion__header active" data-accordion="desc">
              <span>DESCRIPTION</span>
              <span class="product-accordion__icon">↕</span>
            </button>
            <div class="product-accordion__content active" id="accordion-desc">
              ${Object.entries(desc).map(([key, val]) => 
                `<p><strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}:</strong> ${val}</p>`
              ).join('')}
            </div>
          </div>
          <div class="product-accordion__item">
            <button class="product-accordion__header" data-accordion="shipping">
              <span>SHIPPING & RETURNS</span>
              <span class="product-accordion__icon">↓</span>
            </button>
            <div class="product-accordion__content" id="accordion-shipping">
              <p>Free shipping on orders over $300. Standard delivery within 5-7 business days.</p>
              <p>All rugs come with a 30-day return policy. Items must be in original condition.</p>
              <p>For returns, please contact us at velourarugs@hotmail.com</p>
            </div>
          </div>
        </div>

        <p style="text-align:center;margin-top:16px;color:var(--color-sale);font-weight:700;font-size:13px;text-transform:uppercase;">
          Have a question? Click on chat icon to get it started!
        </p>

        <div class="product-detail__share">
          <span class="product-detail__share-label">SHARE:</span>
          <div class="product-detail__share-icons">
            <a href="#" title="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/></svg>
            </a>
            <a href="#" title="X">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            </a>
            <a href="#" title="Pinterest">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.67 7.9 6.47 9.35-.08-.8-.15-2.02.03-2.9.17-.78 1.1-4.66 1.1-4.66s-.28-.56-.28-1.4c0-1.3.75-2.27 1.7-2.27.8 0 1.18.6 1.18 1.32 0 .8-.5 2-.77 3.12-.22.94.47 1.7 1.4 1.7 1.68 0 2.97-1.78 2.97-4.34 0-2.27-1.63-3.85-3.95-3.85-2.7 0-4.28 2.02-4.28 4.1 0 .8.3 1.68.7 2.15.08.1.08.18.06.3-.07.27-.22.9-.25 1.02-.04.16-.13.2-.3.12-1.12-.52-1.82-2.17-1.82-3.5 0-2.85 2.07-5.46 5.96-5.46 3.13 0 5.57 2.23 5.57 5.22 0 3.1-1.96 5.6-4.68 5.6-.9 0-1.77-.48-2.06-1.02l-.56 2.13c-.2.78-.75 1.75-1.12 2.35 1 .3 2.05.47 3.15.47 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
            </a>
            <a href="#" title="Copy Link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            </a>
          </div>
        </div>

        <button class="btn btn--primary btn--full" id="add-wishlist-btn-2" style="margin-top:16px;">
          Add to wishlist ♥
        </button>
      </div>
    </div>

    <!-- You May Also Like -->
    ${related.length > 0 ? `
    <div class="also-like">
      <h2>You May Also Like</h2>
      <div class="products-grid">
        ${related.map((p, i) => renderProductCard(p, products.indexOf(p))).join('')}
      </div>
    </div>
    ` : ''}
  `;

  // Quantity controls
  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    const val = parseInt(qtyInput.value);
    if (val > 1) qtyInput.value = val - 1;
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });

  // Add to cart
  document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      comparePrice: product.comparePrice,
      slug: product.slug,
      sku: product.sku
    }, qty);
    // Open cart drawer
    document.getElementById('cart-drawer')?.classList.add('active');
    document.getElementById('cart-overlay')?.classList.add('active');
    document.body.classList.add('no-scroll');
    renderCartContents();
  });

  // Add to wishlist
  // Toggle wishlist
  const wishlistHandler = () => {
    toggleWishlist(product);
    const isNowIn = isInWishlist(product.id);
    document.querySelectorAll('#add-wishlist-btn, #add-wishlist-btn-2').forEach(btn => {
      btn.innerHTML = `Add to wishlist ${isNowIn ? '✓' : '♥'}`;
    });
  };
  document.getElementById('add-wishlist-btn')?.addEventListener('click', wishlistHandler);
  document.getElementById('add-wishlist-btn-2')?.addEventListener('click', wishlistHandler);

  // Thumbnail click
  container.querySelectorAll('.product-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      container.querySelectorAll('.product-thumbnail').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const mainImgEl = document.getElementById('product-main-img');
      mainImgEl.style.backgroundImage = `url('${thumb.dataset.img}')`;
    });
  });

  // Accordion
  container.querySelectorAll('.product-accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const id = header.dataset.accordion;
      const content = document.getElementById(`accordion-${id}`);
      header.classList.toggle('active');
      content?.classList.toggle('active');
    });
  });
}
