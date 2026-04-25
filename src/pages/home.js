import { getProductData, isLoggedIn } from '../store.js';

export function renderHome(container) {
  const data = getProductData();
  const loggedIn = isLoggedIn();

  // Filter for featured products (ensure we get 4 unique items by title)
  const featured = [];
  const seenTitles = new Set();
  
  // 1. Try to get featured products first
  const allFeatured = data?.products?.filter(p => p.featured) || [];
  for (const p of allFeatured) {
    if (!seenTitles.has(p.title)) {
      featured.push(p);
      seenTitles.add(p.title);
    }
    if (featured.length === 4) break;
  }
  
  // 2. If we still have less than 4, fill with other unique products
  if (featured.length < 4) {
    const allProducts = data?.products || [];
    for (const p of allProducts) {
      if (!seenTitles.has(p.title)) {
        featured.push(p);
        seenTitles.add(p.title);
      }
      if (featured.length === 4) break;
    }
  }

  const reviewsSectionHtml = loggedIn ? `
    <section class="section reviews-section" style="padding-top: 5rem;">
      <h2 style="font-family: var(--ff-body); font-size: 2.8rem; font-weight: 700; margin-bottom: 2.5rem; text-align: center;">Customer Reviews</h2>
      <div class="reviews-header">
        <div class="rating-summary" id="rating-summary-toggle" style="cursor:pointer">
          <span class="rating-avg">5.0</span>
          <div class="stars">★★★★★</div>
          <span class="rating-count">(2,125 reviews) <svg id="rating-chevron" viewBox="0 0 10 6" style="width:10px;margin-left:4px;transition:transform 0.3s"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></span>
        </div>
        <button class="btn btn-dark write-review-btn" id="write-review-btn">Write a review</button>
      </div>

      <div class="review-form-container" id="review-form-container" style="display:none">
        <form class="review-form" id="review-submission-form">
          <h3>Write a Review</h3>
          <div class="review-form-group">
            <label>Rating</label>
            <div class="star-rating-input" id="star-rating-input">
              <span data-val="1">★</span><span data-val="2">★</span><span data-val="3">★</span><span data-val="4">★</span><span data-val="5" class="active">★</span>
            </div>
            <input type="hidden" id="rating-val" value="5" />
          </div>
          <div class="review-form-group">
            <label>Review Title</label>
            <input type="text" id="review-title" placeholder="Give your review a title" required />
          </div>
          <div class="review-form-group">
            <label>Review Content</label>
            <textarea id="review-content" placeholder="Write your comments here..." required></textarea>
          </div>
          <div class="review-form-group" style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label>Your Name</label>
              <input type="text" id="review-name" placeholder="Enter your name" required />
            </div>
            <div>
              <label>Your Email</label>
              <input type="email" id="review-email" placeholder="Enter your email" required />
            </div>
          </div>
          <div class="review-form-actions">
            <button type="submit" class="btn btn-dark">Submit Review</button>
            <button type="button" class="btn btn-outline" id="cancel-review">Cancel</button>
          </div>
        </form>
        <div id="review-success" style="display:none; text-align:center; padding: 2rem; background: var(--cream); border-radius: 8px;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">✓</div>
          <h3 style="color: var(--green); margin-bottom: 0.5rem;">Thank you for your review!</h3>
          <p style="color: var(--muted);">It has been submitted for moderation and will appear soon.</p>
          <button class="btn btn-outline" onclick="document.getElementById('review-success').style.display='none'; document.getElementById('write-review-btn').style.display='block';" style="margin-top:1.5rem">Close</button>
        </div>
      </div>

      <div class="rating-breakdown" id="rating-breakdown" style="display:none">
        <div class="breakdown-row" data-stars="5" style="cursor:pointer">
          <div class="breakdown-label">★ 5</div>
          <div class="breakdown-bar"><div class="breakdown-progress" style="width: 98%;"></div></div>
          <div class="breakdown-count">2.1K Reviews</div>
        </div>
        <div class="breakdown-row" data-stars="4" style="cursor:pointer">
          <div class="breakdown-label">★ 4</div>
          <div class="breakdown-bar"><div class="breakdown-progress" style="width: 2%;"></div></div>
          <div class="breakdown-count">34 Reviews</div>
        </div>
        <div class="breakdown-row" data-stars="3" style="cursor:pointer">
          <div class="breakdown-label">★ 3</div>
          <div class="breakdown-bar"><div class="breakdown-progress" style="width: 0.5%;"></div></div>
          <div class="breakdown-count">1 Reviews</div>
        </div>
        <div class="breakdown-row" data-stars="2" style="cursor:pointer">
          <div class="breakdown-label">★ 2</div>
          <div class="breakdown-bar"><div class="breakdown-progress" style="width: 0.1%;"></div></div>
          <div class="breakdown-count">2 Reviews</div>
        </div>
        <div class="breakdown-row" data-stars="1" style="cursor:pointer">
          <div class="breakdown-label">★ 1</div>
          <div class="breakdown-bar"><div class="breakdown-progress" style="width: 0%;"></div></div>
          <div class="breakdown-count">0 Reviews</div>
        </div>
      </div>

      <div class="reviews-masonry" id="reviews-grid">
        <!-- Review 1 -->
        <div class="review-card" data-stars="5">
          <div class="review-img" style="background-image: url('https://cdn.shopify.com/s/files/1/0462/6808/8473/files/DSC01640_70405c77-7f0f-46ff-ba38-61e4f029f23d.jpg');"></div>
          <div class="review-body">
            <div class="stars">★★★★★</div>
            <span class="review-date">2 weeks ago</span>
            <h4>Wonderful!- stunning!</h4>
            <p>Love my new rug! Worth every penny. The colors are beautiful true to siz...SHOW MORE</p>
            <div class="review-author">Nilsa H. <span class="verified">✓</span></div>
            <div class="review-loc">East Meadow, NY</div>
            <div class="review-product">
               <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/15342.jpg" />
               <span>Product: 9x9 Red Round B...</span>
            </div>
          </div>
        </div>
        <!-- Review 2 -->
        <div class="review-card" data-stars="5">
          <div class="review-img" style="background-image: url('https://cdn.shopify.com/s/files/1/0462/6808/8473/files/118114.jpg');"></div>
          <div class="review-body">
            <div class="stars">★★★★★</div>
            <span class="review-date">1 month ago</span>
            <h4>Great runners</h4>
            <p>While somewhat hard to find to matching runners, finally found two and t...SHOW MORE</p>
            <div class="review-author">paul B. <span class="verified">✓</span></div>
            <div class="review-loc">Lewes, DE</div>
            <div class="review-product">
               <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/119692.jpg" />
               <span>Product: 9 ft Blueish Gr...</span>
            </div>
          </div>
        </div>
        <!-- Review 3 -->
        <div class="review-card" data-stars="5">
          <div class="review-img" style="background-image: url('https://cdn.shopify.com/s/files/1/0462/6808/8473/files/15779.jpg');"></div>
          <div class="review-body">
            <div class="stars">★★★★★</div>
            <span class="review-date">1 month ago</span>
            <h4>Fantastic!</h4>
            <p>Great color, quick delivery, nice weight and construction- seems very du...SHOW MORE</p>
            <div class="review-author">paul B. <span class="verified">✓</span></div>
            <div class="review-loc">Lewes, DE</div>
            <div class="review-product">
               <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/15779.jpg" />
               <span>Product: 9 ft Blueish Gr...</span>
            </div>
          </div>
        </div>
        <!-- Review 4 -->
        <div class="review-card" data-stars="5">
          <div class="review-img" style="background-image: url('https://cdn.shopify.com/s/files/1/0462/6808/8473/files/15665.jpg');"></div>
          <div class="review-body">
            <div class="stars">★★★★★</div>
            <span class="review-date">2 months ago</span>
            <h4>This rug is so beautiful!!</h4>
            <p>I was very nervous purchasing a hand knotted rug online. Normally, I try...SHOW MORE</p>
            <div class="review-author">Erica A. <span class="verified">✓</span></div>
            <div class="review-loc">Minneapolis, MN</div>
            <div class="review-product">
               <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/15665.jpg" />
               <span>Product: 9x12 Muted Dark...</span>
            </div>
          </div>
        </div>
        <!-- Review 5 -->
        <div class="review-card" data-stars="4">
          <div class="review-img" style="background-image: url('https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=600');"></div>
          <div class="review-body">
            <div class="stars">★★★★☆</div>
            <span class="review-date">3 months ago</span>
            <h4>Excellent Quality</h4>
            <p>The texture is amazing. A bit darker than the photos but still looks very premium in our living room.</p>
            <div class="review-author">Mark S. <span class="verified">✓</span></div>
            <div class="review-loc">Austin, TX</div>
            <div class="review-product">
               <img src="https://yildizrugs.com/cdn/shop/files/iap_640x640.3380784956_9clqhmq6.jpg?v=1681684845" />
               <span>Product: 8x10 Tribal Rug</span>
            </div>
          </div>
        </div>
        <!-- Review 6 -->
        <div class="review-card" data-stars="5">
          <div class="review-img" style="background-image: url('https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&q=80&w=600');"></div>
          <div class="review-body">
            <div class="stars">★★★★★</div>
            <span class="review-date">4 months ago</span>
            <h4>Perfect for the bedroom</h4>
            <p>So soft underfoot! The Mamluk pattern is even more intricate in person. Highly recommend Veloura.</p>
            <div class="review-author">Sarah J. <span class="verified">✓</span></div>
            <div class="review-loc">Seattle, WA</div>
            <div class="review-product">
               <img src="https://yildizrugs.com/cdn/shop/files/iap_640x640.3841327727_fmmuw1y1.jpg?v=1681685024" />
               <span>Product: 5x7 Mamluk Blue</span>
            </div>
          </div>
        </div>
        <!-- Review 7 -->
        <div class="review-card" data-stars="3">
          <div class="review-img" style="background-image: url('https://yildizrugs.com/cdn/shop/files/IMG_6090.jpg?v=1737405628');"></div>
          <div class="review-body">
            <div class="stars">★★★☆☆</div>
            <span class="review-date">5 months ago</span>
            <h4>Decent Rug</h4>
            <p>The rug is good, but shipping took 2 days longer than expected. The quality of the wool is undeniable though.</p>
            <div class="review-author">David K. <span class="verified">✓</span></div>
            <div class="review-loc">Chicago, IL</div>
            <div class="review-product">
               <img src="https://yildizrugs.com/cdn/shop/files/IMG_6090.jpg?v=1737405628" />
               <span>Product: 6x9 Oushak Rug</span>
            </div>
          </div>
        </div>
        <!-- Review 8 -->
        <div class="review-card" data-stars="5">
          <div class="review-img" style="background-image: url('https://yildizrugs.com/cdn/shop/files/iap_640x640.3841327727_fmmuw1y1.jpg?v=1681685024');"></div>
          <div class="review-body">
            <div class="stars">★★★★★</div>
            <span class="review-date">6 months ago</span>
            <h4>Heritage in my home</h4>
            <p>You can tell this is handmade. The slight variations make it feel one-of-a-kind. I'm already eyeing my next purchase.</p>
            <div class="review-author">Linda M. <span class="verified">✓</span></div>
            <div class="review-loc">Dallas, TX</div>
            <div class="review-product">
               <img src="https://yildizrugs.com/cdn/shop/files/iap_640x640.3841327727_fmmuw1y1.jpg?v=1681685024" />
               <span>Product: 10x14 Traditional</span>
            </div>
          </div>
        </div>
        <!-- Review 9 -->
        <div class="review-card" data-stars="4">
          <div class="review-img" style="background-image: url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600');"></div>
          <div class="review-body">
            <div class="stars">★★★★☆</div>
            <span class="review-date">7 months ago</span>
            <h4>Beautiful Colors</h4>
            <p>The vegetable dyes give it such a natural look. It fits perfectly with our modern decor.</p>
            <div class="review-author">James R. <span class="verified">✓</span></div>
            <div class="review-loc">Portland, OR</div>
            <div class="review-product">
               <img src="https://yildizrugs.com/cdn/shop/files/iap_640x640.3380784956_9clqhmq6.jpg?v=1681684845" />
               <span>Product: 9x12 Transitional</span>
            </div>
          </div>
        </div>
      </div>

      <div class="explore-center">
        <button class="btn btn-gold" style="animation: none; margin-top: 2rem;">Show more</button>
      </div>
    </section>
  ` : '';

  container.innerHTML = `
    <section class="hero">
      <div class="hero-img"></div>
      <div class="hero-overlay">
        <div class="hero-content">
          <span class="hero-label">NEW ARRIVALS</span>
          <h1>Artistry and History in Every Knot</h1>
          <p>Explore our curated collection of authentic, hand-knotted vintage rugs from the heart of the East.</p>
          <div class="hero-btns">
            <a href="#/collection/all-rugs" class="btn btn-gold">Shop Collection</a>
            <a href="#/about" class="btn btn-outline-white">Our Story</a>
          </div>
        </div>
      </div>
    </section>

    <div class="trust-bar">
      <div class="trust-inner">
        <div class="trust-item">
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          Free Shipping on Orders Over $300
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          30-Day Return Policy
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Delivered in 5–7 Business Days
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Secure &amp; Safe Checkout
        </div>
      </div>
    </div>

    <section class="section">
      <div class="section-header">
        <h2>Featured Collections</h2>
        <a href="#/collections" class="view-all">View All Collections →</a>
      </div>
      <div class="collections-grid">
        <div class="coll-card" onclick="window.location.hash='#/collection/traditional'">
          <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/14453.jpg" alt="Traditional Rugs" />
          <div class="coll-card-overlay">
            <span class="coll-card-label">Traditional</span>
          </div>
        </div>
        <div class="coll-card" onclick="window.location.hash='#/collection/modern'">
          <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/118114.jpg" alt="Modern Rugs" />
          <div class="coll-card-overlay">
            <span class="coll-card-label">Modern</span>
          </div>
        </div>
        <div class="coll-card" onclick="window.location.hash='#/collection/mamluk'">
          <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/il_fullxfull.6368037360_oclm.jpg" alt="Mamluk Rugs" />
          <div class="coll-card-overlay">
            <span class="coll-card-label">Mamluk</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--cream);">
      <div class="section-header">
        <h2>Hand-Picked For You</h2>
        <a href="#/collection/all-rugs" class="view-all">Shop All →</a>
      </div>
      <div class="products-grid">
        ${featured.map((p, i) => renderProductCard(p, i)).join('')}
      </div>
    </section>

    <section class="section about-preview">
      <div class="about-wrap">
        <div class="about-img">
          <img src="https://yildizrugs.com/cdn/shop/files/1e37e0b9-5d19-4004-ad32-c499a99ed0f5.jpg?v=1681702590" alt="About Veloura Rugs" />
        </div>
        <div class="about-text">
          <h2>Veloura Rugs</h2>
          <p>Our rug production operations are centered in Northern Afghanistan, and our artisanal weavers exclusively hail from the Turkmen tribe — an indigenous community of the region renowned for their centuries-old tradition of handcrafting extraordinary rugs.</p>
          <div class="about-stats">
            <div class="stat">
              <div class="stat-num">500+</div>
              <div class="stat-label">Unique Designs</div>
            </div>
            <div class="stat">
              <div class="stat-num">100%</div>
              <div class="stat-label">Handmade</div>
            </div>
          </div>
          <a href="#/about" class="btn btn-outline-green">Our Story</a>
        </div>
      </div>
    </section>

    <section class="newsletter-section" style="background: #000; color: #fff; padding: 3rem 2rem; text-align: center;">
      <div class="newsletter-content" style="max-width: 700px; margin: auto;">
        <h2 style="font-family: var(--ff-body); font-size: 2.2rem; font-weight: 400; margin-bottom: 1.2rem; letter-spacing: 0.02em;">Sign up and save</h2>
        <p style="opacity: 1; margin-bottom: 2.5rem; font-size: 0.95rem; font-weight: 300;">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        
        <div id="newsletter-form" style="position: relative; max-width: 500px; margin: 0 auto; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 6px; display: flex; align-items: center;">
          <input type="email" id="newsletter-email" placeholder="Your Email" 
            style="flex: 1; background: transparent; border: none; color: #fff; padding: 8px 0; outline: none; font-size: 0.9rem; font-family: var(--ff-body); opacity: 0.6;" />
          <button id="newsletter-btn" style="background: transparent; border: none; color: #fff; font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px; padding: 0 5px;">
            Subscribe <span style="font-size: 1.1rem; line-height: 1;">↗</span>
          </button>
        </div>

        <div id="newsletter-success" style="display:none; margin-top: 2rem;">
          <h3 style="color: #fff; font-weight: 400;">Thank you for subscribing!</h3>
        </div>
      </div>
    </section>

    ${reviewsSectionHtml}
  `;

  // --- Interactivity ---
  setupHomeEvents(loggedIn);
}

