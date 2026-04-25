// ========================================
// Simple Hash-based SPA Router
// ========================================

const routes = [];
let notFoundHandler = null;

export function addRoute(pattern, handler) {
  routes.push({ pattern, handler });
}

export function setNotFound(handler) {
  notFoundHandler = handler;
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function getCurrentRoute() {
  const hash = window.location.hash.slice(1) || '/';
  return hash.split('?')[0]; // Strip query string for matching
}

function matchRoute(path) {
  for (const route of routes) {
    const pattern = route.pattern;
    // Convert pattern like /product/:slug to regex
    const regexStr = '^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$';
    const regex = new RegExp(regexStr);
    const match = path.match(regex);
    if (match) {
      const params = {};
      const paramNames = (pattern.match(/:[^/]+/g) || []).map(p => p.slice(1));
      paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      return { handler: route.handler, params };
    }
  }
  return null;
}

export function handleRoute() {
  try {
    const path = getCurrentRoute();
    const container = document.getElementById('main-content');
    
    // Scroll to top (Immediate and slightly delayed to ensure it sticks)
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 10);
    
    const matched = matchRoute(path);
    if (matched) {
      matched.handler(container, matched.params);
      // Final scroll check after render
      setTimeout(() => window.scrollTo(0, 0), 100);
    } else if (notFoundHandler) {
      notFoundHandler(container);
    } else {
      container.innerHTML = '<div class="section" style="text-align:center;padding:100px 20px;"><h1>Page Not Found</h1><p>The page you are looking for does not exist.</p><a href="#/" class="btn btn--primary" style="margin-top:20px;">Go Home</a></div>';
    }
  } catch(e) {
    console.error("Routing Error:", e);
    alert("Routing Error:\n" + e.message + "\n\nStack:\n" + e.stack);
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  
  // Force scroll to top on every hash link click, even if hash doesn't change
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href')?.startsWith('#')) {
      window.scrollTo(0, 0);
      // If clicking same link, manually trigger handleRoute
      if (link.getAttribute('href') === window.location.hash) {
        handleRoute();
      }
    }
  });

  // Handle initial load
  if (!window.location.hash) {
    window.location.hash = '#/';
  } else {
    handleRoute();
  }
}
