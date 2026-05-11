/* ═══════════════════════════════════════════════
   LACY THREADS — Full JavaScript
   ═══════════════════════════════════════════════ */

// ══════════════════════════════════════
// STATE
// ══════════════════════════════════════
let cart      = JSON.parse(localStorage.getItem('lt_cart')     || '[]');
let wishlist  = JSON.parse(localStorage.getItem('lt_wishlist') || '[]');
let navHistory        = ['home'];
let currentProductId  = null;


// ══════════════════════════════════════
// PRODUCT DATA
// ══════════════════════════════════════
const PRODUCTS = [
  {
    id: 'rosalie-silk-slip',
    name: 'Rosalie Silk Slip',
    tag: 'New Arrivals',
    sub: 'Champagne / Chantilly Lace',
    price: 15499,
    badge: null,
    img: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=900&q=85&auto=format&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=200&q=80&auto=format&fit=crop',
    ],
    description: 'A whisper of silk that drapes like a dream. The Rosalie Slip is crafted from premium mulberry silk with delicate Chantilly lace trim at the hem and neckline. Its bias-cut silhouette skims the body effortlessly — perfect for layering or wearing alone.',
    fabric: '100% Mulberry Silk, Chantilly Lace trim. Hand wash cold or dry clean. Lay flat to dry. Do not wring.',
    shipping: 'Complimentary standard shipping on orders over ₹2,999. Express delivery available at checkout. Ships within 1–2 business days in signature Lacy Threads packaging.',
  },
  {
    id: 'cashmere-morning-set',
    name: 'Cashmere Morning Set',
    tag: 'Best Seller',
    sub: 'Blush Heather',
    price: 19999,
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=900&q=85&auto=format&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=200&q=80&auto=format&fit=crop',
    ],
    description: 'Wrap yourself in the ultimate luxury with our Cashmere Morning Set. Featuring a relaxed-fit cardigan and wide-leg trousers in the softest grade-A cashmere, this set elevates your morning ritual to a ritual of pure indulgence.',
    fabric: '100% Grade-A Cashmere. Dry clean recommended. Store folded — never hang — to preserve shape.',
    shipping: 'Complimentary standard shipping on orders over ₹2,999. Express delivery available at checkout. Ships within 1–2 business days in signature Lacy Threads packaging.',
  },
  {
    id: 'midnight-garden-bralette',
    name: 'Garden Green Scarf',
    tag: 'New Arrivals',
    sub: 'Onyx / Gold Hardware',
    price: 7299,
    badge: null,
    img: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=900&q=85&auto=format&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=200&q=80&auto=format&fit=crop',
    ],
    description: 'Sultry and sophisticated, the Garden Green Scarf features hand-embroidered floral lace on a deep onyx base, accented with 24k gold-finished hardware. A statement piece that transcends the bedroom.',
    fabric: '80% Nylon, 20% Elastane lace overlay. Hand wash cold, do not tumble dry. Iron on low heat with press cloth.',
    shipping: 'Complimentary standard shipping on orders over ₹2,999. Express delivery available at checkout. Ships within 1–2 business days in signature Lacy Threads packaging.',
  },
  {
    id: 'ethereal-organza-robe',
    name: 'Ethereal Organza Robe',
    tag: 'Limited Edition',
    sub: 'Lavender Mist',
    price: 12999,
    badge: null,
    img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=900&q=85&auto=format&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=200&q=80&auto=format&fit=crop',
    ],
    description: 'Float through mornings and evenings alike in our Ethereal Organza Robe. Crafted from layers of the finest silk organza in a dreamy lavender mist, this floor-length robe moves with you like a whisper of cloud.',
    fabric: '100% Silk Organza. Dry clean only. Handle with extreme care — organza is delicate and may snag.',
    shipping: 'Complimentary standard shipping on orders over ₹2,999. Express delivery available at checkout. Ships within 1–2 business days in signature Lacy Threads packaging.',
  },
  {
    id: 'satin-dream-slip',
    name: 'Luxe Lounge Co-ord',
    tag: 'New',
    sub: 'Champagne / Blush',
    price: 13799,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85&auto=format&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&q=80&auto=format&fit=crop',
    ],
    description: 'The Satin Dream Slip in rose gold is a masterpiece of understated glamour. With its spaghetti straps, cowl neckline, and fluid satin drape, it moves like liquid light across the skin.',
    fabric: '95% Polyester Satin, 5% Elastane. Machine wash cold, gentle cycle. Do not bleach.',
    shipping: 'Complimentary standard shipping on orders over ₹2,999. Express delivery available at checkout. Ships within 1–2 business days in signature Lacy Threads packaging.',
  },
  {
    id: 'velvet-plunge-dress',
    name: 'White Bloom Midi Dress',
    tag: 'Collection',
    sub: 'Sunlit Yellow / Floral',
    price: 17499,
    badge: null,
    img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=85&auto=format&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80&auto=format&fit=crop',
    ],
    description: 'Command the room in our Velvet Plunge Dress. Deep burgundy crushed velvet with a plunging V-neck, fitted bodice, and a subtle flared hem — this piece is as unforgettable as the evening you wear it in.',
    fabric: '85% Viscose Velvet, 15% Polyester. Dry clean only. Steam to refresh. Store on padded hanger.',
    shipping: 'Complimentary standard shipping on orders over ₹2,999. Express delivery available at checkout. Ships within 1–2 business days in signature Lacy Threads packaging.',
  },
  {
    id: 'lace-trim-chemise',
    name: 'Noir Structured Coat',
    tag: 'New Arrivals',
    sub: 'Onyx / Tailored',
    price: 7999,
    badge: null,
    img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&q=85&auto=format&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&q=80&auto=format&fit=crop',
    ],
    description: 'Delicate yet enduring, the Lace Trim Chemise in ivory is a timeless bedside essential. Fine cotton lawn fabric is adorned with hand-finished ecru lace at the hem and neckline, creating a piece that feels as beautiful as it looks.',
    fabric: '100% Cotton Lawn with Ecru Lace trim. Machine wash cold, gentle cycle. Iron on low. Do not tumble dry.',
    shipping: 'Complimentary standard shipping on orders over ₹2,999. Express delivery available at checkout. Ships within 1–2 business days in signature Lacy Threads packaging.',
  },
  {
    id: 'pleated-muse-skirt',
    name: 'Driftwood Knit Poncho',
    tag: 'Sale',
    sub: 'Oatmeal / Sand',
    price: 9999,
    badge: 'Sale',
    img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=85&auto=format&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80&auto=format&fit=crop',
    ],
    description: 'A wardrobe staple reimagined with feminine flair. The Pleated Muse Skirt in blush and sand features hand-pressed knife pleats, a high waist, and a midi length that flatters every silhouette.',
    fabric: '70% Silk, 30% Polyester. Dry clean or hand wash cold. Do not wring. Hang to dry.',
    shipping: 'Complimentary standard shipping on orders over ₹2,999. Express delivery available at checkout. Ships within 1–2 business days in signature Lacy Threads packaging.',
  },
];


