/* Minimal checkout flow script used across checkout pages */
(function(){
  const CART_KEYS = ["furnitur_cart", "comforty_cart", "cart"];

  function getCart(){
    for(const k of CART_KEYS){
      try{
        const v = JSON.parse(localStorage.getItem(k));
        if(Array.isArray(v)) return v;
      }catch(e){}
    }
    return [];
  }

  function clearCart(){
    CART_KEYS.forEach(k=>localStorage.removeItem(k));
  }

  function formatMoney(n){
    return "$" + (n||0).toFixed(2);
  }

  // Render cart on cart.html
  function renderCartPage(){
    const root = document.getElementById('cartItemsArea');
    const totals = document.getElementById('cartTotals');
    const proceed = document.getElementById('proceedToCheckout');
    if(!root) return;
    const cart = getCart();
    if(cart.length === 0){
      root.innerHTML = '<p style="color:var(--text)">Your cart is empty.</p>';
      totals.innerText = '';
    } else {
      root.innerHTML = cart.map(item=>`
        <div style="display:flex;align-items:center;gap:16px;border-bottom:1px solid var(--border);padding:12px 0;">
          <img src="${item.image||''}" alt="" style="width:80px;height:80px;object-fit:cover;background:var(--secondary)">
          <div style="flex:1">
            <div style="font-weight:700;color:var(--primary)">${item.name}</div>
            <div style="color:var(--text)">Qty: ${item.qty || 1}</div>
          </div>
          <div style="font-weight:700">${formatMoney((item.price||0)*(item.qty||1))}</div>
        </div>
      `).join('');

      const subtotal = cart.reduce((s,i)=>s + ((i.price||0)*(i.qty||1)),0);
      totals.innerText = 'Subtotal: ' + formatMoney(subtotal);
    }

    if(proceed){
      proceed.addEventListener('click', ()=>{
        window.location.href = 'Customer%20Information.html';
      });
    }
  }

  // Customer information page handler
  function bindCustomerForm(){
    const form = document.getElementById('customerForm');
    if(!form) return;
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem('checkout_customer', JSON.stringify(data));
      window.location.href = 'Shipping%20and%20payment.html';
    });
  }

  // Shipping & payment page handler
  function bindShippingForm(){
    const form = document.getElementById('shippingForm');
    if(!form) return;
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem('checkout_shipping', JSON.stringify(data));
      window.location.href = 'Review%20your%20order.html';
    });
  }

  // Review order page
  function renderReview(){
    const root = document.getElementById('reviewRoot');
    if(!root) return;
    const cart = getCart();
    const customer = JSON.parse(localStorage.getItem('checkout_customer')||'null');
    const shipping = JSON.parse(localStorage.getItem('checkout_shipping')||'null');

    const itemsHtml = cart.map(i=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)"><div>${i.name} x${i.qty||1}</div><div>${formatMoney((i.price||0)*(i.qty||1))}</div></div>`).join('');
    const subtotal = cart.reduce((s,i)=>s + ((i.price||0)*(i.qty||1)),0);
    const shippingCost = 25.00;
    const total = subtotal + shippingCost;

    root.innerHTML = `
      <h3>Customer</h3>
      <div>${customer ? `${customer.fullname || ''} — ${customer.email || ''}` : '—'}</div>
      <h3 style="margin-top:16px">Shipping</h3>
      <div>${shipping ? `${shipping.address || ''}, ${shipping.city || ''}` : '—'}</div>
      <h3 style="margin-top:16px">Items</h3>
      <div>${itemsHtml}</div>
      <div style="margin-top:12px;font-weight:700">Subtotal: ${formatMoney(subtotal)}</div>
      <div>Shipping: ${formatMoney(shippingCost)}</div>
      <div style="margin-top:8px;font-size:18px;font-weight:800">Total: ${formatMoney(total)}</div>
      <div style="margin-top:16px">
        <button id="placeOrderBtn" class="btn-dark">PLACE ORDER</button>
      </div>
    `;

    const btn = document.getElementById('placeOrderBtn');
    if(btn){
      btn.addEventListener('click', ()=>{
        const order = {
          id: 'ORD' + Date.now(),
          tracking: 'TRK' + Math.random().toString(36).slice(2,9).toUpperCase(),
          items: cart,
          subtotal, shippingCost, total,
          customer, shipping,
          placedAt: new Date().toISOString()
        };
        localStorage.setItem('last_order', JSON.stringify(order));
        clearCart();
        window.location.href = 'Tracking.html';
      });
    }
  }

  // Tracking page
  function renderTracking(){
    const root = document.getElementById('trackingRoot');
    if(!root) return;
    const order = JSON.parse(localStorage.getItem('last_order')||'null');
    if(!order){
      root.innerHTML = '<p>No recent order found.</p>';
      return;
    }
    root.innerHTML = `
      <h3>Order Placed</h3>
      <p>Order ID: <strong>${order.id}</strong></p>
      <p>Tracking ID: <strong>${order.tracking}</strong></p>
      <p>Placed At: ${new Date(order.placedAt).toLocaleString()}</p>
      <p style="margin-top:12px">We will email updates to <strong>${order.customer?.email||'—'}</strong>.</p>
    `;
  }

  // Auto-init depending on page
  document.addEventListener('DOMContentLoaded', ()=>{
    renderCartPage();
    bindCustomerForm();
    bindShippingForm();
    renderReview();
    renderTracking();
  });

})();
