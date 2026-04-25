// ========================================
// Collections List Page
// ========================================
import { getProductData } from '../store.js';
import { rugColors, generateRugSVG } from '../utils.js';

export function renderCollections(container) {
  const data = getProductData();
  const collections = data?.collections || [];
  
  // Only show size collections on the collections page (like the reference)
  const sizeCollections = collections.filter(c => c.type === 'size');

  container.innerHTML = `
    <div class="collections-page">
      <div class="collections-header">
        <h1>Our Collections</h1>
        <p>Explore our curated selections of hand-knotted artistry, categorized by size and style.</p>
      </div>

      <div class="collections-page-grid">
          ${sizeCollections.map((col, i) => {
            // 1. Try to find products specifically in this collection
            let categoryProducts = data?.products?.filter(p => 
              p.size === col.name || 
              (p.collections && p.collections.includes(col.slug))
            ) || [];
            
            // 2. If none, find products with a similar size name or just any high-quality rug
            if (categoryProducts.length === 0) {
              categoryProducts = data?.products?.filter(p => p.images && p.images.length > 0) || [];
            }
            
            // 3. Pick a "beautiful" image (using index to keep it consistent but varied)
            const imgIndex = i % categoryProducts.length;
            const fallbackImg = categoryProducts.length > 0 
              ? categoryProducts[imgIndex].images[0] 
              : 'images/Poster_2.png';
              
            const imgSrc = col.image || fallbackImg;
            
            return `
              <a href="#/collection/${col.slug}" class="collections-page-card">
                <div class="collections-page-card__bg" style="background-image:url('${imgSrc}');">
                  <div class="collections-page-card__overlay"></div>
                </div>
                <div class="collections-page-card__content">
                  <span class="collections-page-card__label">${col.name}</span>
                  <span class="collections-page-card__action">Explore Collection →</span>
                </div>
              </a>
            `;
          }).join('')}
      </div>
    </div>

  `;
}
