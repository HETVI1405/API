let carts = document.getElementsByClassName('cart');
let cartBox = document.getElementById('cartBox');
let count = 0;
let cartItems = {}; // object to store cart items

// Load cart from localStorage when page loads
document.addEventListener("DOMContentLoaded", () => {
    loadCartFromStorage();

    fetch('https://fakestoreapi.com/products?limit=8')
        .then(res => res.json())
        .then(data => {
            const container = document.querySelector('.product');
            container.innerHTML = '';

            data.forEach((item) => {
                const box = document.createElement('div');
                box.className = 'box';
                box.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <h6>${item.title}</h6>
                    <p class="price">$${item.price}</p>
                    <button class="btns">ADD TO CART</button>
                `;
                container.appendChild(box);

                const btn = box.querySelector('.btns');
                btn.addEventListener('click', (event) => addcart(event, item));
            });
        });
});

function addcart(event, item) {
    const button = event.target;
    const box = button.closest('.box');
    const productName = box.querySelector('h6').innerText;
    const productImage = box.querySelector('img').src;
    const productPrice = box.querySelector('.price').innerText;

    // Remove "No items yet!" if first product added
    const emptyMessage = cartBox.querySelector('p');
    if (emptyMessage) {
        emptyMessage.remove();
    }

    // Check if product already exists
    if (cartItems[productName]) {
        cartItems[productName].quantity += 1;
    } else {
        cartItems[productName] = {
            image: productImage,
            price: productPrice,
            quantity: 1
        };
    }

    // Update cart count
    count++;
    carts[0].innerText = count;

    // Save to localStorage
    saveCartToStorage();

    // Update cart box
    renderCart();
}

function renderCart() {
    // Clear old cart
    const existingItems = cartBox.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());

    // Render all cart items
    for (let productName in cartItems) {
        const item = cartItems[productName];
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${item.image}" alt="" width="50" style="margin-right: 10px;">
                <div>
                    <span style="font-weight: bold;">${productName}</span><br>
                    <span>Price: ${item.price}</span><br>
                    <span>Quantity: ${item.quantity}</span>
                </div>
            </div>
            <hr>
        `;
        cartBox.appendChild(cartItem);
    }
}

function saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', count);
}

function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cartItems');
    const storedCount = localStorage.getItem('cartCount');

    if (storedCart) {
        cartItems = JSON.parse(storedCart);
        renderCart();
    }
    if (storedCount) {
        count = parseInt(storedCount);
        carts[0].innerText = count;
    }
}

// Cart Button Click Show/Hide
const cartBtn = document.getElementById('cartBtn');

cartBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    cartBox.style.display = cartBox.style.display === 'block' ? 'none' : 'block';
});

// Outside click to close cartBox
document.addEventListener('click', (event) => {
    if (!cartBox.contains(event.target) && !cartBtn.contains(event.target)) {
        cartBox.style.display = 'none';
    }
});