function setupHomeEvents(loggedIn) {
  // Newsletter Logic
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterBtn = document.getElementById('newsletter-btn');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterForm = document.getElementById('newsletter-form');

  newsletterBtn?.addEventListener('click', () => {
    if (newsletterEmail?.value) {
      newsletterForm.style.display = 'none';
      newsletterSuccess.style.display = 'block';
      newsletterEmail.value = '';
    }
  });

  if (loggedIn) {
    // Review Breakdown Toggle
    const ratingSummary = document.getElementById('rating-summary-toggle');
    const ratingBreakdown = document.getElementById('rating-breakdown');
    const ratingChevron = document.getElementById('rating-chevron');

    ratingSummary?.addEventListener('click', () => {
      const isHidden = ratingBreakdown.style.display === 'none';
      ratingBreakdown.style.display = isHidden ? 'block' : 'none';
      if (ratingChevron) {
        ratingChevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });

    // Write a Review Form Toggle
    const writeReviewBtn = document.getElementById('write-review-btn');
    const reviewFormContainer = document.getElementById('review-form-container');
    const cancelReview = document.getElementById('cancel-review');

    writeReviewBtn?.addEventListener('click', () => {
      reviewFormContainer.style.display = 'block';
      writeReviewBtn.style.display = 'none';
    });

    cancelReview?.addEventListener('click', () => {
      reviewFormContainer.style.display = 'none';
      writeReviewBtn.style.display = 'block';
    });

    // Star Rating Selection
    const starInput = document.getElementById('star-rating-input');
    const ratingVal = document.getElementById('rating-val');
    starInput?.querySelectorAll('span').forEach(star => {
      star.addEventListener('click', () => {
        const val = star.getAttribute('data-val');
        ratingVal.value = val;
        starInput.querySelectorAll('span').forEach(s => {
          s.classList.toggle('active', s.getAttribute('data-val') <= val);
        });
      });
    });

    // Review Submission
    const reviewForm = document.getElementById('review-submission-form');
    const reviewSuccess = document.getElementById('review-success');
    
    reviewForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      reviewForm.style.display = 'none';
      if (reviewSuccess) reviewSuccess.style.display = 'block';
    });

    // Review Filtering
    const breakdownRows = document.querySelectorAll('.breakdown-row');
    const reviewsGrid = document.getElementById('reviews-grid');
    const reviewCards = document.querySelectorAll('.review-card');

    breakdownRows.forEach(row => {
      row.addEventListener('click', () => {
        const stars = row.getAttribute('data-stars');
        let found = false;

        reviewCards.forEach(card => {
          if (card.getAttribute('data-stars') === stars) {
            card.style.display = 'block';
            found = true;
          } else {
            card.style.display = 'none';
          }
        });

        const existingNoMatch = document.getElementById('no-reviews-msg');
        if (!found) {
          if (!existingNoMatch) {
            const msg = document.createElement('p');
            msg.id = 'no-reviews-msg';
            msg.textContent = `No reviews found for ${stars} star rating.`;
            msg.style.padding = '3rem';
            msg.style.textAlign = 'center';
            msg.style.width = '100%';
            msg.style.color = 'var(--muted)';
            reviewsGrid.appendChild(msg);
          }
        } else if (existingNoMatch) {
          existingNoMatch.remove();
        }
      });
    });
  }
}

