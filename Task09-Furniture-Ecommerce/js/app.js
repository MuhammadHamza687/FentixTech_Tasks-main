/* ── Products Data ── */
const products = [
  {
    id: 1,
    name: "URBAN LUX HIGH CHAIR",
    price: 2668.15,
    category: "CHAIR",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "MODERN BLACK HANGING LIGHT",
    price: 1595.60,
    category: "HANGING LIGHT",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "METRO FUSION TABLE",
    price: 2238.30,
    category: "TABLE",
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "LUMIN DESK LAMP",
    price: 1477.80,
    category: "LAMP",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "TIMELESS EDGE HANGING CLOCK",
    price: 1071.60,
    category: "CLOCK",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "ZENITH PENDANT LIGHT",
    price: 2069.59,
    category: "HANGING LIGHT",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=400&auto=format&fit=crop"
  }
];

/* ── DOM Elements ── */
const productsGrid = document.getElementById("productsGrid");
const categoryFilters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
const cartBadge = document.getElementById("cartBadge");

const cartBtn = document.getElementById("cartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutBtn = document.querySelector(".checkout-btn");
const toast = document.getElementById("toast");

/* ── State ── */
let currentCategory = "ALL";
let searchQuery = "";
let cart = JSON.parse(localStorage.getItem("furnitur_cart")) || [];

/* ── Initialization ── */
function init() {
  renderCategoryFilters();
  renderProducts();
  updateCartUI();

  // Search Event
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderProducts();
  });

  // Cart Events
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleCart(true);
  });
  closeCartBtn.addEventListener("click", () => toggleCart(false));
  cartOverlay.addEventListener("click", () => toggleCart(false));
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }
}

/* ── Render Category Filters ── */
function renderCategoryFilters() {
  // Hardcoded filters based on the design
  const filters = ["ALL", "ON SALE", "SOFA", "HANGING LIGHT"];
  
  categoryFilters.innerHTML = filters.map(cat => `
    <button class="filter-btn ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join("");

  const buttons = categoryFilters.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      buttons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentCategory = e.target.getAttribute("data-category");
      renderProducts();
    });
  });
}

/* ── Render Products ── */
function renderProducts() {
  const filtered = products.filter(p => {
    // Custom filter logic
    let matchCategory = false;
    if (currentCategory === "ALL") matchCategory = true;
    else if (currentCategory === "HANGING LIGHT" && p.category === "HANGING LIGHT") matchCategory = true;
    else if (currentCategory === "SOFA" && p.category === "SOFA") matchCategory = true;
    else if (currentCategory === "ON SALE" && p.oldPrice) matchCategory = true; // Assuming sale means oldPrice exists
    
    const matchSearch = p.name.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    productsGrid.style.display = "none";
    noResults.style.display = "block";
  } else {
    productsGrid.style.display = "grid";
    noResults.style.display = "none";
    
    productsGrid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}">
          <button class="add-to-cart" onclick="addToCart(${p.id})">
            <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
        <h3>${p.name}</h3>
        <div class="product-stars">
          <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
        </div>
        <div class="product-price">
          $${p.price.toFixed(2)}
        </div>
      </div>
    `).join("");
  }
}

/* ── Cart Functions ── */
function toggleCart(show) {
  if (show) {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("active");
  } else {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("active");
  }
}

window.addToCart = function(id) {
  const product = products.find(p => p.id === id);
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showToast();
};

window.updateQty = function(id, change) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    updateCartUI();
  }
};

window.removeItem = function(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
};

function saveCart() {
  localStorage.setItem("furnitur_cart", JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadge.innerText = totalItems;
  cartBadge.style.display = totalItems > 0 ? "flex" : "none";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p style='color: var(--text); text-align: center; margin-top: 20px;'>Your cart is empty.</p>";
    cartSubtotal.innerText = "$0.00";
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="item-details">
        <h4>${item.name}</h4>
        <div class="item-price">$${item.price.toFixed(2)}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
          <span style="font-size:14px; font-weight: 500;">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeItem(${item.id})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  cartSubtotal.innerText = "$" + total.toFixed(2);
}

function showToast() {
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

init();