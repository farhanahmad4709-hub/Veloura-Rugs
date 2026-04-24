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
      <h1>Collections</h1>
      <div class="collections-page-grid">
          ${sizeCollections.map((col, i) => {
            const colors = rugColors[i % rugColors.length];
            
            // Try to find a real product image for this size collection
            const categoryProducts = data?.products?.filter(p => 
              p.size === col.name || 
              (p.collections && p.collections.includes(col.slug))
            ) || [];
            
            const fallbackImg = categoryProducts.length > 0 
              ? categoryProducts[0].images[0] 
              : generateRugSVG(colors, i % 4);
              
            const imgSrc = col.image || fallbackImg;
            
            return `
              <a href="#/collection/${col.slug}" class="collections-page-card">
                <div class="collections-page-card__bg" style="background-image:url('${imgSrc}');">
                </div>
                <span class="collections-page-card__label">${col.name}</span>
              </a>
            `;
          }).join('')}
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
  `;
}
