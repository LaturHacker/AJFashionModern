// Get cart data from localStorage or initialize an empty array
function getCart() {
  const cart = localStorage.getItem('ajCart');
  return cart ? JSON.parse(cart) : [];
}

// Save cart data to localStorage
function saveCart(cart) {
  localStorage.setItem('ajCart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
  const cart = getCart();
  const countElem = document.getElementById('cart-count');
  if (countElem) countElem.innerText = cart.length;
}

// Add an item to the cart
function addToCart(name, price, image) {
  const cart = getCart();
  cart.push({ name, price, image });
  saveCart(cart);
  updateCartCount();
  alert(name + " has been added to your cart!");
}

// Remove an item from the cart by its index
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartCount();
  loadCart(); // refresh cart page
}

// Load cart items on the cart page
function loadCart() {
  const cart = getCart();
  const cartContainer = document.getElementById('cart-items');
  if (!cartContainer) return;
  
  cartContainer.innerHTML = "";
  
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  
  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
  });
}

// Clear the entire cart
function clearCart() {
  localStorage.removeItem('ajCart');
  updateCartCount();
  loadCart();
  alert("Cart has been cleared.");
}
