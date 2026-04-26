(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();const le=[];let he=null;function T(e,t){le.push({pattern:e,handler:t})}function W(e){window.location.hash=e}function fe(){return(window.location.hash.slice(1)||"/").split("?")[0]}function ye(e){for(const t of le){const s=t.pattern,o="^"+s.replace(/:[^/]+/g,"([^/]+)")+"$",i=new RegExp(o),a=e.match(i);if(a){const r={};return(s.match(/:[^/]+/g)||[]).map(l=>l.slice(1)).forEach((l,p)=>{r[l]=decodeURIComponent(a[p+1])}),{handler:t.handler,params:r}}}return null}function Z(){try{const e=fe(),t=document.getElementById("main-content");window.scrollTo(0,0),setTimeout(()=>window.scrollTo(0,0),10);const s=ye(e);s?(s.handler(t,s.params),setTimeout(()=>window.scrollTo(0,0),100)):he||(t.innerHTML='<div class="section" style="text-align:center;padding:100px 20px;"><h1>Page Not Found</h1><p>The page you are looking for does not exist.</p><a href="#/" class="btn btn--primary" style="margin-top:20px;">Go Home</a></div>')}catch(e){console.error("Routing Error:",e),alert(`Routing Error:
`+e.message+`

Stack:
`+e.stack)}}function we(){window.addEventListener("hashchange",Z),document.addEventListener("click",e=>{var s;const t=e.target.closest("a");t&&((s=t.getAttribute("href"))!=null&&s.startsWith("#"))&&(window.scrollTo(0,0),t.getAttribute("href")===window.location.hash&&Z())}),window.location.hash?Z():window.location.hash="#/"}let ce=null;function oe(e){ce=e}function D(){return ce}const I={CART:"veloura_cart",WISHLIST:"veloura_wishlist",USER:"veloura_user",CONTACTS:"veloura_contacts",ORDERS:"veloura_orders"};function de(){const e=U();if(!e)return[];const t=O(I.ORDERS)||[];let s=!1;const o=t.filter(i=>i.userId===e.id);return o.forEach(i=>{if(i.status!=="Delivered"&&i.timestamp){const a=Date.now()-i.timestamp;a>=6e4?(i.status="Delivered",s=!0):a>=1e4&&i.status==="Processing"&&(i.status="Shipped",s=!0)}}),s&&A(I.ORDERS,t),o}function be(e){const t=U();if(!t)return[];const s=O(I.ORDERS)||[];return e.timestamp||(e.timestamp=Date.now()),e.userId=t.id,s.unshift(e),A(I.ORDERS,s),s}function ae(e,t){const s=de(),o=s.find(i=>i.id===e);o&&(o.status=t,A(I.ORDERS,s))}function O(e){try{return JSON.parse(localStorage.getItem(e))||null}catch{return null}}function A(e,t){localStorage.setItem(e,JSON.stringify(t))}function N(){return O(I.CART)||[]}function ke(e,t=1){const s=N(),o=s.find(i=>i.id===e.id);return o?o.qty+=t:s.push({...e,qty:t}),A(I.CART,s),ie(),s}function Ee(e,t){let s=N();if(t<=0)s=s.filter(o=>o.id!==e);else{const o=s.find(i=>i.id===e);o&&(o.qty=t)}return A(I.CART,s),ie(),s}function xe(e){const t=N().filter(s=>s.id!==e);return A(I.CART,t),ie(),t}function te(){return N().reduce((e,t)=>e+t.price*t.qty,0)}function X(){return N().reduce((e,t)=>e+t.qty,0)}function ie(){const e=document.getElementById("cart-count");e&&(e.textContent=X())}function G(){return O(I.WISHLIST)||[]}function ue(e){const t=G(),s=t.findIndex(o=>o.id===e.id);return s>-1?t.splice(s,1):t.push(e),A(I.WISHLIST,t),se(),t}function Se(e){const t=G().filter(s=>s.id!==e);return A(I.WISHLIST,t),se(),t}function Le(){return G().length}function se(){const e=document.getElementById("wishlist-count");e&&(e.textContent=Le())}function re(e){return G().some(t=>t.id===e)}function Q(){return document.cookie.includes("veloura_session=true")}function U(){return Q()?O(I.USER):null}function Ie(e,t){const o=(O("veloura_accounts")||[]).find(i=>i.email===e&&i.password===t);if(o){A(I.USER,o);const i=new Date;return i.setTime(i.getTime()+720*60*60*1e3),document.cookie=`veloura_session=true; expires=${i.toUTCString()}; path=/`,{success:!0,user:o}}return{success:!1,error:"Invalid email or password"}}function _e(e){const t=O("veloura_accounts")||[];if(t.find(i=>i.email===e.email))return{success:!1,error:"Email already registered"};const s={...e,id:Date.now().toString()};t.push(s),A("veloura_accounts",t),A(I.USER,s);const o=new Date;return o.setTime(o.getTime()+720*60*60*1e3),document.cookie=`veloura_session=true; expires=${o.toUTCString()}; path=/`,{success:!0,user:s}}function Ce(){localStorage.removeItem(I.USER),document.cookie="veloura_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"}function $e(e){const t=U();if(!t)return null;const s={...t,...e};A(I.USER,s);const o=O("veloura_accounts")||[],i=o.findIndex(a=>a.id===t.id);return i>-1&&(o[i]=s,A("veloura_accounts",o)),s}function Be(e){const t=O(I.CONTACTS)||[];t.push({...e,date:new Date().toISOString()}),A(I.CONTACTS,t)}function pe(e){var c;const t=D(),s=Q(),o=[],i=new Set,a=((c=t==null?void 0:t.products)==null?void 0:c.filter(l=>l.featured))||[];for(const l of a)if(i.has(l.title)||(o.push(l),i.add(l.title)),o.length===4)break;if(o.length<4){const l=(t==null?void 0:t.products)||[];for(const p of l)if(i.has(p.title)||(o.push(p),i.add(p.title)),o.length===4)break}const r=s?`
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
  `:"";e.innerHTML=`
    <section class="hero">
      <div class="hero-img"></div>
      <div class="hero-overlay">
        <div class="hero-content">
          <span class="hero-label">NEW ARRIVALS</span>
          <h1>Artistry Carpets & Rugs</h1>
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
          Free Shipping on Orders Over ${window.formatPrice(300)}
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
        ${o.map((l,p)=>J(l,p)).join("")}
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

    ${r}
  `,Ae(s)}function Ae(e){const t=document.getElementById("newsletter-email"),s=document.getElementById("newsletter-btn"),o=document.getElementById("newsletter-success"),i=document.getElementById("newsletter-form");if(s==null||s.addEventListener("click",()=>{t!=null&&t.value&&(i.style.display="none",o.style.display="block",t.value="")}),e){const a=document.getElementById("rating-summary-toggle"),r=document.getElementById("rating-breakdown"),c=document.getElementById("rating-chevron");a==null||a.addEventListener("click",()=>{const y=r.style.display==="none";r.style.display=y?"block":"none",c&&(c.style.transform=y?"rotate(180deg)":"rotate(0deg)")});const l=document.getElementById("write-review-btn"),p=document.getElementById("review-form-container"),d=document.getElementById("cancel-review");l==null||l.addEventListener("click",()=>{p.style.display="block",l.style.display="none"}),d==null||d.addEventListener("click",()=>{p.style.display="none",l.style.display="block"});const v=document.getElementById("star-rating-input"),h=document.getElementById("rating-val");v==null||v.querySelectorAll("span").forEach(y=>{y.addEventListener("click",()=>{const u=y.getAttribute("data-val");h.value=u,v.querySelectorAll("span").forEach(g=>{g.classList.toggle("active",g.getAttribute("data-val")<=u)})})});const L=document.getElementById("review-submission-form"),q=document.getElementById("review-success");L==null||L.addEventListener("submit",y=>{y.preventDefault(),L.style.display="none",q&&(q.style.display="block")});const M=document.querySelectorAll(".breakdown-row"),R=document.getElementById("reviews-grid"),C=document.querySelectorAll(".review-card");M.forEach(y=>{y.addEventListener("click",()=>{const u=y.getAttribute("data-stars");let g=!1;C.forEach(w=>{w.getAttribute("data-stars")===u?(w.style.display="block",g=!0):w.style.display="none"});const S=document.getElementById("no-reviews-msg");if(g)S&&S.remove();else if(!S){const w=document.createElement("p");w.id="no-reviews-msg",w.textContent=`No reviews found for ${u} star rating.`,w.style.padding="3rem",w.style.textAlign="center",w.style.width="100%",w.style.color="var(--muted)",R.appendChild(w)}})})}}function J(e,t=0){const s=(e.images||[]).filter(l=>l&&l.trim()!==""&&!l.includes("15343.jpg"));let o=s[0];o||(e.collections&&e.collections.includes("rug-pads")?o="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=400":o="https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=400");const i=s[1]||o,a=e.price?window.formatPrice(e.price):"0.00",r=e.comparePrice?window.formatPrice(e.comparePrice):null,c=!!e.comparePrice;return`
    <div class="product-card" onclick="window.location.hash='#/product/${e.slug}'" style="animation-delay: ${t*.05}s">
      <div class="product-img">
        <img class="main-img" src="${o}" alt="${e.title}" />
        <img class="hover-img" src="${i}" alt="${e.title}" />
        ${c?'<span class="product-badge">SALE</span>':""}
        <div class="product-actions">
          <button class="action-btn wishlist-toggle" title="Wishlist" 
            onclick="event.stopPropagation(); window.toggleWishlist('${e.id}');">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
          <button class="action-btn" title="Quick View" onclick="event.stopPropagation(); window.openQuickView('${e.id}');">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
      <div class="product-body">
        <p class="product-vendor">Veloura Rugs</p>
        <h3 class="product-name">${e.title}</h3>
        <div class="product-price">
          <span class="price-sale">${a}</span>
          ${r?`<span class="price-orig">${r}</span>`:""}
        </div>
        <button class="product-cta" onclick="event.stopPropagation(); window.location.hash='#/product/${e.slug}'">View Full Details</button>
      </div>
    </div>
  `}const Y=[["#8B4513","#D2691E","#CD853F","#DEB887"],["#800020","#A0522D","#BC8F8F","#F4A460"],["#2F4F4F","#556B2F","#8FBC8F","#BDB76B"],["#191970","#4169E1","#6495ED","#B0C4DE"],["#8B0000","#B22222","#CD5C5C","#E9967A"],["#006400","#228B22","#32CD32","#90EE90"],["#4B0082","#6A5ACD","#9370DB","#D8BFD8"],["#B8860B","#DAA520","#FFD700","#FAFAD2"]];function ne(e,t=0){(!e||!Array.isArray(e)||e.length<4)&&(e=Y[0]);const[s,o,i,a]=e,r=[`<rect width="300" height="400" fill="${a}"/>
     <rect x="20" y="20" width="260" height="360" fill="${s}" rx="2"/>
     <rect x="40" y="40" width="220" height="320" fill="${o}" rx="2"/>
     <ellipse cx="150" cy="200" rx="70" ry="90" fill="${i}"/>
     <ellipse cx="150" cy="200" rx="40" ry="55" fill="${s}"/>
     <ellipse cx="150" cy="200" rx="15" ry="20" fill="${a}"/>
     <rect x="60" y="50" width="180" height="10" fill="${i}" opacity="0.5"/>
     <rect x="60" y="340" width="180" height="10" fill="${i}" opacity="0.5"/>`,`<rect width="300" height="400" fill="${s}"/>
     <polygon points="150,40 260,200 150,360 40,200" fill="${o}" opacity="0.7"/>
     <polygon points="150,80 230,200 150,320 70,200" fill="${i}" opacity="0.6"/>
     <polygon points="150,120 200,200 150,280 100,200" fill="${a}" opacity="0.8"/>
     <line x1="0" y1="60" x2="300" y2="60" stroke="${i}" stroke-width="3"/>
     <line x1="0" y1="340" x2="300" y2="340" stroke="${i}" stroke-width="3"/>`,`<rect width="300" height="400" fill="${o}"/>
     <rect x="15" y="15" width="270" height="370" fill="none" stroke="${s}" stroke-width="8"/>
     <rect x="30" y="30" width="240" height="340" fill="${a}" opacity="0.3"/>
     <rect x="30" y="30" width="240" height="340" fill="none" stroke="${i}" stroke-width="3"/>
     <circle cx="150" cy="200" r="60" fill="${s}" opacity="0.5"/>
     <circle cx="150" cy="200" r="35" fill="${i}" opacity="0.5"/>
     <circle cx="150" cy="200" r="12" fill="${a}"/>`,`<rect width="300" height="400" fill="${a}"/>
     ${[0,1,2,3,4,5,6,7].map(c=>`<rect x="0" y="${c*50}" width="300" height="25" fill="${c%2===0?s:o}" opacity="0.6"/>`).join("")}
     <rect x="100" y="100" width="100" height="200" fill="${i}" opacity="0.4"/>
     <rect x="120" y="130" width="60" height="140" fill="${s}" opacity="0.3"/>`];return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">${r[t%r.length]}</svg>`)}`}function qe(e){const t=D(),o=((t==null?void 0:t.collections)||[]).filter(i=>i.type==="size");e.innerHTML=`
    <div class="collections-page">
      <div class="collections-header">
        <h1>Our Collections</h1>
        <p>Explore our curated selections of hand-knotted artistry, categorized by size and style.</p>
      </div>

      <div class="collections-page-grid">
          ${o.map((i,a)=>{var d,v;let r=((d=t==null?void 0:t.products)==null?void 0:d.filter(h=>h.size===i.name||h.collections&&h.collections.includes(i.slug)))||[];r.length===0&&(r=((v=t==null?void 0:t.products)==null?void 0:v.filter(h=>h.images&&h.images.length>0))||[]);const c=a%r.length,l=r.length>0?r[c].images[0]:"images/Poster_2.png",p=i.image||l;return`
              <a href="#/collection/${i.slug}" class="collections-page-card">
                <div class="collections-page-card__bg" style="background-image:url('${p}');">
                  <div class="collections-page-card__overlay"></div>
                </div>
                <div class="collections-page-card__content">
                  <span class="collections-page-card__label">${i.name}</span>
                  <span class="collections-page-card__action">Explore Collection →</span>
                </div>
              </a>
            `}).join("")}
      </div>
    </div>

  `}function Re(e,t){var j;const s=t.slug,o=D(),i=(o==null?void 0:o.products)||[],r=((o==null?void 0:o.collections)||[]).find(n=>n.slug===s);let c=r?r.name:s.replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase());c=c.replace(/\s+Collection$/i,"");const p=(r==null?void 0:r.image)||"https://yildizrugs.com/cdn/shop/files/121029_05c359a6-8b8f-4c29-a30c-2b8f6b2ae814.jpg?v=1737569984&width=3840";let d=[];if(s==="all-rugs"?d=i.filter(n=>n.style!=="Rug Pads"):s==="clearance"?d=i.filter(n=>n.onSale||n.collections&&n.collections.includes("clearance")):s==="rug-pads"?d=i.filter(n=>n.style==="Rug Pads"):d=i.filter(n=>n.collections&&n.collections.includes(s)),(r==null?void 0:r.type)==="color"){const n=r.name;d=i.filter(b=>{var f;return((f=b.color)==null?void 0:f.toLowerCase())===n.toLowerCase()})}d.length===0&&!["all-rugs","clearance","rug-pads"].includes(s)&&(d=i.slice(0,12)),[...new Set(i.map(n=>n.style))].filter(Boolean),[...new Set(i.map(n=>n.size))].filter(Boolean),[...new Set(i.map(n=>n.color))].filter(Boolean),[...new Set(d.map(n=>n.style))].filter(Boolean),[...new Set(d.map(n=>n.size))].filter(Boolean),[...new Set(d.map(n=>n.color))].filter(Boolean),e.innerHTML=`
    <!-- Collection Banner -->
    <div class="collection-banner" style="background-image: url('${p}');">
      <h1>${c}</h1>
    </div>


    <div class="collection-layout">
      <!-- Sidebar Filters -->
      <div class="filters-overlay" id="filters-overlay"></div>
      <aside class="filters">
        <div class="filters-mobile-header">
          <h3>Filters</h3>
          <button id="filters-close">&times;</button>
        </div>
        <div class="filter-group">

          <div class="filter-group__header">
            <span class="filter-group__title">COLLECTIONS</span>
            <button class="filter-group__reset" id="reset-collections">Reset</button>
          </div>
          <div class="filter-group__items" id="filter-collections">
            ${["Clearance","Flat Weave Kilims","Mamluk","Modern","Moroccan","Rug Pads","Traditional","Transitional","Tribal","Turkish Oushak","Vintage"].map(n=>`<a href="#/collection/${n.toLowerCase().replace(/\s+/g,"-")}" ${c.toLowerCase().includes(n.toLowerCase())?'class="active"':""}>${n}</a>`).join("")}
          </div>
        </div>
        
        <div class="filter-group">
          <div class="filter-group__header">
            <span class="filter-group__title">SIZES</span>
            <button class="filter-group__reset" id="reset-sizes">Reset</button>
          </div>
          <div class="filter-group__items" id="filter-sizes">
            ${["3x5","4x6","5x7","6x9","7x10","8x10 - 8x11","9x12","10x14 - 10x13","12x15 - 12x18","Runner","Square & Circle","Gallery Size Rugs"].map(n=>`<a href="javascript:void(0)" class="size-filter" data-size="${n}">${n}</a>`).join("")}
          </div>
        </div>

        <div class="filter-group">
          <div class="filter-group__header">
            <span class="filter-group__title">COLORS</span>
            <button class="filter-group__reset" id="reset-colors">Reset</button>
          </div>
          <div class="filter-group__items" id="filter-colors">
            ${["Beige","Black","Blue","Brown","Gold","Green","Grey","Multicolor","Orange","Pink","Purple","Red"].map(n=>`<a href="javascript:void(0)" class="color-filter" data-color="${n}">${n}</a>`).join("")}
          </div>
        </div>

        <div class="filter-group">
          <div class="filter-group__header">
            <span class="filter-group__title">PRICE</span>
            <button class="filter-group__reset" id="reset-price">Reset</button>
          </div>
          <div class="price-range">
            <span>From</span>
            <input type="number" id="price-from" value="0" min="0" placeholder="0" />
            <span>-</span>
            <span>To</span>
            <input type="number" id="price-to" value="25000" placeholder="25000" />
          </div>
        </div>
      </aside>

      <!-- Products -->
      <div class="collection-products">
        <div class="collection-toolbar">
          <button class="filter-toggle-btn" id="filter-toggle" aria-label="Open Filters">
            <div class="hamburger-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>Filters</span>
          </button>
          <span class="collection-toolbar__count">Showing ${d.length} products</span>
          <div class="collection-toolbar__actions">
            <div class="collection-toolbar__view">
              <button class="grid-view-btn active" data-cols="4" title="Grid 4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="3" height="3"/><rect x="5" y="0" width="3" height="3"/><rect x="10" y="0" width="3" height="3"/><rect x="0" y="5" width="3" height="3"/><rect x="5" y="5" width="3" height="3"/><rect x="10" y="5" width="3" height="3"/><rect x="0" y="10" width="3" height="3"/><rect x="5" y="10" width="3" height="3"/><rect x="10" y="10" width="3" height="3"/></svg>
              </button>
              <button class="grid-view-btn" data-cols="2" title="Grid 2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="6" height="6"/><rect x="9" y="0" width="6" height="6"/><rect x="0" y="9" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/></svg>
              </button>
            </div>
            <div class="collection-toolbar__sort">
              <select id="sort-select">
                <option value="best">SORT BY: BEST SELLING</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="name-asc">NAME: A-Z</option>
                <option value="name-desc">NAME: Z-A</option>
              </select>
            </div>
          </div>
        </div>

        <div class="products-grid" id="products-grid"></div>
        <div class="pagination" style="margin-top: 50px;"></div>
      </div>
    </div>
  `;let v=1;const h=16;let L=[...d];function q(){const n=Math.ceil(L.length/h),b=(v-1)*h,f=b+h,E=L.slice(b,f),B=document.getElementById("products-grid");B&&(B.innerHTML=E.length>0?E.map((z,m)=>J(z,m)).join(""):'<div style="text-align:center;padding:60px;color:#999;">No products match your filters.</div>'),M(n);const k=e.querySelector(".collection-toolbar__count");k&&(k.textContent=`Showing ${L.length} products`),window.scrollTo({top:0,behavior:"smooth"})}function M(n){const b=e.querySelector(".pagination");if(!b)return;if(n<=1){b.style.display="none";return}b.style.display="flex";let f="";for(let E=1;E<=n;E++)E===1||E===n||E>=v-1&&E<=v+1?f+=`<button class="page-btn ${E===v?"active":""}" data-page="${E}">${E}</button>`:(E===v-2||E===v+2)&&(f+='<span style="padding:0 8px;">...</span>');b.innerHTML=f,b.querySelectorAll(".page-btn").forEach(E=>{E.addEventListener("click",()=>{v=parseInt(E.dataset.page),q()})})}function R(){var z,m,$,F,H;const n=(z=e.querySelector(".size-filter.active"))==null?void 0:z.dataset.size,b=(m=e.querySelector(".color-filter.active"))==null?void 0:m.dataset.color,f=parseFloat(($=document.getElementById("price-from"))==null?void 0:$.value)||0,E=parseFloat((F=document.getElementById("price-to"))==null?void 0:F.value)||1e5,B=((H=document.getElementById("sort-select"))==null?void 0:H.value)||"best";let k=[...d];switch(n&&(k=k.filter(x=>x.size===n)),b&&(k=k.filter(x=>x.color===b)),k=k.filter(x=>x.price>=f&&x.price<=E),B){case"price-asc":k.sort((x,P)=>x.price-P.price);break;case"price-desc":k.sort((x,P)=>P.price-x.price);break;case"name-asc":k.sort((x,P)=>x.title.localeCompare(P.title));break;case"name-desc":k.sort((x,P)=>P.title.localeCompare(x.title));break}L=k,v=1,q()}q(),e.querySelectorAll(".grid-view-btn").forEach(n=>{n.addEventListener("click",()=>{e.querySelectorAll(".grid-view-btn").forEach(f=>f.classList.remove("active")),n.classList.add("active");const b=document.getElementById("products-grid");n.dataset.cols==="2"?b.classList.add("products-grid--2col"):b.classList.remove("products-grid--2col")})}),(j=document.getElementById("sort-select"))==null||j.addEventListener("change",R),e.querySelectorAll(".size-filter, .color-filter").forEach(n=>{n.addEventListener("click",()=>{const b=n.classList.contains("size-filter"),f=e.querySelectorAll(b?".size-filter":".color-filter"),E=n.classList.contains("active");f.forEach(B=>B.classList.remove("active")),E||n.classList.add("active"),R()})});const C=document.getElementById("price-from"),y=document.getElementById("price-to");[C,y].forEach(n=>n==null?void 0:n.addEventListener("input",R)),e.querySelectorAll(".filter-group__reset").forEach(n=>{n.addEventListener("click",()=>{const b=n.closest(".filter-group");b.querySelectorAll(".active").forEach(f=>f.classList.remove("active")),b.querySelector("input")&&(document.getElementById("price-from").value=0,document.getElementById("price-to").value=25e3),R()})});const u=document.getElementById("filter-toggle"),g=document.querySelector(".filters"),S=document.getElementById("filters-close"),w=document.getElementById("filters-overlay");u&&g&&u.addEventListener("click",()=>{g.classList.add("active"),w&&w.classList.add("active"),document.body.style.overflow="hidden"});const _=()=>{g&&g.classList.remove("active"),w&&w.classList.remove("active"),document.body.style.overflow=""};S&&S.addEventListener("click",_),w&&w.addEventListener("click",_)}function Te(e,t){var q,M,R,C,y;const s=D(),o=(s==null?void 0:s.products)||[],i=o.find(u=>u.slug===t.slug);if(!i){e.innerHTML='<div class="section" style="text-align:center;padding:100px;"><h1>Product Not Found</h1><a href="#/collection/all-rugs" class="btn btn--primary" style="margin-top:20px;">Browse All Rugs</a></div>';return}const a=o.indexOf(i),r=Y[a%Y.length];let c=ne(r,a%4),l=[0,1,2].map(u=>ne(Y[(a+u)%Y.length],(a+u)%4));if(i.images&&i.images.length>0&&i.images[0].startsWith("http")){const u=i.images.filter(g=>g&&g.trim()!==""&&!g.includes("15343.jpg"));u.length>0?(c=u[0],l=u.slice(0,4)):(i.collections&&i.collections.includes("rug-pads")?c="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800":c="https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=800",l=[c])}const p=o.filter(u=>u.id!==i.id&&(u.style===i.style||u.color===i.color)).slice(0,4),d=re(i.id),v=i.description||{};e.innerHTML=`
    <div class="product-detail">
      <!-- Thumbnails -->
      <div class="product-thumbnails">
        ${l.map((u,g)=>`
          <div class="product-thumbnail ${g===0?"active":""}" data-img="${u}" style="background-image:url('${u}');background-size:cover;background-position:center;">
          </div>
        `).join("")}
      </div>

      <!-- Main Image -->
      <div class="product-main-image" id="product-main-img" style="background-image:url('${c}');background-size:cover;background-position:center;">
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <div class="product-info__vendor">VELOURA RUGS</div>
        <h1 class="product-info__title">${i.title}</h1>
        <div class="product-info__sku">${i.sku}</div>
        
        <div class="product-info__prices">
          <span class="product-info__price">${window.formatPrice(i.price)}</span>
          ${i.comparePrice?`<span class="product-info__compare">${window.formatPrice(i.comparePrice)}</span>`:""}
        </div>

        ${i.inStock?'<div class="product-info__stock">⟡ 1 in Stock</div>':'<div class="product-info__stock" style="color:var(--color-sale);">Out of Stock</div>'}

        <div class="product-info__actions">
          <div class="quantity-selector">
            <button id="qty-minus">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="99" />
            <button id="qty-plus">+</button>
          </div>
          <button class="btn btn--dark product-info__add-cart" id="add-to-cart-btn">Add To Cart</button>
        </div>

        <button class="btn btn--primary product-info__wishlist" id="add-wishlist-btn">
          Add to wishlist ${d?"✓":"♥"}
        </button>

        <!-- Description Accordion -->
        <div class="product-accordion">
          <div class="product-accordion__item">
            <button class="product-accordion__header active" data-accordion="desc">
              <span>DESCRIPTION</span>
              <span class="product-accordion__icon">↕</span>
            </button>
            <div class="product-accordion__content active" id="accordion-desc">
              ${Object.entries(v).map(([u,g])=>`<p><strong>${u.replace(/([A-Z])/g," $1").replace(/^./,S=>S.toUpperCase())}:</strong> ${g}</p>`).join("")}
            </div>
          </div>
          <div class="product-accordion__item">
            <button class="product-accordion__header" data-accordion="shipping">
              <span>SHIPPING & RETURNS</span>
              <span class="product-accordion__icon">↓</span>
            </button>
            <div class="product-accordion__content" id="accordion-shipping">
              <p>Free shipping on orders over ${window.formatPrice(300)}. Standard delivery within 5-7 business days.</p>
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
    ${p.length>0?`
    <div class="also-like">
      <h2>You May Also Like</h2>
      <div class="products-grid">
        ${p.map((u,g)=>J(u,o.indexOf(u))).join("")}
      </div>
    </div>
    `:""}
  `;const h=document.getElementById("qty-input");(q=document.getElementById("qty-minus"))==null||q.addEventListener("click",()=>{const u=parseInt(h.value);u>1&&(h.value=u-1)}),(M=document.getElementById("qty-plus"))==null||M.addEventListener("click",()=>{h.value=parseInt(h.value)+1}),(R=document.getElementById("add-to-cart-btn"))==null||R.addEventListener("click",()=>{var g,S;const u=parseInt(h.value)||1;ke({id:i.id,title:i.title,price:i.price,comparePrice:i.comparePrice,slug:i.slug,sku:i.sku},u),(g=document.getElementById("cart-drawer"))==null||g.classList.add("active"),(S=document.getElementById("cart-overlay"))==null||S.classList.add("active"),document.body.classList.add("no-scroll"),renderCartContents()});const L=()=>{ue(i);const u=re(i.id);document.querySelectorAll("#add-wishlist-btn, #add-wishlist-btn-2").forEach(g=>{g.innerHTML=`Add to wishlist ${u?"✓":"♥"}`})};(C=document.getElementById("add-wishlist-btn"))==null||C.addEventListener("click",L),(y=document.getElementById("add-wishlist-btn-2"))==null||y.addEventListener("click",L),e.querySelectorAll(".product-thumbnail").forEach(u=>{u.addEventListener("click",()=>{e.querySelectorAll(".product-thumbnail").forEach(S=>S.classList.remove("active")),u.classList.add("active");const g=document.getElementById("product-main-img");g.style.backgroundImage=`url('${u.dataset.img}')`})}),e.querySelectorAll(".product-accordion__header").forEach(u=>{u.addEventListener("click",()=>{const g=u.dataset.accordion,S=document.getElementById(`accordion-${g}`);u.classList.toggle("active"),S==null||S.classList.toggle("active")})})}function Pe(e){e.innerHTML=`
    <!-- Hero Banner -->
    <div class="about-hero">
      <span class="about-hero__text">VELOURA RUGS</span>
    </div>

    <!-- Main About Section -->
    <div class="about-main">
      <div class="about-main__vertical">Weaving the Tradition and Art of History.</div>
      <div class="about-main__image">
        <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/15342.jpg" alt="Traditional Hand Knotted Rug" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div class="about-main__content">
        <h2>About Us</h2>
        <p>Established in the late 1970s by my Grandfather through the art of rug trading at flea markets, this rug enterprise evolved over the years. By the 1980s, we transitioned to crafting our own distinct rugs, and since that point, it has remained under the dedicated stewardship of successive family members.</p>
        <p>Our operational locus lies in Northern Afghanistan, where we have chosen to collaborate with the Turkmen tribe, a decision that resonates deeply with our commitment to authenticity and heritage.</p>
        <a href="#/collection/all-rugs" class="btn btn--primary">Shop Our Rugs →</a>
      </div>
    </div>

    <!-- Impact Section -->
    <div class="about-impact">
      <h2>Weaving Change: <strong>Empowering Over 2,500 Families</strong></h2>
      <p>Notably, our rug weaving workforce primarily comprises skilled women, each of whom contributes to the weaving process from the comfort of their homes. In lieu of expansive factories, we have opted for a more personalized approach, affording our weavers the flexibility to work in tandem with their own schedules. This approach has engendered a harmonious fusion of tradition and modernity within our production model.</p>
      <p>Significantly, our business impacts over 2500 families, functioning as a linchpin of sustenance for numerous households by providing them with a pivotal income stream through rug weaving — a primary livelihood within these regions.</p>
      <p>These indomitable weavers constitute the cornerstone of our motivation as the third generation at the helm. Their unwavering dedication propels us to meticulously chart our course toward the overarching company goal and vision: to uplift the plight of these underprivileged families by creating employment opportunities and engendering positive change through our enterprise.</p>
      <p>Please reach out to me if you want to know more on the story and This shop is manage and control in California, United States and our production partners ( Parent company ) ship the rugs from Istanbul - Turkey and Lahore - Pakistan.</p>
    </div>
  `}function Me(e){var t;e.innerHTML=`
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
  `,(t=document.getElementById("contact-form"))==null||t.addEventListener("submit",s=>{s.preventDefault();const o=new FormData(s.target),i=Object.fromEntries(o);Be(i),s.target.innerHTML='<div style="text-align:center;padding:40px;"><h3 style="color:var(--color-primary);">Thank you!</h3><p style="margin-top:8px;color:#666;">Your message has been sent. We will get back to you soon.</p></div>'})}function De(e){var t;e.innerHTML=`
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
  `,(t=document.getElementById("login-form"))==null||t.addEventListener("submit",s=>{s.preventDefault();const o=new FormData(s.target),i=Ie(o.get("email"),o.get("password"));if(i.success){const r=new URLSearchParams(window.location.hash.split("?")[1]).get("redirect");W(r==="checkout"?"#/checkout":"#/account")}else{const a=document.getElementById("login-error");a.textContent=i.error,a.style.display="block"}})}function He(e){var t;e.innerHTML=`
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
  `,(t=document.getElementById("register-form"))==null||t.addEventListener("submit",s=>{s.preventDefault();const o=new FormData(s.target),i=_e({firstName:o.get("firstName"),lastName:o.get("lastName"),email:o.get("email"),password:o.get("password")});if(i.success){const r=new URLSearchParams(window.location.hash.split("?")[1]).get("redirect");W(r==="checkout"?"#/checkout":"#/account")}else{const a=document.getElementById("register-error");a.textContent=i.error,a.style.display="block"}})}function Oe(e){var a;const t=U(),s=de();if(!t){W("#/login");return}e.innerHTML=`
    <div class="account-page">
      <div class="account-page__header">
        <h1>Your Account</h1>
        <a href="#" id="logout-btn" class="logout-link">Log Out →</a>
      </div>
      <div class="account-grid">
        <div class="account-orders">
          <h2>Order History</h2>
          ${s.length>0?`
            <div class="orders-list">
              ${s.map(r=>`
                <div class="order-row">
                  <div class="order-id">
                    <span class="label">Order ID</span>
                    <strong>${r.id}</strong>
                  </div>
                  <div class="order-date">
                    <span class="label">Date</span>
                    <strong>${r.date}</strong>
                  </div>
                  <div class="order-total">
                    <span class="label">Total</span>
                    <strong>${window.formatPrice(r.total)}</strong>
                  </div>
                  <div class="order-status">
                    <span class="label">Status</span>
                    <strong class="status-badge ${r.status.toLowerCase()}">${r.status}</strong>
                  </div>
                </div>
              `).join("")}
            </div>
          `:`
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
  `;const o=e.querySelector(".account-details");function i(r=!1){const c=U(),l=o.querySelector(".details-box");r?(l.innerHTML=`
        <form id="edit-address-form" style="display:flex; flex-direction:column; gap:10px;">
          <div class="form-group-mini">
            <label>First Name</label>
            <input type="text" name="firstName" value="${c.firstName||""}" class="form-control-mini">
          </div>
          <div class="form-group-mini">
            <label>Last Name</label>
            <input type="text" name="lastName" value="${c.lastName||""}" class="form-control-mini">
          </div>
          <div class="form-group-mini">
            <label>Email Address</label>
            <input type="email" name="email" value="${c.email||""}" class="form-control-mini">
          </div>
          <div class="form-group-mini">
            <label>Shipping Address</label>
            <input type="text" name="address" value="${c.address||"United States"}" class="form-control-mini">
          </div>
          <div style="display:flex; gap:10px; margin-top:10px;">
            <button type="submit" class="btn btn-gold" style="flex:1; padding:0.6rem;">Save Changes</button>
            <button type="button" id="cancel-edit" class="btn" style="flex:1; padding:0.6rem; background:#eee; color:#333;">Cancel</button>
          </div>
        </form>
      `,document.getElementById("edit-address-form").addEventListener("submit",p=>{p.preventDefault();const d=new FormData(p.target);$e({firstName:d.get("firstName"),lastName:d.get("lastName"),email:d.get("email"),address:d.get("address")}),i(!1)}),document.getElementById("cancel-edit").addEventListener("click",()=>i(!1))):(l.innerHTML=`
        <p class="detail-name"><strong>${c.firstName||"User"} ${c.lastName||""}</strong></p>
        <p class="detail-email">${c.email||""}</p>
        <p class="detail-address">${c.address||"United States"}</p>
        <button id="edit-address-btn" class="btn btn-gold" style="margin-top:20px;padding:0.6rem 1.5rem;">EDIT ADDRESS</button>
      `,document.getElementById("edit-address-btn").addEventListener("click",()=>i(!0)))}i(!1),(a=document.getElementById("logout-btn"))==null||a.addEventListener("click",r=>{r.preventDefault(),Ce(),W("#/login")})}function me(e){const t=U(),s=G(),o=D(),i=(o==null?void 0:o.products)||[];e.innerHTML=`
    <div class="wishlist-page">
      ${t?"":`
        <div class="wishlist-guest">
          <p>You're browsing as a guest. Create an account to save your wishlist permanently.</p>
          <a href="#/register" class="btn btn--primary">Sign up</a>
          <a href="#/login" class="btn btn--outline">Sign in</a>
        </div>
      `}
      
      ${s.length===0?`
        <div class="wishlist-empty">
          <p>No items found. Add some products to wishlist first</p>
        </div>
      `:`
        <div class="products-grid">
          ${s.map((a,r)=>{const c=i.find(l=>l.id===a.id)||a;return`
              <div style="position:relative;">
                ${J(c,r)}
                <button class="btn btn--outline" style="width:100%;margin-top:8px;font-size:12px;" onclick="window.removeWishlistItem('${a.id}')">Remove from Wishlist</button>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `,window.removeWishlistItem=function(a){Se(a),me(e)}}function Fe(e){e.innerHTML=`
    <div class="faq-page">
      <h1>Frequently Asked Questions (FAQs)</h1>
      <div class="product-accordion">
        ${[{q:"Where are your rugs made?",a:"All our rugs are handcrafted in Northern Afghanistan by skilled artisan weavers from the Turkmen tribe. We also work with production partners in Turkey and Pakistan."},{q:"What materials are used in your rugs?",a:"Our rugs are made from premium Afghan Ghazni Wool with cotton foundations. We use natural vegetable dyes to create vibrant, long-lasting colors."},{q:"How long does shipping take?",a:"Standard shipping takes 5-7 business days within the US. For international orders, please contact us for estimated delivery times."},{q:"What is your return policy?",a:"All rugs come with a 30-day return policy. Items must be in their original, unused condition. Please contact us at velourarugs@hotmail.com to initiate a return."},{q:"Do you offer free shipping?",a:"Yes! We offer free shipping on all rug orders over ${window.formatPrice(300)}. For orders under ${window.formatPrice(300)}, a flat shipping fee applies."},{q:"How do I care for my hand-knotted rug?",a:"We recommend regular vacuuming (without the beater bar), rotating the rug periodically for even wear, and professional cleaning when needed. Avoid direct sunlight for extended periods."},{q:"Are your prices negotiable?",a:"Our listed prices are already discounted up to 60% off retail. Additionally, you can use code EXTRA15%OFF for an extra 15% discount on your entire order."},{q:"Can I visit your showroom?",a:"Yes! Our showroom is located at 4731 Pell Dr, Ste 5, Sacramento, CA 95838. We are open Monday-Saturday by appointment only. Please call +1 415 565 1579 to schedule a visit."},{q:"Do you offer rug pads?",a:"Yes, we carry premium anti-slip dual surface rug pads that protect your floors and keep your rug in place. You can find them in our Rug Pads collection."},{q:"How can I determine the right rug size?",a:"We recommend measuring your room and furniture placement before ordering. For living rooms, the rug should be large enough for at least the front legs of furniture to sit on it. For dining rooms, add 24 inches to each side of the table."}].map((t,s)=>`
          <div class="product-accordion__item">
            <button class="product-accordion__header ${s===0?"active":""}" data-faq="${s}">
              <span>${t.q}</span>
              <span class="product-accordion__icon">${s===0?"↕":"↓"}</span>
            </button>
            <div class="product-accordion__content ${s===0?"active":""}" id="faq-${s}">
              <p>${t.a}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `,e.querySelectorAll(".product-accordion__header").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.faq,o=document.getElementById(`faq-${s}`);t.classList.toggle("active"),o==null||o.classList.toggle("active")})})}const Ne={refund:{title:"Refund Policy",content:`
      <h2>Returns</h2>
      <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.</p>
      <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
      
      <h2>Refunds (if applicable)</h2>
      <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
      <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
      
      <h2>Late or missing refunds (if applicable)</h2>
      <p>If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.</p>
      <p>Next contact your bank. There is often some processing time before a refund is posted.</p>
      <p>If you've done all of this and you still have not received your refund yet, please contact us at velourarugs@hotmail.com.</p>
      
      <h2>Exchanges (if applicable)</h2>
      <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at velourarugs@hotmail.com.</p>
      
      <h2>Shipping</h2>
      <p>To return your product, you should mail your product to: 4731 Pell Dr, Ste 5, Sacramento, CA 95838.</p>
      <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</p>
    `},privacy:{title:"Privacy Policy",content:`
      <h2>What personal information we collect</h2>
      <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
      <p>Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.</p>
      
      <h2>How we use your personal information</h2>
      <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
      <ul>
        <li>Screen our orders for potential risk or fraud</li>
        <li>Provide you with information or advertising relating to our products or services</li>
        <li>Improve and optimize our Site</li>
      </ul>
      
      <h2>Sharing your personal information</h2>
      <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. We use Google Analytics to help us understand how our customers use the Site.</p>
      
      <h2>Your rights</h2>
      <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted.</p>
      
      <h2>Contact us</h2>
      <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at velourarugs@hotmail.com or by mail at 4731 Pell Dr, Ste 5, Sacramento, CA 95838.</p>
    `},terms:{title:"Terms of Service",content:`
      <h2>Overview</h2>
      <p>This website is operated by Veloura Rugs. Throughout the site, the terms "we", "us" and "our" refer to Veloura Rugs. Veloura Rugs offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
      
      <h2>Online Store Terms</h2>
      <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.</p>
      <p>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.</p>
      
      <h2>General Conditions</h2>
      <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted.</p>
      
      <h2>Accuracy of Information</h2>
      <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only.</p>
      
      <h2>Modifications to the Service and Prices</h2>
      <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice at any time.</p>
      
      <h2>Contact Information</h2>
      <p>Questions about the Terms of Service should be sent to us at velourarugs@hotmail.com.</p>
    `},shipping:{title:"Shipping Policy",content:""},"contact-info":{title:"Contact Information",content:`
      <h2>Our Location</h2>
      <p><strong>Veloura Rugs</strong></p>
      <p>4731 PELL DR, STE 5</p>
      <p>SACRAMENTO, CA 95838</p>
      
      <h2>Business Hours</h2>
      <p>Monday - Saturday: By Appointment Only</p>
      <p>Sunday: Closed</p>
      
      <h2>Contact</h2>
      <p><strong>Phone:</strong> +1 415 565 1579</p>
      <p><strong>Email:</strong> velourarugs@hotmail.com</p>
      
      <h2>Social Media</h2>
      <p>Follow us on Facebook, Pinterest, and Instagram for the latest updates and new arrivals.</p>
      
      <h2>Customer Service</h2>
      <p>For any questions, concerns, or inquiries about our products, orders, or services, please don't hesitate to reach out. We strive to respond to all inquiries within 24 hours during business days.</p>
    `}};function ze(e,t){const s=t.type,o=Ne[s];if(!o){e.innerHTML='<div class="section" style="text-align:center;padding:100px;"><h1>Page Not Found</h1></div>';return}let i=o.content;s==="shipping"&&(i=`
      <h2>Domestic Shipping (United States)</h2>
      <p>We offer FREE shipping on all orders over ${window.formatPrice(300)} within the continental United States.</p>
      <p>Orders under ${window.formatPrice(300)} will be charged a flat rate shipping fee.</p>
      <p>Standard delivery takes 5-7 business days from the date of shipment.</p>
      
      <h2>Processing Time</h2>
      <p>All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.</p>
      
      <h2>Tracking</h2>
      <p>Once your order has shipped, you will receive a shipping confirmation email with a tracking number. You can use this tracking number to monitor the delivery status of your order.</p>
      
      <h2>International Shipping</h2>
      <p>For international orders, please contact us directly at velourarugs@hotmail.com for shipping quotes and estimated delivery times.</p>
      
      <h2>Shipping Insurance</h2>
      <p>All orders are fully insured during transit. If your order arrives damaged, please contact us immediately with photos of the damage and we will arrange a replacement or refund.</p>
    `),e.innerHTML=`
    <div class="policy-page">
      <h1>${o.title}</h1>
      <div class="policy-content">
        ${i}
      </div>
    </div>
  `}function We(e){if(!Q()){W("#/login?redirect=checkout");return}const t=N(),s=te();if(t.length===0){e.innerHTML=`
      <div class="section" style="text-align:center;padding:100px 20px;">
        <h1>Your Cart is Empty</h1>
        <p>Add some beautiful rugs to your cart before checking out.</p>
        <a href="#/collection/all-rugs" class="btn btn-gold" style="margin-top:20px;display:inline-block;">Browse Collections</a>
      </div>
    `;return}e.innerHTML=`
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
            
            <h2 style="margin-top:2rem">Payment Method</h2>
            <div class="payment-box">
              <p style="margin-bottom: 1rem; color: var(--muted); font-size: 0.9rem;">Demo Mode: All transactions are simulated.</p>
              
              <div class="payment-methods" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <label class="payment-method-label" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid var(--border); border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                  <input type="radio" name="payment_method" value="credit_card" checked style="width: auto; margin: 0;" />
                  <span style="display: flex; align-items: center; gap: 0.5rem; flex: 1;">
                    <strong>Credit Card (Visa / Mastercard)</strong>
                  </span>
                  <div style="display: flex; gap: 0.5rem;">
                    <i class="fa-brands fa-cc-visa" style="font-size: 1.5rem; color: #1434CB;"></i>
                    <i class="fa-brands fa-cc-mastercard" style="font-size: 1.5rem; color: #EB001B;"></i>
                  </div>
                </label>

                <label class="payment-method-label" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid var(--border); border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                  <input type="radio" name="payment_method" value="apple_pay" style="width: auto; margin: 0;" />
                  <span style="display: flex; align-items: center; gap: 0.5rem; flex: 1;">
                    <strong>Apple Pay</strong>
                  </span>
                  <i class="fa-brands fa-apple-pay" style="font-size: 1.8rem; color: #000;"></i>
                </label>

                <label class="payment-method-label" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid var(--border); border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                  <input type="radio" name="payment_method" value="google_pay" style="width: auto; margin: 0;" />
                  <span style="display: flex; align-items: center; gap: 0.5rem; flex: 1;">
                    <strong>Google Pay</strong>
                  </span>
                  <i class="fa-brands fa-google-pay" style="font-size: 1.8rem; color: #5F6368;"></i>
                </label>
              </div>

              <div class="form-group" id="card-input-group">
                <label>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" disabled value="4242 4242 4242 4242" />
              </div>
            </div>

            <button type="submit" class="btn btn-gold btn--full" style="margin-top:2rem;padding:1.2rem;">Complete Purchase — ${window.formatPrice(s)}</button>
          </form>
        </div>

        <!-- Right: Order Summary -->
        <div class="checkout-summary">
          <h2>Order Summary</h2>
          <div class="summary-items">
            ${t.map(l=>{var h;const p=D(),d=p==null?void 0:p.products.find(L=>L.id===l.id);return`
              <div class="summary-item">
                <div class="summary-item-img" style="background-image:url('${((h=d==null?void 0:d.images)==null?void 0:h[0])||"https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=200"}')"></div>
                <div class="summary-item-info">
                  <div class="summary-item-title">${l.title}</div>
                  <div class="summary-item-qty">Qty: ${l.qty}</div>
                </div>
                <div class="summary-item-price">${window.formatPrice(l.price*l.qty)}</div>
              </div>
            `}).join("")}
          </div>
          <div class="summary-totals">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${window.formatPrice(s)}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>${window.formatPrice(s)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;const o=document.getElementById("checkout-form"),i=document.querySelectorAll('input[name="payment_method"]'),a=document.getElementById("card-input-group"),r=document.querySelectorAll(".payment-method-label");i.forEach(l=>{l.addEventListener("change",p=>{r.forEach(d=>d.style.borderColor="var(--border)"),p.target.checked&&(p.target.closest("label").style.borderColor="var(--gold)"),p.target.value==="credit_card"?a.style.display="block":a.style.display="none"})});const c=document.querySelector('input[name="payment_method"]:checked');c&&(c.closest("label").style.borderColor="var(--gold)"),o.addEventListener("submit",l=>{l.preventDefault(),je(e)})}function je(e){const t="VEL-"+Math.random().toString(36).substr(2,9).toUpperCase(),s=te(),o=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});be({id:t,total:s,date:o,status:"Processing"}),N().forEach(a=>xe(a.id)),e.innerHTML=`
    <div class="order-success">
      <div class="order-success-card">
        <div class="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your handcrafted rug is being prepared for shipment.</p>
        
        <div class="order-details">
          <div class="order-detail-row">
            <span>Order ID:</span>
            <strong>${t}</strong>
          </div>
          <div class="order-detail-row">
            <span>Total Amount:</span>
            <strong>${window.formatPrice(s)}</strong>
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
  `,setTimeout(()=>{const a=document.getElementById("order-status"),r=document.getElementById("step-shipped");a&&(a.textContent="Shipped",a.className="status-badge shipped"),r==null||r.classList.add("active"),ae(t,"Shipped")},1e4),setTimeout(()=>{const a=document.getElementById("order-status"),r=document.getElementById("step-delivered");a&&(a.textContent="Delivered",a.className="status-badge delivered"),r==null||r.classList.add("active"),ae(t,"Delivered")},6e4)}console.log("Veloura Rugs: Main module loading...");window.selectedCurrency=localStorage.getItem("selectedCurrency")||"PKR";const K={PKR:{rate:1,suffix:" PKR",name:"Pakistan (PKR Rs)"},USD:{rate:1/280,prefix:"$",name:"United States (USD $)"},EUR:{rate:.92/280,prefix:"€",name:"European Union (EUR €)"},GBP:{rate:.79/280,prefix:"£",name:"United Kingdom (GBP £)"},CAD:{rate:1.36/280,prefix:"C$",name:"Canada (CAD $)"},AUD:{rate:1.53/280,prefix:"A$",name:"Australia (AUD $)"}};window.formatPrice=function(e){if(e==null||isNaN(Number(e)))return"0.00";const t=K[window.selectedCurrency]||K.PKR,s=Number(e)*t.rate,o=window.selectedCurrency==="PKR"?0:2,i=s.toLocaleString("en-US",{minimumFractionDigits:o,maximumFractionDigits:o});return`${t.prefix||""}${i}${t.suffix||""}`};async function Ue(){try{const t=await(await fetch("/Veloura-Rugs/data/products.json")).json();if(t.products&&t.products.length<100){const s=[...t.products];for(;t.products.length<100;)s.forEach(o=>{t.products.length<100&&t.products.push({...o,id:o.id+"_"+t.products.length,slug:o.slug+"-"+t.products.length})})}oe(t)}catch(e){console.error("Failed to load product data:",e),oe({products:[],collections:[],reviews:[]})}}function Ye(){T("/",pe),T("/collections",qe),T("/collection/:slug",Re),T("/product/:slug",Te),T("/about",Pe),T("/contact",Me),T("/login",De),T("/register",He),T("/account",Oe),T("/wishlist",me),T("/faq",Fe),T("/policy/:type",ze),T("/checkout",We)}function Ge(){var z;const e=document.getElementById("cart-count");e&&(e.textContent=X()),se();function t(){document.querySelectorAll('a[href="#/login"], a[href="#/account"]').forEach($=>{Q()?$.setAttribute("href","#/account"):$.setAttribute("href","#/login")})}t(),window.addEventListener("hashchange",t);const s=document.getElementById("cart-toggle"),o=document.getElementById("cart-drawer"),i=document.getElementById("cart-overlay"),a=document.getElementById("cart-close");function r(){o==null||o.classList.add("active"),i==null||i.classList.add("active"),document.body.classList.add("no-scroll"),ee()}function c(){o==null||o.classList.remove("active"),i==null||i.classList.remove("active"),document.body.classList.remove("no-scroll")}s==null||s.addEventListener("click",r),a==null||a.addEventListener("click",c),i==null||i.addEventListener("click",c),(z=document.getElementById("start-shopping-btn"))==null||z.addEventListener("click",()=>{c()});const l=document.getElementById("search-toggle"),p=document.getElementById("search-overlay"),d=document.getElementById("search-close-btn"),v=document.getElementById("search-input-overlay"),h=document.getElementById("search-results"),L=document.getElementById("search-results-container"),q=document.getElementById("search-clear-btn");l==null||l.addEventListener("click",()=>{p==null||p.classList.add("active"),setTimeout(()=>v==null?void 0:v.focus(),300)}),d==null||d.addEventListener("click",()=>{p==null||p.classList.remove("active")}),q==null||q.addEventListener("click",()=>{v&&(v.value=""),M()});function M(){var H;const m=(H=v==null?void 0:v.value)==null?void 0:H.toLowerCase().trim(),$=D();if(!m||!$){h&&(h.innerHTML=""),L==null||L.classList.remove("has-results");return}const F=$.products.filter(x=>{const P=(x.title||"").toLowerCase(),V=(x.style||"").toLowerCase(),ve=(x.color||"").toLowerCase(),ge=(x.size||"").toLowerCase();return P.includes(m)||V.includes(m)||ve.includes(m)||ge.includes(m)}).slice(0,8);if(L==null||L.classList.add("has-results"),F.length===0){h&&(h.innerHTML='<p style="padding:20px;color:#999;text-align:center;">No products found.</p>');return}h&&(h.innerHTML=F.map(x=>{var V;const P=((V=x.images)==null?void 0:V[0])||"🏮";return`
        <a href="#/product/${x.slug}" class="search-result-item" onclick="document.getElementById('search-overlay').classList.remove('active');">
          <div class="search-result-item__img" style="background-image:url('${P}');">
          </div>
          <div class="search-result-item__info">
            <h4>${x.title}</h4>
            <span class="price">${window.formatPrice(x.price)}</span>
          </div>
        </a>
      `}).join(""))}v==null||v.addEventListener("input",M),v==null||v.addEventListener("keydown",m=>{m.key==="Enter"&&M()});const R=document.getElementById("mobile-menu-toggle"),C=document.getElementById("mobile-nav"),y=document.getElementById("mobile-nav-overlay"),u=document.getElementById("mobile-nav-close");function g(){C==null||C.classList.add("active"),y==null||y.classList.add("active"),document.body.classList.add("no-scroll")}function S(){C==null||C.classList.remove("active"),y==null||y.classList.remove("active"),document.body.classList.remove("no-scroll")}R==null||R.addEventListener("click",g),u==null||u.addEventListener("click",S),y==null||y.addEventListener("click",S),C==null||C.querySelectorAll("a[href]").forEach(m=>{m.addEventListener("click",S)});const w=document.getElementById("chat-toggle-btn"),_=document.getElementById("chat-panel"),j=document.getElementById("chat-close");w==null||w.addEventListener("click",()=>{_==null||_.classList.toggle("active")}),j==null||j.addEventListener("click",()=>{_==null||_.classList.remove("active")});const n=document.getElementById("chat-input"),b=document.getElementById("chat-send-btn"),f=document.querySelector(".chat-body");function E(){var F;const m=(F=n==null?void 0:n.value)==null?void 0:F.trim();if(!m)return;const $=document.createElement("div");$.className="chat-message user",$.innerHTML=`<p>${m}</p>`,f==null||f.appendChild($),n&&(n.value=""),f.scrollTop=f.scrollHeight,setTimeout(()=>{const H=document.createElement("div");H.className="chat-message bot",H.innerHTML="<p>Thank you for reaching out! Our support team is currently assisting other customers, but we've received your message and will get back to you soon. 😊</p>",f==null||f.appendChild(H),f.scrollTop=f.scrollHeight},1e3)}b==null||b.addEventListener("click",E),n==null||n.addEventListener("keydown",m=>{m.key==="Enter"&&E()});const B=document.getElementById("currency-btn"),k=document.getElementById("currency-dropdown");if(B){const m=K[window.selectedCurrency]||K.PKR;B.innerHTML=`${m.name} <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`}B==null||B.addEventListener("click",m=>{m.stopPropagation(),k==null||k.classList.toggle("active")}),document.querySelectorAll(".currency-option").forEach(m=>{m.getAttribute("data-currency")===window.selectedCurrency?m.classList.add("active"):m.classList.remove("active"),m.addEventListener("click",$=>{$.preventDefault(),localStorage.setItem("selectedCurrency",m.getAttribute("data-currency")),location.reload()})}),document.addEventListener("click",m=>{_!=null&&_.classList.contains("active")&&!(w!=null&&w.contains(m.target))&&!_.contains(m.target)&&_.classList.remove("active"),k!=null&&k.classList.contains("active")&&!(B!=null&&B.contains(m.target))&&k.classList.remove("active")}),document.addEventListener("keydown",m=>{m.key==="Escape"&&(p==null||p.classList.remove("active"),_==null||_.classList.remove("active"),k==null||k.classList.remove("active"),c(),S(),document.body.classList.remove("no-scroll"))}),window.updateCartItem=function(m,$){Ee(m,$),ee()},window.renderCartContents=ee}function ee(){const e=N(),t=document.getElementById("cart-body"),s=document.getElementById("cart-footer"),o=document.getElementById("cart-items-count"),i=document.getElementById("cart-count");if(i&&(i.textContent=X()),!t)return;if(e.length===0){t.innerHTML=`
      <div class="cart-empty">
        <p>Your Cart is Empty.</p>
        <p>Don't miss out on the best deals.</p>
        <a href="#/collection/all-rugs" class="btn btn--primary" onclick="document.getElementById('cart-drawer').classList.remove('active');document.getElementById('cart-overlay').classList.remove('active');document.body.classList.remove('no-scroll');">Start Shopping</a>
      </div>`,s&&(s.style.display="none"),o&&(o.textContent="0 ITEMS");return}t.innerHTML=e.map(r=>{var d;const c=D(),l=c==null?void 0:c.products.find(v=>v.id===r.id),p=((d=l==null?void 0:l.images)==null?void 0:d[0])||"🏮";return`
    <div class="cart-item">
      <div class="cart-item__image" style="background-image: url('${p}'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center;">
        ${p.startsWith("http")?"":p}
      </div>
      <div class="cart-item__details">
        <div class="cart-item__title">${r.title}</div>
        <div class="cart-item__price">${window.formatPrice(r.price)}</div>
        <div class="cart-item__qty">
          <button onclick="window.updateCartItem('${r.id}', ${r.qty-1})">−</button>
          <span>${r.qty}</span>
          <button onclick="window.updateCartItem('${r.id}', ${r.qty+1})">+</button>
        </div>
        <button class="cart-item__remove" onclick="window.updateCartItem('${r.id}', 0)">Remove</button>
      </div>
    </div>
  `}).join(""),s&&(s.style.display="block");const a=document.getElementById("cart-subtotal");a&&(a.textContent=`${window.formatPrice(te())}`),o&&(o.textContent=`${X()} ITEMS`)}window.toggleWishlist=e=>{const s=D().products.find(o=>o.id===e);s&&ue(s)};window.openQuickView=e=>{var l,p;const s=D().products.find(d=>d.id===e);if(!s)return;const o=document.getElementById("quick-view-modal"),i=document.getElementById("quick-view-overlay"),a=document.getElementById("quick-view-content"),r=(s.images||[]).filter(d=>d&&d.trim()!==""&&!d.includes("15343.jpg")),c=r[0]||"https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=600";a.innerHTML=`
    <div class="quick-view-layout">
      <div class="quick-view-images">
        <div class="quick-view-main" id="qv-main-img" style="background-image:url('${c}');"></div>
        <div class="quick-view-thumbs">
          ${r.slice(0,4).map(d=>`<div class="qv-thumb" style="background-image:url('${d}');" onclick="document.getElementById('qv-main-img').style.backgroundImage='url(${d})'"></div>`).join("")}
        </div>
      </div>
      <div class="quick-view-info">
        <span class="qv-vendor">VELOURA RUGS</span>
        <h2>${s.title}</h2>
        <div class="qv-price">${window.formatPrice(s.price)} ${s.comparePrice?`<span class="qv-compare">${window.formatPrice(s.comparePrice)}</span>`:""}</div>
        <p class="qv-desc">${((l=s.description)==null?void 0:l.material)||"Hand-knotted with premium wool"}. Origin: ${((p=s.description)==null?void 0:p.origin)||"Afghanistan"}.</p>
        <div class="qv-actions">
          <button class="btn btn--dark btn--full" onclick="window.location.hash='#/product/${s.slug}'; window.closeQuickView();">VIEW FULL DETAILS</button>
        </div>
      </div>
    </div>
  `,o==null||o.classList.add("active"),i==null||i.classList.add("active"),document.body.classList.add("no-scroll")};window.closeQuickView=()=>{var e,t;(e=document.getElementById("quick-view-modal"))==null||e.classList.remove("active"),(t=document.getElementById("quick-view-overlay"))==null||t.classList.remove("active"),document.body.classList.remove("no-scroll")};async function Ve(){try{await Ue(),Ye(),Ge(),we();const e=document.getElementById("main-content");e&&e.innerHTML.trim()===""&&pe(e)}catch(e){console.error("Initialization error:",e);const t=document.getElementById("main-content");t&&(t.innerHTML=`<div class="section" style="text-align:center;padding:100px 20px;">
        <h2>Oops! Something went wrong.</h2>
        <p>We couldn't load the page content. Please try refreshing.</p>
        <button class="btn btn-gold" onclick="location.reload()">Refresh Page</button>
      </div>`)}}Ve();