// ══════════════════════════════════════
// SEARCH ICON → open shop + focus input
// ══════════════════════════════════════
function openSearch() {
  goTo('shop');
  setTimeout(() => {
    const input = document.getElementById('shop-search-input');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 120);
}


// ══════════════════════════════════════
// SCROLL TO ABOUT / CONTACT
// ══════════════════════════════════════
function scrollToAbout() {
  goTo('home');
  setTimeout(() => {
    const el = document.getElementById('about-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
}

function scrollToContact() {
  goTo('home');
  setTimeout(() => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
}


// ══════════════════════════════════════
// SHOP — SEARCH / FILTER
// ══════════════════════════════════════
function filterShopProducts(query) {
  const q = query.trim().toLowerCase();
  const cards = document.querySelectorAll('#page-shop .shop-grid .product-card');
  let count = 0;

  cards.forEach(card => {
    const name  = (card.querySelector('.product-name')?.textContent || '').toLowerCase();
    const sub   = (card.querySelector('.product-sub')?.textContent  || '').toLowerCase();
    const badge = (card.querySelector('.badge')?.textContent        || '').toLowerCase();
    const match = !q || name.includes(q) || sub.includes(q) || badge.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) count++;
  });

  // Update count label (if it exists)
  const meta = document.querySelector('#page-shop .shop-meta span');
  if (meta) meta.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
}


// ══════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════
function goTo(id, productId) {
  const prev = navHistory[navHistory.length - 1];
  if (prev !== id) navHistory.push(id);

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) { target.classList.add('active'); window.scrollTo(0, 0); }

  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const tab = document.getElementById('tab-' + id);
  if (tab) tab.classList.add('active');

  if (id === 'cart')    renderCart();
  if (id === 'wishlist') renderWishlist();
  if (id === 'product' && productId) {
    currentProductId = productId;
    renderProduct(productId);
  }
}

function goBack() {
  if (navHistory.length > 1) {
    navHistory.pop();
    const prev = navHistory[navHistory.length - 1];
    goTo(prev);
    navHistory.pop();
    navHistory.push(prev);
  } else {
    goTo('home');
  }
}

function openProduct(productId) {
  goTo('product', productId);
}


// ══════════════════════════════════════
// RENDER — PRODUCT DETAIL PAGE
// ══════════════════════════════════════
function renderProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  const inWish = wishlist.includes(p.id);
  document.getElementById('detail-tag').textContent   = p.tag;
  document.getElementById('detail-name').textContent  = p.name;
  document.getElementById('detail-price').textContent = formatINR(p.price);
  document.getElementById('main-product-img').src     = p.img;
  document.getElementById('main-product-img').alt     = p.name;
  document.getElementById('detail-desc').textContent     = p.description;
  document.getElementById('detail-fabric').textContent   = p.fabric;
  document.getElementById('detail-shipping').textContent = p.shipping;

  // Thumbnails
  const thumbContainer = document.getElementById('detail-thumbs');
  thumbContainer.innerHTML = p.thumbs.map((t, i) => `
    <div class="thumb ${i === 0 ? 'active' : ''}">
      <img src="${t}" alt="">
    </div>`).join('');

  const thumbEls  = thumbContainer.querySelectorAll('.thumb');
  const fullImgs  = p.thumbs.map(t => t.replace('w=200', 'w=900').replace('q=80', 'q=85'));
  thumbEls.forEach((el, i) => {
    el.onclick = () => swapImg(el, fullImgs[i]);
  });

  // Wish button state
  const wishBtn = document.getElementById('product-wish-btn');
  wishBtn.querySelector('svg').style.stroke = inWish ? 'var(--rose)' : 'var(--text-muted)';
  wishBtn.querySelector('svg').style.fill   = inWish ? 'var(--rose)' : 'none';
}


// ══════════════════════════════════════
// RENDER — WISHLIST PAGE
// ══════════════════════════════════════
function renderWishlist() {
  const grid    = document.getElementById('wishlist-grid');
  const emptyEl = document.getElementById('empty-wishlist');

  if (wishlist.length === 0) {
    emptyEl.style.display = 'flex';
    if (grid) grid.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  if (!grid) {
    const g = document.createElement('div');
    g.id        = 'wishlist-grid';
    g.className = 'wishlist-grid';
    document.getElementById('page-wishlist').appendChild(g);
    renderWishlistGrid(g);
  } else {
    grid.style.display = 'grid';
    renderWishlistGrid(grid);
  }
}

function renderWishlistGrid(grid) {
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  grid.innerHTML = items.map(p => `
    <div class="product-card" onclick="openProduct('${p.id}')">
      <div class="product-img-wrap">
        <img src="${p.img.replace('w=900','w=600').replace('q=85','q=80')}" alt="${p.name}" loading="lazy">
        <button class="wish-btn active" onclick="removeFromWishlist(event,'${p.id}')">
          <svg viewBox="0 0 24 24" style="stroke:var(--rose);fill:var(--rose)">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-sub">${p.sub}</div>
        <div class="product-price">${formatINR(p.price)}</div>
      </div>
    </div>`).join('');
}

function removeFromWishlist(e, id) {
  e.stopPropagation();
  wishlist = wishlist.filter(x => x !== id);
  saveWishlist();
  renderWishlist();
}


// ══════════════════════════════════════
// HAMBURGER MENU
// ══════════════════════════════════════
function toggleMenu() {
  const menu    = document.getElementById('side-menu');
  const overlay = document.getElementById('menu-overlay');
  menu.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
  document.getElementById('side-menu').classList.remove('open');
  document.getElementById('menu-overlay').classList.remove('open');
  document.body.style.overflow = '';
}


// ══════════════════════════════════════
// WISHLIST — toggle / save / badge
// ══════════════════════════════════════
function toggleWish(e, btn, productId) {
  e.stopPropagation();
  const inWish = wishlist.includes(productId);
  if (inWish) {
    wishlist = wishlist.filter(x => x !== productId);
    btn.classList.remove('active');
    btn.querySelector('svg').style.stroke = '';
    btn.querySelector('svg').style.fill   = '';
  } else {
    wishlist.push(productId);
    btn.classList.add('active');
    btn.querySelector('svg').style.stroke = 'var(--rose)';
    btn.querySelector('svg').style.fill   = 'var(--rose)';
  }
  saveWishlist();
}

function toggleWishProduct() {
  if (!currentProductId) return;
  const inWish  = wishlist.includes(currentProductId);
  const wishBtn = document.getElementById('product-wish-btn');
  if (inWish) {
    wishlist = wishlist.filter(x => x !== currentProductId);
    wishBtn.querySelector('svg').style.stroke = 'var(--text-muted)';
    wishBtn.querySelector('svg').style.fill   = 'none';
  } else {
    wishlist.push(currentProductId);
    wishBtn.querySelector('svg').style.stroke = 'var(--rose)';
    wishBtn.querySelector('svg').style.fill   = 'var(--rose)';
  }
  saveWishlist();
}

function saveWishlist() {
  localStorage.setItem('lt_wishlist', JSON.stringify(wishlist));
  updateWishBadge();
}

function updateWishBadge() {
  const badge = document.getElementById('wish-badge');
  if (wishlist.length > 0) {
    badge.style.display  = 'flex';
    badge.textContent    = wishlist.length;
  } else {
    badge.style.display  = 'none';
  }
}


// ══════════════════════════════════════
// DROPDOWN HELPERS
// (position: fixed, calculated from getBoundingClientRect)
// ══════════════════════════════════════

/**
 * Positions a fixed dropdown below its trigger element.
 * @param {HTMLElement} drop       - The dropdown container (.filter-dropdown or .sort-dropdown)
 * @param {HTMLElement} triggerEl  - The button/chip that was clicked
 * @param {boolean}     alignRight - If true, aligns right edge of dropdown to right edge of trigger
 */
function positionDropdown(drop, triggerEl, alignRight) {
  const rect = triggerEl.getBoundingClientRect();
  drop.style.top = (rect.bottom + 6) + 'px';
  if (alignRight) {
    drop.style.right = (window.innerWidth - rect.right) + 'px';
    drop.style.left  = 'auto';
  } else {
    drop.style.left  = rect.left + 'px';
    drop.style.right = 'auto';
  }
}

/** Close all dropdowns on outside click */
document.addEventListener('click', () => {
  document.querySelectorAll('.filter-dropdown').forEach(d => d.classList.remove('open'));
  const sd = document.getElementById('sort-dropdown');
  const sw = document.getElementById('sort-wrap');
  if (sd) sd.classList.remove('open');
  if (sw) sw.classList.remove('open');
});


// ══════════════════════════════════════
// FILTER DROPDOWNS  (Size / Price)
// ══════════════════════════════════════
function toggleFilterDropdown(dropId, chipId, e) {
  e.stopPropagation();
  const drop  = document.getElementById(dropId);
  const chip  = document.getElementById(chipId);
  const isOpen = drop.classList.contains('open');

  // Close everything first
  document.querySelectorAll('.filter-dropdown').forEach(d => d.classList.remove('open'));
  const sd = document.getElementById('sort-dropdown');
  const sw = document.getElementById('sort-wrap');
  if (sd) sd.classList.remove('open');
  if (sw) sw.classList.remove('open');

  if (!isOpen) {
    positionDropdown(drop, chip, false);
    drop.classList.add('open');
  }
}

function clearFilter(dropId, chipId, label, e) {
  e.stopPropagation();
  const chip = document.getElementById(chipId);
  const drop = document.getElementById(dropId);
  chip.textContent = label + ' ▾';
  chip.classList.remove('active');
  drop.querySelectorAll('.size-pill, .price-item').forEach(el => el.classList.remove('selected'));
  drop.classList.remove('open');
}

function selectSizeFilter(el, dropId, chipId, label, e) {
  e.stopPropagation();
  const chip = document.getElementById(chipId);
  const drop = document.getElementById(dropId);
  drop.querySelectorAll('.size-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  chip.textContent = 'Size: ' + label + ' ▾';
  chip.classList.add('active');
  setTimeout(() => drop.classList.remove('open'), 200);
}

function selectPriceFilter(el, dropId, chipId, label, e) {
  e.stopPropagation();
  const chip = document.getElementById(chipId);
  const drop = document.getElementById(dropId);
  drop.querySelectorAll('.price-item').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  chip.textContent = label + ' ▾';
  chip.classList.add('active');
  setTimeout(() => drop.classList.remove('open'), 200);
}

/** Legacy fallback — used by any remaining generic filter-dropdown-items */
function selectFilterOption(dropId, chipId, label, e) {
  e.stopPropagation();
  const chip = document.getElementById(chipId);
  const drop = document.getElementById(dropId);
  chip.textContent = label + ' ▾';
  chip.classList.add('active');
  drop.classList.remove('open');
}


// ══════════════════════════════════════
// SORT DROPDOWN
// ══════════════════════════════════════
function toggleSortDropdown(e) {
  e.stopPropagation();
  const sd  = document.getElementById('sort-dropdown');
  const sw  = document.getElementById('sort-wrap');
  const btn = document.getElementById('sort-btn');
  const isOpen = sd.classList.contains('open');

  // Close filter dropdowns first
  document.querySelectorAll('.filter-dropdown').forEach(d => d.classList.remove('open'));

  if (isOpen) {
    sd.classList.remove('open');
    sw.classList.remove('open');
  } else {
    positionDropdown(sd, btn, true);  // align right edge to button's right edge
    sd.classList.add('open');
    sw.classList.add('open');
  }
}

function selectSort(el, label) {
  event.stopPropagation();
  document.querySelectorAll('.sort-dropdown-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('sort-label').textContent = 'Sort by: ' + label;
  document.getElementById('sort-dropdown').classList.remove('open');
  document.getElementById('sort-wrap').classList.remove('open');
}


// ══════════════════════════════════════
// CATEGORY FILTER CHIPS  (non-dropdown)
// ══════════════════════════════════════
function setFilter(chip) {
  document.querySelectorAll('.filter-chip:not(#size-chip):not(#price-chip)').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
}


// ══════════════════════════════════════
// PRODUCT DETAIL — SIZE BUTTONS
// ══════════════════════════════════════
function selectSize(btn) {
  btn.closest('.size-buttons').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}


// ══════════════════════════════════════
// ACCORDIONS
// ══════════════════════════════════════
function toggleAccordion(head) {
  const item   = head.parentElement;
  const isOpen = item.classList.contains('open');
  head.closest('.detail-info').querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

function toggleFooterAccordion(id) {
  document.getElementById(id).classList.toggle('open');
}


// ══════════════════════════════════════
// IMAGE SWAP (product detail thumbs)
// ══════════════════════════════════════
function swapImg(thumb, src) {
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
  document.getElementById('main-product-img').src = src;
}


// ══════════════════════════════════════
// CART — save / badge / render
// ══════════════════════════════════════
function saveCart() {
  localStorage.setItem('lt_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-badge').textContent = total;
}

function addToCartFromProduct() {
  if (!currentProductId) return;
  const p = PRODUCTS.find(x => x.id === currentProductId);
  if (!p) return;

  const sizeBtn  = document.querySelector('.size-btn.active');
  const size     = sizeBtn ? sizeBtn.textContent : 'M';
  const existing = cart.find(i => i.name === p.name && i.meta.includes(size));

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      name:  p.name,
      price: p.price,
      qty:   1,
      img:   p.thumbs[0],
      meta:  `Size: ${size} | ${p.sub}`,
    });
  }
  saveCart();
  goTo('cart');
}

function removeCartItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function changeCartQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function renderCart() {
  const list      = document.getElementById('cart-items-list');
  const emptyEl   = document.getElementById('empty-cart');
  const contentEl = document.getElementById('cart-content');

  if (cart.length === 0) {
    emptyEl.style.display   = 'flex';
    contentEl.style.display = 'none';
    return;
  }

  emptyEl.style.display   = 'none';
  contentEl.style.display = 'block';

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-title').textContent =
    `Your Bag (${totalItems} ${totalItems === 1 ? 'Item' : 'Items'})`;

  list.innerHTML = cart.map((item, idx) => `
    <div class="cart-card">
      <img class="cart-img" src="${item.img}" alt="${item.name}">
      <div class="cart-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.meta}</div>
        <div class="qty-row">
          <button class="qty-btn" onclick="changeCartQty(${idx}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeCartQty(${idx},  1)">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;padding-right:24px">
        <div style="width:1px"></div>
        <div class="cart-price">${formatINR(item.price * item.qty)}</div>
      </div>
      <button class="delete-btn" onclick="removeCartItem(${idx})">
        <svg viewBox="0 0 24 24">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>`).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax      = Math.round(subtotal * 0.18);
  const total    = subtotal + tax;

  document.getElementById('summary-subtotal').textContent = formatINR(subtotal);
  document.getElementById('summary-tax').textContent      = formatINR(tax);
  document.getElementById('summary-total').textContent    = formatINR(total);
}


// ══════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ══════════════════════════════════════
// INIT
// ══════════════════════════════════════
updateCartBadge();
updateWishBadge();
renderCart();
