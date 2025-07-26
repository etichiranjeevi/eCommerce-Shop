// Toggle mobile menu
function toggleMenu() {
    const menuItems = document.getElementById('menuItems');
    menuItems.classList.toggle('active');
  }
  
  // Toggle search bar
  document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    
    searchToggle.addEventListener('click', function(e) {
      e.preventDefault();
      searchContainer.classList.toggle('active');
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Product detail page functionality
    if (window.location.pathname.includes('product-detail.html')) {
      setupProductDetailPage();
    }
    
    // Products page functionality
    if (window.location.pathname.includes('products.html')) {
      setupProductsPage();
    }
    
    // Cart page functionality
    if (window.location.pathname.includes('cart.html')) {
      setupCartPage();
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
          alert('Thank you for subscribing to our newsletter!');
          this.reset();
        }
      });
    }
    
    // Add to cart functionality for all product cards
    const addToCartButtons = document.querySelectorAll('.product-card .btn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        alert(`${productName} has been added to your cart!`);
      });
    });
  });
  
  // Product detail page functionality
  function setupProductDetailPage() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Size and color options
    const sizeOptions = document.querySelectorAll('.size-option');
    const colorOptions = document.querySelectorAll('.color-option');
    
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    colorOptions.forEach(option => {
      option.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Load product details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
      // In a real application, you would fetch product details from a server
      // For this demo, we'll just use the product ID to show different content
      document.getElementById('product-name').textContent = `Product ${productId}`;
    }
  }
  
  // Change product image on thumbnail click
  function changeImage(thumbnail) {
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = thumbnail.src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
  }
  
  // Quantity increment/decrement
  function incrementQuantity() {
    const input = document.getElementById('quantity-input');
    input.value = parseInt(input.value) + 1;
  }
  
  function decrementQuantity() {
    const input = document.getElementById('quantity-input');
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
    }
  }
  
  // Add to cart from product detail page
  function addToCart() {
    const productName = document.getElementById('product-name').textContent;
    const quantity = document.getElementById('quantity-input').value;
    
    alert(`${quantity} x ${productName} has been added to your cart!`);
  }
  
  // Products page functionality
  function setupProductsPage() {
    // Price range slider
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
      priceRange.addEventListener('input', function() {
        priceValue.textContent = `$${this.value}`;
      });
    }
  }
  
  // Cart page functionality
  function setupCartPage() {
    checkEmptyCart();
  }
  
  // Update cart item quantity
  function updateCartItemQuantity(itemId, change) {
    const quantityInput = document.getElementById(`cart-item-${itemId}-quantity`);
    let newQuantity = parseInt(quantityInput.value) + change;
    
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    
    quantityInput.value = newQuantity;
    updateCartTotals();
  }
  
  // Remove cart item
  function removeCartItem(itemId) {
    const cartItem = document.querySelector(`.cart-item:has(#cart-item-${itemId}-quantity)`);
    
    if (cartItem) {
      cartItem.remove();
      updateCartTotals();
      checkEmptyCart();
    }
  }
  
  // Update cart totals
  function updateCartTotals() {
    // In a real application, you would recalculate the totals based on the items in the cart
    // For this demo, we'll just show a message
    console.log('Cart totals updated');
  }
  
  // Check if cart is empty
  function checkEmptyCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartContainer = document.getElementById('cart-container');
    const emptyCart = document.getElementById('empty-cart');
    
    if (cartItems.length === 0) {
      cartContainer.style.display = 'none';
      emptyCart.style.display = 'block';
    } else {
      cartContainer.style.display = 'block';
      emptyCart.style.display = 'none';
    }
  }