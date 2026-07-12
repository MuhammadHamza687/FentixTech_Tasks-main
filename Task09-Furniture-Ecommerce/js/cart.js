/**
 * cart.js
 * Handles all shopping cart logic:
 *  - Add / remove / update quantity
 *  - localStorage persistence
 *  - Cart sidebar UI rendering
 *  - Cart count badge updates
 */

const CART_KEY = "comforty_cart";

/* ── Retrieve cart from localStorage ── */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

/* ── Save cart to localStorage ── */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ── Add product to cart (or increase qty if exists) ── */
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  renderCartSidebar();
  showToast(`"${product.name}" added to cart!`);
  animateCartBadge();
}

/* ── Remove item completely from cart ── */
function removeFromCart(productId) {
  let cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartCount();
  renderCartSidebar();
}

/* ── Update quantity of a cart item ── */
function updateCartQty(productId, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
  updateCartCount();
  renderCartSidebar();
}

/* ── Clear entire cart ── */
function clearCart() {
  saveCart([]);
  updateCartCount();
  renderCartSidebar();
}

/* ── Calculate total item count ── */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/* ── Calculate subtotal ── */
function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* ── Update cart badge in navbar ── */
function updateCartCount() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

/* ── Animate cart badge ── */
function animateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  badge.classList.remove("bump");
  void badge.offsetWidth; // reflow to restart animation
  badge.classList.add("bump");
}

/* ── Render cart sidebar items ── */
function renderCartSidebar() {
  const cart = getCart();
  const cartBody = document.getElementById("cartItems");
  const cartFooter = document.getElementById("cartFooter");
  const subtotalEl = document.getElementById("cartSubtotal");

  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <i class="bi bi-handbag"></i>
        <p>Your cart is empty.</p>
        <small>Add some products to get started!</small>
      </div>`;
    if (cartFooter) cartFooter.style.display = "none";
    return;
  }

  if (cartFooter) cartFooter.style.display = "block";

  /* Build cart item HTML */
  cartBody.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item" data-id="${item.id}">
      <img
        src="${item.image}"
        alt="${item.name}"
        class="cart-item-img"
        loading="lazy"
        onerror="this.src='https://placehold.co/72x72/e6f4f5/007580?text=Item'"
      />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</p>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)" aria-label="Decrease quantity">
            <i class="bi bi-dash"></i>
          </button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)" aria-label="Increase quantity">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart(${item.id})" aria-label="Remove item">
        <i class="bi bi-trash3"></i>
      </button>
    </div>`
    )
    .join("");

  /* Update subtotal */
  if (subtotalEl) {
    subtotalEl.textContent = `$${getCartSubtotal().toLocaleString()}`;
  }
}

/* ── Show toast notification ── */
function showToast(message) {
  const toastEl = document.getElementById("cartToast");
  const msgEl = document.getElementById("toastMessage");
  if (!toastEl || !msgEl) return;
  msgEl.textContent = message;
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2500 });
  toast.show();
}