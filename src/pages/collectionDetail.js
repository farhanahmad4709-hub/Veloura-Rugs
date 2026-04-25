// ========================================
// Collection Detail Page (All Rugs, by size/style/color)
// ========================================
import { getProductData } from '../store.js';
import { renderProductCard } from './home.js';
import { rugColors, generateRugSVG } from '../utils.js';

export function renderCollectionDetail(container, params) {
  const slug = params.slug;
  const data = getProductData();
  const allProducts = data?.products || [];
  const collections = data?.collections || [];
  
  const collection = collections.find(c => c.slug === slug);
  let collectionName = collection ? collection.name : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Clean up collection name if it already has "Collection"
  collectionName = collectionName.replace(/\s+Collection$/i, '');
  
  // Default banner image for main collections
  const defaultBanner = 'https://yildizrugs.com/cdn/shop/files/121029_05c359a6-8b8f-4c29-a30c-2b8f6b2ae814.jpg?v=1737569984&width=3840';
  const bannerImage = collection?.image || defaultBanner;
  
  // Filter products by collection
  let filtered = [];
  if (slug === 'all-rugs') {
    filtered = allProducts.filter(p => p.style !== 'Rug Pads');
  } else if (slug === 'clearance') {
    filtered = allProducts.filter(p => p.onSale || (p.collections && p.collections.includes('clearance')));
  } else if (slug === 'rug-pads') {
    filtered = allProducts.filter(p => p.style === 'Rug Pads');
  } else {
    filtered = allProducts.filter(p => p.collections && p.collections.includes(slug));
  }
  
  // If this is a color collection, also filter by color
  if (collection?.type === 'color') {
    const colorName = collection.name;
    filtered = allProducts.filter(p => p.color?.toLowerCase() === colorName.toLowerCase());
  }
  
  // If no products found for this collection, show all (except for specific ones like clearance/rug-pads)
  if (filtered.length === 0 && !['all-rugs', 'clearance', 'rug-pads'].includes(slug)) {
    filtered = allProducts.slice(0, 12);
  }

  // Build sidebar filters
  const styleFilters = [...new Set(allProducts.map(p => p.style))].filter(Boolean);
  const sizeFilters = [...new Set(allProducts.map(p => p.size))].filter(Boolean);
  const colorFilters = [...new Set(allProducts.map(p => p.color))].filter(Boolean);
  
  // Get collection-specific filters
  const collectionStyles = [...new Set(filtered.map(p => p.style))].filter(Boolean);
  const collectionSizes = [...new Set(filtered.map(p => p.size))].filter(Boolean);
  const collectionColors = [...new Set(filtered.map(p => p.color))].filter(Boolean);

  container.innerHTML = `
    <!-- Collection Banner -->
    <div class="collection-banner" style="background-image: url('${bannerImage}');">
      <h1>${collectionName}</h1>
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
            ${['Clearance', 'Flat Weave Kilims', 'Mamluk', 'Modern', 'Moroccan', 'Rug Pads', 'Traditional', 'Transitional', 'Tribal', 'Turkish Oushak', 'Vintage'].map(s => 
              `<a href="#/collection/${s.toLowerCase().replace(/\s+/g, '-')}" ${collectionName.toLowerCase().includes(s.toLowerCase()) ? 'class="active"' : ''}>${s}</a>`
            ).join('')}
          </div>
        </div>
        
        <div class="filter-group">
          <div class="filter-group__header">
            <span class="filter-group__title">SIZES</span>
            <button class="filter-group__reset" id="reset-sizes">Reset</button>
          </div>
          <div class="filter-group__items" id="filter-sizes">
            ${['3x5', '4x6', '5x7', '6x9', '7x10', '8x10 - 8x11', '9x12', '10x14 - 10x13', '12x15 - 12x18', 'Runner', 'Square & Circle', 'Gallery Size Rugs'].map(s => 
              `<a href="javascript:void(0)" class="size-filter" data-size="${s}">${s}</a>`
            ).join('')}
          </div>
        </div>

        <div class="filter-group">
          <div class="filter-group__header">
            <span class="filter-group__title">COLORS</span>
            <button class="filter-group__reset" id="reset-colors">Reset</button>
          </div>
          <div class="filter-group__items" id="filter-colors">
            ${['Beige', 'Black', 'Blue', 'Brown', 'Gold', 'Green', 'Grey', 'Multicolor', 'Orange', 'Pink', 'Purple', 'Red'].map(c => 
              `<a href="javascript:void(0)" class="color-filter" data-color="${c}">${c}</a>`
            ).join('')}
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
          <span class="collection-toolbar__count">Showing ${filtered.length} products</span>
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
  `;

  // --- State ---
  let currentPage = 1;
  const itemsPerPage = 16;
  let currentFiltered = [...filtered];

  function renderPage() {
    const totalPages = Math.ceil(currentFiltered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = currentFiltered.slice(start, end);
    
    const grid = document.getElementById('products-grid');
    if (grid) {
      grid.innerHTML = pageItems.length > 0 
        ? pageItems.map((p, i) => renderProductCard(p, i)).join('')
        : '<div style="text-align:center;padding:60px;color:#999;">No products match your filters.</div>';
    }

    renderPagination(totalPages);
    
    // Update toolbar count
    const countEl = container.querySelector('.collection-toolbar__count');
    if (countEl) countEl.textContent = `Showing ${currentFiltered.length} products`;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderPagination(totalPages) {
    const pagWrap = container.querySelector('.pagination');
    if (!pagWrap) return;
    
    if (totalPages <= 1) {
      pagWrap.style.display = 'none';
      return;
    }
    
    pagWrap.style.display = 'flex';
    let html = '';
    
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        html += '<span style="padding:0 8px;">...</span>';
      }
    }
    
    pagWrap.innerHTML = html;
    
    pagWrap.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page);
        renderPage();
      });
    });
  }

  function applyAllFilters() {
    const activeSize = container.querySelector('.size-filter.active')?.dataset.size;
    const activeColor = container.querySelector('.color-filter.active')?.dataset.color;
    const minPrice = parseFloat(document.getElementById('price-from')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('price-to')?.value) || 100000;
    const sortBy = document.getElementById('sort-select')?.value || 'best';

    let result = [...filtered];

    if (activeSize) result = result.filter(p => p.size === activeSize);
    if (activeColor) result = result.filter(p => p.color === activeColor);
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'name-desc': result.sort((a, b) => b.title.localeCompare(a.title)); break;
    }

    currentFiltered = result;
    currentPage = 1;
    renderPage();
  }

  // --- Initial Render ---
  renderPage();

  // --- Event Listeners ---
  container.querySelectorAll('.grid-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.grid-view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.getElementById('products-grid');
      if (btn.dataset.cols === '2') grid.classList.add('products-grid--2col');
      else grid.classList.remove('products-grid--2col');
    });
  });

  document.getElementById('sort-select')?.addEventListener('change', applyAllFilters);
  
  container.querySelectorAll('.size-filter, .color-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const isSize = btn.classList.contains('size-filter');
      const siblings = container.querySelectorAll(isSize ? '.size-filter' : '.color-filter');
      const wasActive = btn.classList.contains('active');
      siblings.forEach(s => s.classList.remove('active'));
      if (!wasActive) btn.classList.add('active');
      applyAllFilters();
    });
  });

  const priceFrom = document.getElementById('price-from');
  const priceTo = document.getElementById('price-to');
  [priceFrom, priceTo].forEach(el => el?.addEventListener('input', applyAllFilters));

  container.querySelectorAll('.filter-group__reset').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-group');
      group.querySelectorAll('.active').forEach(a => a.classList.remove('active'));
      if (group.querySelector('input')) {
        document.getElementById('price-from').value = 0;
        document.getElementById('price-to').value = 17000;
      }
      applyAllFilters();
    });
  });
    const filterToggle = document.getElementById('filter-toggle');
    const filtersSidebar = document.querySelector('.filters');
    const filtersClose = document.getElementById('filters-close');
    const filtersOverlay = document.getElementById('filters-overlay');
    
    if (filterToggle && filtersSidebar) {
      filterToggle.addEventListener('click', () => {
        filtersSidebar.classList.add('active');
        if (filtersOverlay) filtersOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      });
    }
    
    const closeFilters = () => {
      if (filtersSidebar) filtersSidebar.classList.remove('active');
      if (filtersOverlay) filtersOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (filtersClose) filtersClose.addEventListener('click', closeFilters);
    if (filtersOverlay) filtersOverlay.addEventListener('click', closeFilters);
}
