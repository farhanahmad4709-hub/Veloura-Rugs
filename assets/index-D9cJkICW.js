(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const re=[];let ue=null;function A(e,i){re.push({pattern:e,handler:i})}function W(e){window.location.hash=e}function pe(){return(window.location.hash.slice(1)||"/").split("?")[0]}function ve(e){for(const i of re){const s=i.pattern,o="^"+s.replace(/:[^/]+/g,"([^/]+)")+"$",t=new RegExp(o),a=e.match(t);if(a){const n={};return(s.match(/:[^/]+/g)||[]).map(l=>l.slice(1)).forEach((l,p)=>{n[l]=decodeURIComponent(a[p+1])}),{handler:i.handler,params:n}}}return null}function K(){try{const e=pe(),i=document.getElementById("main-content");window.scrollTo(0,0),setTimeout(()=>window.scrollTo(0,0),10);const s=ve(e);s?(s.handler(i,s.params),setTimeout(()=>window.scrollTo(0,0),100)):ue||(i.innerHTML='<div class="section" style="text-align:center;padding:100px 20px;"><h1>Page Not Found</h1><p>The page you are looking for does not exist.</p><a href="#/" class="btn btn--primary" style="margin-top:20px;">Go Home</a></div>')}catch(e){alert("Routing Error: "+e.stack),console.error(e)}}function me(){window.addEventListener("hashchange",K),document.addEventListener("click",e=>{var s;const i=e.target.closest("a");i&&((s=i.getAttribute("href"))!=null&&s.startsWith("#"))&&(window.scrollTo(0,0),i.getAttribute("href")===window.location.hash&&K())}),window.location.hash?K():window.location.hash="#/"}let ne=null;function se(e){ne=e}function P(){return ne}const S={CART:"veloura_cart",WISHLIST:"veloura_wishlist",USER:"veloura_user",CONTACTS:"veloura_contacts",ORDERS:"veloura_orders"};function le(){const e=X();if(!e)return[];const i=D(S.ORDERS)||[];let s=!1;const o=i.filter(t=>t.userId===e.id);return o.forEach(t=>{if(t.status!=="Delivered"&&t.timestamp){const a=Date.now()-t.timestamp;a>=6e4?(t.status="Delivered",s=!0):a>=1e4&&t.status==="Processing"&&(t.status="Shipped",s=!0)}}),s&&T(S.ORDERS,i),o}function ge(e){const i=X();if(!i)return[];const s=D(S.ORDERS)||[];return e.timestamp||(e.timestamp=Date.now()),e.userId=i.id,s.unshift(e),T(S.ORDERS,s),s}function oe(e,i){const s=le(),o=s.find(t=>t.id===e);o&&(o.status=i,T(S.ORDERS,s))}function D(e){try{return JSON.parse(localStorage.getItem(e))||null}catch{return null}}function T(e,i){localStorage.setItem(e,JSON.stringify(i))}function F(){return D(S.CART)||[]}function he(e,i=1){const s=F(),o=s.find(t=>t.id===e.id);return o?o.qty+=i:s.push({...e,qty:i}),T(S.CART,s),te(),s}function fe(e,i){let s=F();if(i<=0)s=s.filter(o=>o.id!==e);else{const o=s.find(t=>t.id===e);o&&(o.qty=i)}return T(S.CART,s),te(),s}function ye(e){const i=F().filter(s=>s.id!==e);return T(S.CART,i),te(),i}function ee(){return F().reduce((e,i)=>e+i.price*i.qty,0)}function V(){return F().reduce((e,i)=>e+i.qty,0)}function te(){const e=document.getElementById("cart-count");e&&(e.textContent=V())}function U(){return D(S.WISHLIST)||[]}function ce(e){const i=U(),s=i.findIndex(o=>o.id===e.id);return s>-1?i.splice(s,1):i.push(e),T(S.WISHLIST,i),ie(),i}function be(e){const i=U().filter(s=>s.id!==e);return T(S.WISHLIST,i),ie(),i}function we(){return U().length}function ie(){const e=document.getElementById("wishlist-count");e&&(e.textContent=we())}function ae(e){return U().some(i=>i.id===e)}function G(){return document.cookie.includes("veloura_session=true")}function X(){return G()?D(S.USER):null}function ke(e,i){const o=(D("veloura_accounts")||[]).find(t=>t.email===e&&t.password===i);if(o){T(S.USER,o);const t=new Date;return t.setTime(t.getTime()+720*60*60*1e3),document.cookie=`veloura_session=true; expires=${t.toUTCString()}; path=/`,{success:!0,user:o}}return{success:!1,error:"Invalid email or password"}}function Ee(e){const i=D("veloura_accounts")||[];if(i.find(t=>t.email===e.email))return{success:!1,error:"Email already registered"};const s={...e,id:Date.now().toString()};i.push(s),T("veloura_accounts",i),T(S.USER,s);const o=new Date;return o.setTime(o.getTime()+720*60*60*1e3),document.cookie=`veloura_session=true; expires=${o.toUTCString()}; path=/`,{success:!0,user:s}}function xe(){localStorage.removeItem(S.USER),document.cookie="veloura_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"}function Se(e){const i=D(S.CONTACTS)||[];i.push({...e,date:new Date().toISOString()}),T(S.CONTACTS,i)}function Le(e){var v;const i=P(),s=G(),o=[],t=new Set,a=((v=i==null?void 0:i.products)==null?void 0:v.filter(l=>l.featured))||[];for(const l of a)if(t.has(l.title)||(o.push(l),t.add(l.title)),o.length===4)break;if(o.length<4){const l=(i==null?void 0:i.products)||[];for(const p of l)if(t.has(p.title)||(o.push(p),t.add(p.title)),o.length===4)break}const n=s?`
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
        ${o.map((l,p)=>Q(l,p)).join("")}
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

    ${n}
  `,Ie(s)}function Ie(e){const i=document.getElementById("newsletter-email"),s=document.getElementById("newsletter-btn"),o=document.getElementById("newsletter-success"),t=document.getElementById("newsletter-form");if(s==null||s.addEventListener("click",()=>{i!=null&&i.value&&(t.style.display="none",o.style.display="block",i.value="")}),e){const a=document.getElementById("rating-summary-toggle"),n=document.getElementById("rating-breakdown"),v=document.getElementById("rating-chevron");a==null||a.addEventListener("click",()=>{const f=n.style.display==="none";n.style.display=f?"block":"none",v&&(v.style.transform=f?"rotate(180deg)":"rotate(0deg)")});const l=document.getElementById("write-review-btn"),p=document.getElementById("review-form-container"),u=document.getElementById("cancel-review");l==null||l.addEventListener("click",()=>{p.style.display="block",l.style.display="none"}),u==null||u.addEventListener("click",()=>{p.style.display="none",l.style.display="block"});const m=document.getElementById("star-rating-input"),w=document.getElementById("rating-val");m==null||m.querySelectorAll("span").forEach(f=>{f.addEventListener("click",()=>{const c=f.getAttribute("data-val");w.value=c,m.querySelectorAll("span").forEach(h=>{h.classList.toggle("active",h.getAttribute("data-val")<=c)})})});const k=document.getElementById("review-submission-form"),B=document.getElementById("review-success");k==null||k.addEventListener("submit",f=>{f.preventDefault(),k.style.display="none",B&&(B.style.display="block")});const R=document.querySelectorAll(".breakdown-row"),q=document.getElementById("reviews-grid"),I=document.querySelectorAll(".review-card");R.forEach(f=>{f.addEventListener("click",()=>{const c=f.getAttribute("data-stars");let h=!1;I.forEach(y=>{y.getAttribute("data-stars")===c?(y.style.display="block",h=!0):y.style.display="none"});const b=document.getElementById("no-reviews-msg");if(h)b&&b.remove();else if(!b){const y=document.createElement("p");y.id="no-reviews-msg",y.textContent=`No reviews found for ${c} star rating.`,y.style.padding="3rem",y.style.textAlign="center",y.style.width="100%",y.style.color="var(--muted)",q.appendChild(y)}})})}}function Q(e,i=0){const s=(e.images||[]).filter(l=>l&&l.trim()!==""&&!l.includes("15343.jpg"));let o=s[0];o||(e.collections&&e.collections.includes("rug-pads")?o="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=400":o="https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=400");const t=s[1]||o,a=e.price?e.price.toLocaleString("en-US",{minimumFractionDigits:2}):"0.00",n=e.comparePrice?e.comparePrice.toLocaleString("en-US",{minimumFractionDigits:2}):null,v=!!e.comparePrice;return`
    <div class="product-card" onclick="window.location.hash='#/product/${e.slug}'" style="animation-delay: ${i*.05}s">
      <div class="product-img">
        <img class="main-img" src="${o}" alt="${e.title}" />
        <img class="hover-img" src="${t}" alt="${e.title}" />
        ${v?'<span class="product-badge">SALE</span>':""}
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
          <span class="price-sale">$${a}</span>
          ${n?`<span class="price-orig">$${n}</span>`:""}
        </div>
        <button class="product-cta" onclick="event.stopPropagation(); window.location.hash='#/product/${e.slug}'">View Full Details</button>
      </div>
    </div>
  `}const z=[["#8B4513","#D2691E","#CD853F","#DEB887"],["#800020","#A0522D","#BC8F8F","#F4A460"],["#2F4F4F","#556B2F","#8FBC8F","#BDB76B"],["#191970","#4169E1","#6495ED","#B0C4DE"],["#8B0000","#B22222","#CD5C5C","#E9967A"],["#006400","#228B22","#32CD32","#90EE90"],["#4B0082","#6A5ACD","#9370DB","#D8BFD8"],["#B8860B","#DAA520","#FFD700","#FAFAD2"]];function J(e,i=0){(!e||!Array.isArray(e)||e.length<4)&&(e=z[0]);const[s,o,t,a]=e,n=[`<rect width="300" height="400" fill="${a}"/>
     <rect x="20" y="20" width="260" height="360" fill="${s}" rx="2"/>
     <rect x="40" y="40" width="220" height="320" fill="${o}" rx="2"/>
     <ellipse cx="150" cy="200" rx="70" ry="90" fill="${t}"/>
     <ellipse cx="150" cy="200" rx="40" ry="55" fill="${s}"/>
     <ellipse cx="150" cy="200" rx="15" ry="20" fill="${a}"/>
     <rect x="60" y="50" width="180" height="10" fill="${t}" opacity="0.5"/>
     <rect x="60" y="340" width="180" height="10" fill="${t}" opacity="0.5"/>`,`<rect width="300" height="400" fill="${s}"/>
     <polygon points="150,40 260,200 150,360 40,200" fill="${o}" opacity="0.7"/>
     <polygon points="150,80 230,200 150,320 70,200" fill="${t}" opacity="0.6"/>
     <polygon points="150,120 200,200 150,280 100,200" fill="${a}" opacity="0.8"/>
     <line x1="0" y1="60" x2="300" y2="60" stroke="${t}" stroke-width="3"/>
     <line x1="0" y1="340" x2="300" y2="340" stroke="${t}" stroke-width="3"/>`,`<rect width="300" height="400" fill="${o}"/>
     <rect x="15" y="15" width="270" height="370" fill="none" stroke="${s}" stroke-width="8"/>
     <rect x="30" y="30" width="240" height="340" fill="${a}" opacity="0.3"/>
     <rect x="30" y="30" width="240" height="340" fill="none" stroke="${t}" stroke-width="3"/>
     <circle cx="150" cy="200" r="60" fill="${s}" opacity="0.5"/>
     <circle cx="150" cy="200" r="35" fill="${t}" opacity="0.5"/>
     <circle cx="150" cy="200" r="12" fill="${a}"/>`,`<rect width="300" height="400" fill="${a}"/>
     ${[0,1,2,3,4,5,6,7].map(v=>`<rect x="0" y="${v*50}" width="300" height="25" fill="${v%2===0?s:o}" opacity="0.6"/>`).join("")}
     <rect x="100" y="100" width="100" height="200" fill="${t}" opacity="0.4"/>
     <rect x="120" y="130" width="60" height="140" fill="${s}" opacity="0.3"/>`];return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">${n[i%n.length]}</svg>`)}`}function _e(e){const i=P(),o=((i==null?void 0:i.collections)||[]).filter(t=>t.type==="size");e.innerHTML=`
    <div class="collections-page">
      <h1>Collections</h1>
      <div class="collections-page-grid">
          ${o.map((t,a)=>{var u;const n=z[a%z.length],v=((u=i==null?void 0:i.products)==null?void 0:u.filter(m=>m.size===t.name||m.collections&&m.collections.includes(t.slug)))||[],l=v.length>0?v[0].images[0]:J(n,a%4),p=t.image||l;return`
              <a href="#/collection/${t.slug}" class="collections-page-card">
                <div class="collections-page-card__bg" style="background-image:url('${p}');">
                </div>
                <span class="collections-page-card__label">${t.name}</span>
              </a>
            `}).join("")}
      </div>

      <!-- Pagination -->
      <div class="pagination" style="margin-top:40px;">
        <button class="active">1</button>
        <button>2</button>
        <button>3</button>
        <span style="padding:0 8px;">...</span>
        <button>5</button>
        <button>→</button>
      </div>
    </div>
  `}function $e(e,i){var N;const s=i.slug,o=P(),t=(o==null?void 0:o.products)||[],n=((o==null?void 0:o.collections)||[]).find(r=>r.slug===s);let v=n?n.name:s.replace(/-/g," ").replace(/\b\w/g,r=>r.toUpperCase());v=v.replace(/\s+Collection$/i,"");const p=(n==null?void 0:n.image)||"https://yildizrugs.com/cdn/shop/files/121029_05c359a6-8b8f-4c29-a30c-2b8f6b2ae814.jpg?v=1737569984&width=3840";let u=[];if(s==="all-rugs"?u=t.filter(r=>r.style!=="Rug Pads"):s==="clearance"?u=t.filter(r=>r.onSale||r.collections&&r.collections.includes("clearance")):s==="rug-pads"?u=t.filter(r=>r.style==="Rug Pads"):u=t.filter(r=>r.collections&&r.collections.includes(s)),(n==null?void 0:n.type)==="color"){const r=n.name;u=t.filter(g=>{var E;return((E=g.color)==null?void 0:E.toLowerCase())===r.toLowerCase()})}u.length===0&&!["all-rugs","clearance","rug-pads"].includes(s)&&(u=t.slice(0,12)),[...new Set(t.map(r=>r.style))].filter(Boolean),[...new Set(t.map(r=>r.size))].filter(Boolean),[...new Set(t.map(r=>r.color))].filter(Boolean),[...new Set(u.map(r=>r.style))].filter(Boolean),[...new Set(u.map(r=>r.size))].filter(Boolean),[...new Set(u.map(r=>r.color))].filter(Boolean),e.innerHTML=`
    <!-- Collection Banner -->
    <div class="collection-banner" style="background-image: url('${p}');">
      <h1>${v}</h1>
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
            ${["Clearance","Flat Weave Kilims","Mamluk","Modern","Moroccan","Rug Pads","Traditional","Transitional","Tribal","Turkish Oushak","Vintage"].map(r=>`<a href="#/collection/${r.toLowerCase().replace(/\s+/g,"-")}" ${v.toLowerCase().includes(r.toLowerCase())?'class="active"':""}>${r}</a>`).join("")}
          </div>
        </div>
        
        <div class="filter-group">
          <div class="filter-group__header">
            <span class="filter-group__title">SIZES</span>
            <button class="filter-group__reset" id="reset-sizes">Reset</button>
          </div>
          <div class="filter-group__items" id="filter-sizes">
            ${["3x5","4x6","5x7","6x9","7x10","8x10 - 8x11","9x12","10x14 - 10x13","12x15 - 12x18","Runner","Square & Circle","Gallery Size Rugs"].map(r=>`<a href="javascript:void(0)" class="size-filter" data-size="${r}">${r}</a>`).join("")}
          </div>
        </div>

        <div class="filter-group">
          <div class="filter-group__header">
            <span class="filter-group__title">COLORS</span>
            <button class="filter-group__reset" id="reset-colors">Reset</button>
          </div>
          <div class="filter-group__items" id="filter-colors">
            ${["Beige","Black","Blue","Brown","Gold","Green","Grey","Multicolor","Orange","Pink","Purple","Red"].map(r=>`<a href="javascript:void(0)" class="color-filter" data-color="${r}">${r}</a>`).join("")}
          </div>
        </div>

        <div class="filter-group">
          <div class="filter-group__header">
            <span class="filter-group__title">PRICE</span>
            <button class="filter-group__reset" id="reset-price">Reset</button>
          </div>
          <div class="price-range">
            <span>From</span>
            <input type="number" id="price-from" value="0" min="0" placeholder="$ 0" />
            <span>-</span>
            <span>To</span>
            <input type="number" id="price-to" value="17000" placeholder="$ 17000" />
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
          <span class="collection-toolbar__count">Showing ${u.length} products</span>
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
  `;let m=1;const w=16;let k=[...u];function B(){const r=Math.ceil(k.length/w),g=(m-1)*w,E=g+w,d=k.slice(g,E),_=document.getElementById("products-grid");_&&(_.innerHTML=d.length>0?d.map((M,C)=>Q(M,C)).join(""):'<div style="text-align:center;padding:60px;color:#999;">No products match your filters.</div>'),R(r);const x=e.querySelector(".collection-toolbar__count");x&&(x.textContent=`Showing ${k.length} products`),window.scrollTo({top:0,behavior:"smooth"})}function R(r){const g=e.querySelector(".pagination");if(!g)return;if(r<=1){g.style.display="none";return}g.style.display="flex";let E="";for(let d=1;d<=r;d++)d===1||d===r||d>=m-1&&d<=m+1?E+=`<button class="page-btn ${d===m?"active":""}" data-page="${d}">${d}</button>`:(d===m-2||d===m+2)&&(E+='<span style="padding:0 8px;">...</span>');g.innerHTML=E,g.querySelectorAll(".page-btn").forEach(d=>{d.addEventListener("click",()=>{m=parseInt(d.dataset.page),B()})})}function q(){var M,C,j,H,Y;const r=(M=e.querySelector(".size-filter.active"))==null?void 0:M.dataset.size,g=(C=e.querySelector(".color-filter.active"))==null?void 0:C.dataset.color,E=parseFloat((j=document.getElementById("price-from"))==null?void 0:j.value)||0,d=parseFloat((H=document.getElementById("price-to"))==null?void 0:H.value)||1e5,_=((Y=document.getElementById("sort-select"))==null?void 0:Y.value)||"best";let x=[...u];switch(r&&(x=x.filter($=>$.size===r)),g&&(x=x.filter($=>$.color===g)),x=x.filter($=>$.price>=E&&$.price<=d),_){case"price-asc":x.sort(($,O)=>$.price-O.price);break;case"price-desc":x.sort(($,O)=>O.price-$.price);break;case"name-asc":x.sort(($,O)=>$.title.localeCompare(O.title));break;case"name-desc":x.sort(($,O)=>O.title.localeCompare($.title));break}k=x,m=1,B()}B(),e.querySelectorAll(".grid-view-btn").forEach(r=>{r.addEventListener("click",()=>{e.querySelectorAll(".grid-view-btn").forEach(E=>E.classList.remove("active")),r.classList.add("active");const g=document.getElementById("products-grid");r.dataset.cols==="2"?g.classList.add("products-grid--2col"):g.classList.remove("products-grid--2col")})}),(N=document.getElementById("sort-select"))==null||N.addEventListener("change",q),e.querySelectorAll(".size-filter, .color-filter").forEach(r=>{r.addEventListener("click",()=>{const g=r.classList.contains("size-filter"),E=e.querySelectorAll(g?".size-filter":".color-filter"),d=r.classList.contains("active");E.forEach(_=>_.classList.remove("active")),d||r.classList.add("active"),q()})});const I=document.getElementById("price-from"),f=document.getElementById("price-to");[I,f].forEach(r=>r==null?void 0:r.addEventListener("input",q)),e.querySelectorAll(".filter-group__reset").forEach(r=>{r.addEventListener("click",()=>{const g=r.closest(".filter-group");g.querySelectorAll(".active").forEach(E=>E.classList.remove("active")),g.querySelector("input")&&(document.getElementById("price-from").value=0,document.getElementById("price-to").value=17e3),q()})});const c=document.getElementById("filter-toggle"),h=document.querySelector(".filters"),b=document.getElementById("filters-close"),y=document.getElementById("filters-overlay");c&&h&&c.addEventListener("click",()=>{h.classList.add("active"),y&&y.classList.add("active"),document.body.style.overflow="hidden"});const L=()=>{h&&h.classList.remove("active"),y&&y.classList.remove("active"),document.body.style.overflow=""};b&&b.addEventListener("click",L),y&&y.addEventListener("click",L)}function Ce(e,i){var B,R,q,I,f;const s=P(),o=(s==null?void 0:s.products)||[],t=o.find(c=>c.slug===i.slug);if(!t){e.innerHTML='<div class="section" style="text-align:center;padding:100px;"><h1>Product Not Found</h1><a href="#/collection/all-rugs" class="btn btn--primary" style="margin-top:20px;">Browse All Rugs</a></div>';return}const a=o.indexOf(t),n=z[a%z.length];let v=J(n,a%4),l=[0,1,2].map(c=>J(z[(a+c)%z.length],(a+c)%4));if(t.images&&t.images.length>0&&t.images[0].startsWith("http")){const c=t.images.filter(h=>h&&h.trim()!==""&&!h.includes("15343.jpg"));c.length>0?(v=c[0],l=c.slice(0,4)):(t.collections&&t.collections.includes("rug-pads")?v="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800":v="https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=800",l=[v])}const p=o.filter(c=>c.id!==t.id&&(c.style===t.style||c.color===t.color)).slice(0,4),u=ae(t.id),m=t.description||{};e.innerHTML=`
    <div class="product-detail">
      <!-- Thumbnails -->
      <div class="product-thumbnails">
        ${l.map((c,h)=>`
          <div class="product-thumbnail ${h===0?"active":""}" data-img="${c}" style="background-image:url('${c}');background-size:cover;background-position:center;">
          </div>
        `).join("")}
      </div>

      <!-- Main Image -->
      <div class="product-main-image" id="product-main-img" style="background-image:url('${v}');background-size:cover;background-position:center;">
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <div class="product-info__vendor">VELOURA RUGS</div>
        <h1 class="product-info__title">${t.title}</h1>
        <div class="product-info__sku">${t.sku}</div>
        
        <div class="product-info__prices">
          <span class="product-info__price">$${t.price.toLocaleString("en-US",{minimumFractionDigits:2})}</span>
          ${t.comparePrice?`<span class="product-info__compare">$${t.comparePrice.toLocaleString("en-US",{minimumFractionDigits:2})}</span>`:""}
        </div>

        ${t.inStock?'<div class="product-info__stock">⟡ 1 in Stock</div>':'<div class="product-info__stock" style="color:var(--color-sale);">Out of Stock</div>'}

        <div class="product-info__actions">
          <div class="quantity-selector">
            <button id="qty-minus">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="99" />
            <button id="qty-plus">+</button>
          </div>
          <button class="btn btn--dark product-info__add-cart" id="add-to-cart-btn">Add To Cart</button>
        </div>

        <button class="btn btn--primary product-info__wishlist" id="add-wishlist-btn">
          Add to wishlist ${u?"✓":"♥"}
        </button>

        <!-- Description Accordion -->
        <div class="product-accordion">
          <div class="product-accordion__item">
            <button class="product-accordion__header active" data-accordion="desc">
              <span>DESCRIPTION</span>
              <span class="product-accordion__icon">↕</span>
            </button>
            <div class="product-accordion__content active" id="accordion-desc">
              ${Object.entries(m).map(([c,h])=>`<p><strong>${c.replace(/([A-Z])/g," $1").replace(/^./,b=>b.toUpperCase())}:</strong> ${h}</p>`).join("")}
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
    ${p.length>0?`
    <div class="also-like">
      <h2>You May Also Like</h2>
      <div class="products-grid">
        ${p.map((c,h)=>Q(c,o.indexOf(c))).join("")}
      </div>
    </div>
    `:""}
  `;const w=document.getElementById("qty-input");(B=document.getElementById("qty-minus"))==null||B.addEventListener("click",()=>{const c=parseInt(w.value);c>1&&(w.value=c-1)}),(R=document.getElementById("qty-plus"))==null||R.addEventListener("click",()=>{w.value=parseInt(w.value)+1}),(q=document.getElementById("add-to-cart-btn"))==null||q.addEventListener("click",()=>{var h,b;const c=parseInt(w.value)||1;he({id:t.id,title:t.title,price:t.price,comparePrice:t.comparePrice,slug:t.slug,sku:t.sku},c),(h=document.getElementById("cart-drawer"))==null||h.classList.add("active"),(b=document.getElementById("cart-overlay"))==null||b.classList.add("active"),document.body.classList.add("no-scroll"),renderCartContents()});const k=()=>{ce(t);const c=ae(t.id);document.querySelectorAll("#add-wishlist-btn, #add-wishlist-btn-2").forEach(h=>{h.innerHTML=`Add to wishlist ${c?"✓":"♥"}`})};(I=document.getElementById("add-wishlist-btn"))==null||I.addEventListener("click",k),(f=document.getElementById("add-wishlist-btn-2"))==null||f.addEventListener("click",k),e.querySelectorAll(".product-thumbnail").forEach(c=>{c.addEventListener("click",()=>{e.querySelectorAll(".product-thumbnail").forEach(b=>b.classList.remove("active")),c.classList.add("active");const h=document.getElementById("product-main-img");h.style.backgroundImage=`url('${c.dataset.img}')`})}),e.querySelectorAll(".product-accordion__header").forEach(c=>{c.addEventListener("click",()=>{const h=c.dataset.accordion,b=document.getElementById(`accordion-${h}`);c.classList.toggle("active"),b==null||b.classList.toggle("active")})})}function Be(e){e.innerHTML=`
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
  `}function qe(e){var i;e.innerHTML=`
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
  `,(i=document.getElementById("contact-form"))==null||i.addEventListener("submit",s=>{s.preventDefault();const o=new FormData(s.target),t=Object.fromEntries(o);Se(t),s.target.innerHTML='<div style="text-align:center;padding:40px;"><h3 style="color:var(--color-primary);">Thank you!</h3><p style="margin-top:8px;color:#666;">Your message has been sent. We will get back to you soon.</p></div>'})}function Ae(e){var i;e.innerHTML=`
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
  `,(i=document.getElementById("login-form"))==null||i.addEventListener("submit",s=>{s.preventDefault();const o=new FormData(s.target),t=ke(o.get("email"),o.get("password"));if(t.success){const n=new URLSearchParams(window.location.hash.split("?")[1]).get("redirect");W(n==="checkout"?"#/checkout":"#/account")}else{const a=document.getElementById("login-error");a.textContent=t.error,a.style.display="block"}})}function Te(e){var i;e.innerHTML=`
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
  `,(i=document.getElementById("register-form"))==null||i.addEventListener("submit",s=>{s.preventDefault();const o=new FormData(s.target),t=Ee({firstName:o.get("firstName"),lastName:o.get("lastName"),email:o.get("email"),password:o.get("password")});if(t.success){const n=new URLSearchParams(window.location.hash.split("?")[1]).get("redirect");W(n==="checkout"?"#/checkout":"#/account")}else{const a=document.getElementById("register-error");a.textContent=t.error,a.style.display="block"}})}function Re(e){var o;const i=X(),s=le();if(!i){W("#/login");return}e.innerHTML=`
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
              ${s.map(t=>`
                <div class="order-row">
                  <div class="order-id">
                    <span class="label">Order ID</span>
                    <strong>${t.id}</strong>
                  </div>
                  <div class="order-date">
                    <span class="label">Date</span>
                    <strong>${t.date}</strong>
                  </div>
                  <div class="order-total">
                    <span class="label">Total</span>
                    <strong>$${t.total.toLocaleString()}</strong>
                  </div>
                  <div class="order-status">
                    <span class="label">Status</span>
                    <strong class="status-badge ${t.status.toLowerCase()}">${t.status}</strong>
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
            <p><strong>${i.firstName||"User"} ${i.lastName||""}</strong></p>
            <p>${i.email||""}</p>
            <p>United States</p>
            <button class="btn btn-gold" style="margin-top:20px;padding:0.6rem 1.5rem;">Edit Address</button>
          </div>
        </div>
      </div>
    </div>
  `,(o=document.getElementById("logout-btn"))==null||o.addEventListener("click",t=>{t.preventDefault(),xe(),W("#/login")})}function de(e){const i=X(),s=U(),o=P(),t=(o==null?void 0:o.products)||[];e.innerHTML=`
    <div class="wishlist-page">
      ${i?"":`
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
          ${s.map((a,n)=>{const v=t.find(l=>l.id===a.id)||a;return`
              <div style="position:relative;">
                ${Q(v,n)}
                <button class="btn btn--outline" style="width:100%;margin-top:8px;font-size:12px;" onclick="window.removeWishlistItem('${a.id}')">Remove from Wishlist</button>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `,window.removeWishlistItem=function(a){be(a),de(e)}}function Pe(e){e.innerHTML=`
    <div class="faq-page">
      <h1>Frequently Asked Questions (FAQs)</h1>
      <div class="product-accordion">
        ${[{q:"Where are your rugs made?",a:"All our rugs are handcrafted in Northern Afghanistan by skilled artisan weavers from the Turkmen tribe. We also work with production partners in Turkey and Pakistan."},{q:"What materials are used in your rugs?",a:"Our rugs are made from premium Afghan Ghazni Wool with cotton foundations. We use natural vegetable dyes to create vibrant, long-lasting colors."},{q:"How long does shipping take?",a:"Standard shipping takes 5-7 business days within the US. For international orders, please contact us for estimated delivery times."},{q:"What is your return policy?",a:"All rugs come with a 30-day return policy. Items must be in their original, unused condition. Please contact us at velourarugs@hotmail.com to initiate a return."},{q:"Do you offer free shipping?",a:"Yes! We offer free shipping on all rug orders over $300. For orders under $300, a flat shipping fee applies."},{q:"How do I care for my hand-knotted rug?",a:"We recommend regular vacuuming (without the beater bar), rotating the rug periodically for even wear, and professional cleaning when needed. Avoid direct sunlight for extended periods."},{q:"Are your prices negotiable?",a:"Our listed prices are already discounted up to 60% off retail. Additionally, you can use code EXTRA15%OFF for an extra 15% discount on your entire order."},{q:"Can I visit your showroom?",a:"Yes! Our showroom is located at 4731 Pell Dr, Ste 5, Sacramento, CA 95838. We are open Monday-Saturday by appointment only. Please call +1 415 565 1579 to schedule a visit."},{q:"Do you offer rug pads?",a:"Yes, we carry premium anti-slip dual surface rug pads that protect your floors and keep your rug in place. You can find them in our Rug Pads collection."},{q:"How can I determine the right rug size?",a:"We recommend measuring your room and furniture placement before ordering. For living rooms, the rug should be large enough for at least the front legs of furniture to sit on it. For dining rooms, add 24 inches to each side of the table."}].map((i,s)=>`
          <div class="product-accordion__item">
            <button class="product-accordion__header ${s===0?"active":""}" data-faq="${s}">
              <span>${i.q}</span>
              <span class="product-accordion__icon">${s===0?"↕":"↓"}</span>
            </button>
            <div class="product-accordion__content ${s===0?"active":""}" id="faq-${s}">
              <p>${i.a}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `,e.querySelectorAll(".product-accordion__header").forEach(i=>{i.addEventListener("click",()=>{const s=i.dataset.faq,o=document.getElementById(`faq-${s}`);i.classList.toggle("active"),o==null||o.classList.toggle("active")})})}const Me={refund:{title:"Refund Policy",content:`
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
    `},shipping:{title:"Shipping Policy",content:`
      <h2>Domestic Shipping (United States)</h2>
      <p>We offer FREE shipping on all orders over $300 within the continental United States.</p>
      <p>Orders under $300 will be charged a flat rate shipping fee.</p>
      <p>Standard delivery takes 5-7 business days from the date of shipment.</p>
      
      <h2>Processing Time</h2>
      <p>All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.</p>
      
      <h2>Tracking</h2>
      <p>Once your order has shipped, you will receive a shipping confirmation email with a tracking number. You can use this tracking number to monitor the delivery status of your order.</p>
      
      <h2>International Shipping</h2>
      <p>For international orders, please contact us directly at velourarugs@hotmail.com for shipping quotes and estimated delivery times.</p>
      
      <h2>Shipping Insurance</h2>
      <p>All orders are fully insured during transit. If your order arrives damaged, please contact us immediately with photos of the damage and we will arrange a replacement or refund.</p>
    `},"contact-info":{title:"Contact Information",content:`
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
    `}};function De(e,i){const s=i.type,o=Me[s];if(!o){e.innerHTML='<div class="section" style="text-align:center;padding:100px;"><h1>Page Not Found</h1></div>';return}e.innerHTML=`
    <div class="policy-page">
      <h1>${o.title}</h1>
      ${o.content}
    </div>
  `}function Fe(e){if(!G()){W("#/login?redirect=checkout");return}const i=F(),s=ee();if(i.length===0){e.innerHTML=`
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

            <button type="submit" class="btn btn-gold btn--full" style="margin-top:2rem;padding:1.2rem;">Complete Purchase — $${s.toLocaleString()}</button>
          </form>
        </div>

        <!-- Right: Order Summary -->
        <div class="checkout-summary">
          <h2>Order Summary</h2>
          <div class="summary-items">
            ${i.map(l=>{var w;const p=P(),u=p==null?void 0:p.products.find(k=>k.id===l.id);return`
              <div class="summary-item">
                <div class="summary-item-img" style="background-image:url('${((w=u==null?void 0:u.images)==null?void 0:w[0])||"https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=200"}')"></div>
                <div class="summary-item-info">
                  <div class="summary-item-title">${l.title}</div>
                  <div class="summary-item-qty">Qty: ${l.qty}</div>
                </div>
                <div class="summary-item-price">$${(l.price*l.qty).toLocaleString()}</div>
              </div>
            `}).join("")}
          </div>
          <div class="summary-totals">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>$${s.toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>$${s.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;const o=document.getElementById("checkout-form"),t=document.querySelectorAll('input[name="payment_method"]'),a=document.getElementById("card-input-group"),n=document.querySelectorAll(".payment-method-label");t.forEach(l=>{l.addEventListener("change",p=>{n.forEach(u=>u.style.borderColor="var(--border)"),p.target.checked&&(p.target.closest("label").style.borderColor="var(--gold)"),p.target.value==="credit_card"?a.style.display="block":a.style.display="none"})});const v=document.querySelector('input[name="payment_method"]:checked');v&&(v.closest("label").style.borderColor="var(--gold)"),o.addEventListener("submit",l=>{l.preventDefault(),He(e)})}function He(e){const i="VEL-"+Math.random().toString(36).substr(2,9).toUpperCase(),s=ee(),o=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});ge({id:i,total:s,date:o,status:"Processing"}),F().forEach(a=>ye(a.id)),e.innerHTML=`
    <div class="order-success">
      <div class="order-success-card">
        <div class="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your handcrafted rug is being prepared for shipment.</p>
        
        <div class="order-details">
          <div class="order-detail-row">
            <span>Order ID:</span>
            <strong>${i}</strong>
          </div>
          <div class="order-detail-row">
            <span>Total Amount:</span>
            <strong>$${s.toLocaleString()}</strong>
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
  `,setTimeout(()=>{const a=document.getElementById("order-status"),n=document.getElementById("step-shipped");a&&(a.textContent="Shipped",a.className="status-badge shipped"),n==null||n.classList.add("active"),oe(i,"Shipped")},1e4),setTimeout(()=>{const a=document.getElementById("order-status"),n=document.getElementById("step-delivered");a&&(a.textContent="Delivered",a.className="status-badge delivered"),n==null||n.classList.add("active"),oe(i,"Delivered")},6e4)}async function Oe(){try{const i=await(await fetch("/Veloura-Rugs/data/products.json")).json();if(i.products&&i.products.length<100){const s=[...i.products];for(;i.products.length<100;)s.forEach(o=>{i.products.length<100&&i.products.push({...o,id:o.id+"_"+i.products.length,slug:o.slug+"-"+i.products.length})})}se(i)}catch(e){console.error("Failed to load product data:",e),se({products:[],collections:[],reviews:[]})}}function ze(){A("/",Le),A("/collections",_e),A("/collection/:slug",$e),A("/product/:slug",Ce),A("/about",Be),A("/contact",qe),A("/login",Ae),A("/register",Te),A("/account",Re),A("/wishlist",de),A("/faq",Pe),A("/policy/:type",De),A("/checkout",Fe)}function We(){var E;const e=document.getElementById("cart-count");e&&(e.textContent=V()),ie();function i(){document.querySelectorAll('a[href="#/login"], a[href="#/account"]').forEach(_=>{G()?_.setAttribute("href","#/account"):_.setAttribute("href","#/login")})}i(),window.addEventListener("hashchange",i);const s=document.getElementById("cart-toggle"),o=document.getElementById("cart-drawer"),t=document.getElementById("cart-overlay"),a=document.getElementById("cart-close");function n(){o==null||o.classList.add("active"),t==null||t.classList.add("active"),document.body.classList.add("no-scroll"),Z()}function v(){o==null||o.classList.remove("active"),t==null||t.classList.remove("active"),document.body.classList.remove("no-scroll")}s==null||s.addEventListener("click",n),a==null||a.addEventListener("click",v),t==null||t.addEventListener("click",v),(E=document.getElementById("start-shopping-btn"))==null||E.addEventListener("click",()=>{v()});const l=document.getElementById("search-toggle"),p=document.getElementById("search-overlay"),u=document.getElementById("search-close-btn"),m=document.getElementById("search-input-overlay"),w=document.getElementById("search-results"),k=document.getElementById("search-results-container"),B=document.getElementById("search-clear-btn");l==null||l.addEventListener("click",()=>{p==null||p.classList.add("active"),setTimeout(()=>m==null?void 0:m.focus(),300)}),u==null||u.addEventListener("click",()=>{p==null||p.classList.remove("active")}),B==null||B.addEventListener("click",()=>{m&&(m.value=""),R()});function R(){var M;const d=(M=m==null?void 0:m.value)==null?void 0:M.toLowerCase().trim(),_=P();if(!d||!_){w&&(w.innerHTML=""),k==null||k.classList.remove("has-results");return}const x=_.products.filter(C=>{const j=(C.title||"").toLowerCase(),H=(C.style||"").toLowerCase(),Y=(C.color||"").toLowerCase(),$=(C.size||"").toLowerCase();return j.includes(d)||H.includes(d)||Y.includes(d)||$.includes(d)}).slice(0,8);if(k==null||k.classList.add("has-results"),x.length===0){w&&(w.innerHTML='<p style="padding:20px;color:#999;text-align:center;">No products found.</p>');return}w&&(w.innerHTML=x.map(C=>{var H;const j=((H=C.images)==null?void 0:H[0])||"🏮";return`
        <a href="#/product/${C.slug}" class="search-result-item" onclick="document.getElementById('search-overlay').classList.remove('active');">
          <div class="search-result-item__img" style="background-image:url('${j}');">
          </div>
          <div class="search-result-item__info">
            <h4>${C.title}</h4>
            <span class="price">$${C.price.toLocaleString("en-US",{minimumFractionDigits:2})}</span>
          </div>
        </a>
      `}).join(""))}m==null||m.addEventListener("input",R),m==null||m.addEventListener("keydown",d=>{d.key==="Enter"&&R()});const q=document.getElementById("mobile-menu-toggle"),I=document.getElementById("mobile-nav"),f=document.getElementById("mobile-nav-overlay"),c=document.getElementById("mobile-nav-close");function h(){I==null||I.classList.add("active"),f==null||f.classList.add("active"),document.body.classList.add("no-scroll")}function b(){I==null||I.classList.remove("active"),f==null||f.classList.remove("active"),document.body.classList.remove("no-scroll")}q==null||q.addEventListener("click",h),c==null||c.addEventListener("click",b),f==null||f.addEventListener("click",b),I==null||I.querySelectorAll("a[href]").forEach(d=>{d.addEventListener("click",b)});const y=document.getElementById("chat-toggle-btn"),L=document.getElementById("chat-panel"),N=document.getElementById("chat-close");y==null||y.addEventListener("click",()=>{L==null||L.classList.toggle("active")}),N==null||N.addEventListener("click",()=>{L==null||L.classList.remove("active")});const r=document.getElementById("currency-btn"),g=document.getElementById("currency-dropdown");r==null||r.addEventListener("click",d=>{d.stopPropagation(),g==null||g.classList.toggle("active")}),document.querySelectorAll(".currency-option").forEach(d=>{d.addEventListener("click",_=>{_.preventDefault();const x=d.getAttribute("data-currency");r&&(r.innerHTML=`United States (${x} $) <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`),document.querySelectorAll(".currency-option").forEach(M=>M.classList.remove("active")),d.classList.add("active"),g==null||g.classList.remove("active")})}),document.addEventListener("click",d=>{L!=null&&L.classList.contains("active")&&!(y!=null&&y.contains(d.target))&&!L.contains(d.target)&&L.classList.remove("active"),g!=null&&g.classList.contains("active")&&!(r!=null&&r.contains(d.target))&&g.classList.remove("active")}),document.addEventListener("keydown",d=>{d.key==="Escape"&&(p==null||p.classList.remove("active"),L==null||L.classList.remove("active"),g==null||g.classList.remove("active"),v(),b(),document.body.classList.remove("no-scroll"))}),window.updateCartItem=function(d,_){fe(d,_),Z()},window.renderCartContents=Z}function Z(){const e=F(),i=document.getElementById("cart-body"),s=document.getElementById("cart-footer"),o=document.getElementById("cart-items-count"),t=document.getElementById("cart-count");if(t&&(t.textContent=V()),!i)return;if(e.length===0){i.innerHTML=`
      <div class="cart-empty">
        <p>Your Cart is Empty.</p>
        <p>Don't miss out on the best deals.</p>
        <a href="#/collection/all-rugs" class="btn btn--primary" onclick="document.getElementById('cart-drawer').classList.remove('active');document.getElementById('cart-overlay').classList.remove('active');document.body.classList.remove('no-scroll');">Start Shopping</a>
      </div>`,s&&(s.style.display="none"),o&&(o.textContent="0 ITEMS");return}i.innerHTML=e.map(n=>{var u;const v=P(),l=v==null?void 0:v.products.find(m=>m.id===n.id),p=((u=l==null?void 0:l.images)==null?void 0:u[0])||"🏮";return`
    <div class="cart-item">
      <div class="cart-item__image" style="background-image: url('${p}'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center;">
        ${p.startsWith("http")?"":p}
      </div>
      <div class="cart-item__details">
        <div class="cart-item__title">${n.title}</div>
        <div class="cart-item__price">$${n.price.toLocaleString("en-US",{minimumFractionDigits:2})}</div>
        <div class="cart-item__qty">
          <button onclick="window.updateCartItem('${n.id}', ${n.qty-1})">−</button>
          <span>${n.qty}</span>
          <button onclick="window.updateCartItem('${n.id}', ${n.qty+1})">+</button>
        </div>
        <button class="cart-item__remove" onclick="window.updateCartItem('${n.id}', 0)">Remove</button>
      </div>
    </div>
  `}).join(""),s&&(s.style.display="block");const a=document.getElementById("cart-subtotal");a&&(a.textContent=`$${ee().toLocaleString("en-US",{minimumFractionDigits:2})}`),o&&(o.textContent=`${V()} ITEMS`)}window.toggleWishlist=e=>{const s=P().products.find(o=>o.id===e);s&&ce(s)};window.openQuickView=e=>{var l,p;const s=P().products.find(u=>u.id===e);if(!s)return;const o=document.getElementById("quick-view-modal"),t=document.getElementById("quick-view-overlay"),a=document.getElementById("quick-view-content"),n=(s.images||[]).filter(u=>u&&u.trim()!==""&&!u.includes("15343.jpg")),v=n[0]||"https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=600";a.innerHTML=`
    <div class="quick-view-layout">
      <div class="quick-view-images">
        <div class="quick-view-main" id="qv-main-img" style="background-image:url('${v}');"></div>
        <div class="quick-view-thumbs">
          ${n.slice(0,4).map(u=>`<div class="qv-thumb" style="background-image:url('${u}');" onclick="document.getElementById('qv-main-img').style.backgroundImage='url(${u})'"></div>`).join("")}
        </div>
      </div>
      <div class="quick-view-info">
        <span class="qv-vendor">VELOURA RUGS</span>
        <h2>${s.title}</h2>
        <div class="qv-price">$${s.price.toLocaleString()} ${s.comparePrice?`<span class="qv-compare">$${s.comparePrice.toLocaleString()}</span>`:""}</div>
        <p class="qv-desc">${((l=s.description)==null?void 0:l.material)||"Hand-knotted with premium wool"}. Origin: ${((p=s.description)==null?void 0:p.origin)||"Afghanistan"}.</p>
        <div class="qv-actions">
          <button class="btn btn--dark btn--full" onclick="window.location.hash='#/product/${s.slug}'; window.closeQuickView();">VIEW FULL DETAILS</button>
        </div>
      </div>
    </div>
  `,o==null||o.classList.add("active"),t==null||t.classList.add("active"),document.body.classList.add("no-scroll")};window.closeQuickView=()=>{var e,i;(e=document.getElementById("quick-view-modal"))==null||e.classList.remove("active"),(i=document.getElementById("quick-view-overlay"))==null||i.classList.remove("active"),document.body.classList.remove("no-scroll")};async function Ne(){try{await Oe(),ze(),We(),me()}catch(e){console.error("Initialization error:",e)}}Ne();