export function renderProductCard(product, index = 0) {
  const validImages = (product.images || []).filter(img => img && img.trim() !== '' && !img.includes('15343.jpg'));
  
  // Use a reliable placeholder if no valid image is found, especially for Rug Pads
  let imgSrc = validImages[0];
  if (!imgSrc) {
    if (product.collections && product.collections.includes('rug-pads')) {
       imgSrc = 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=400';
    } else {
       imgSrc = 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=400';
    }
  }
  
  const hoverImgSrc = validImages[1] || imgSrc;
  const priceSale = product.price ? product.price.toLocaleString('en-US', {minimumFractionDigits: 2}) : '0.00';
  const priceOrig = product.comparePrice ? product.comparePrice.toLocaleString('en-US', {minimumFractionDigits: 2}) : null;
  const isSale = !!product.comparePrice;

  return `
    <div class="product-card" onclick="window.location.hash='#/product/${product.slug}'" style="animation-delay: ${index * 0.05}s">
      <div class="product-img">
        <img class="main-img" src="${imgSrc}" alt="${product.title}" />
        <img class="hover-img" src="${hoverImgSrc}" alt="${product.title}" />
        ${isSale ? '<span class="product-badge">SALE</span>' : ''}
        <div class="product-actions">
          <button class="action-btn wishlist-toggle" title="Wishlist" 
            onclick="event.stopPropagation(); window.toggleWishlist('${product.id}');">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
          <button class="action-btn" title="Quick View" onclick="event.stopPropagation(); window.openQuickView('${product.id}');">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
      <div class="product-body">
        <p class="product-vendor">Veloura Rugs</p>
        <h3 class="product-name">${product.title}</h3>
        <div class="product-price">
          <span class="price-sale">$${priceSale}</span>
          ${priceOrig ? `<span class="price-orig">$${priceOrig}</span>` : ''}
        </div>
        <button class="product-cta" onclick="event.stopPropagation(); window.location.hash='#/product/${product.slug}'">View Full Details</button>
      </div>
    </div>
  `;
}
