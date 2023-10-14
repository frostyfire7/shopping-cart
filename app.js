const productButtons = document.querySelectorAll(".add-to-cart");
const cart = document.getElementById("cart");
const cartSubtotal = document.getElementById("cart-subtotal");
const promoCodeInput = document.getElementById("promo-code");
const cartTotal = document.getElementById("cart-total");
const discountDisplay = document.getElementById("discount");
const cartItems = [];

// promo
const promo = [
  {
    label: "DISC10",
    value: 0.1,
  },
  {
    label: "DISC50",
    value: 0.5,
  },
  {
    label: "DISC75",
    value: 0.75,
  },
];

// Event listener untuk memasukkan ke keranjang
productButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

// Event listener untuk memasukkan kode promo
promoCodeInput.addEventListener("input", () => {
  updateTotal(cartItems.reduce((acc, item) => acc + item.price, 0));
});

// Fungsi untuk menambahkan ke keranjang
function addToCart(event) {
  const button = event.target;
  const productName = button.getAttribute("data-name");
  const productPrice = parseFloat(button.getAttribute("data-price"));
  const item = { name: productName, price: productPrice };
  cartItems.push(item);
  displayCart();
}

// Fungsi untuk menampilkan yang ada di keranjang
function displayCart() {
  cart.innerHTML = "";
  let subtotal = 0;

  cartItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.textContent = `${item.name} - Rp. ${item.price}`;
    cart.appendChild(itemElement);
    subtotal += item.price;
  });

  cartSubtotal.textContent = `Sub Total: Rp. ${subtotal.toFixed(2)}`;
  updateTotal(subtotal);
}

// Fungsi untuk mengupdate harga subtotals
function updateTotal(subtotal) {
  let total = subtotal;
  const promoCode = promoCodeInput.value;

  promo.forEach((code) => {
    if (promoCode === code.label) {
      total *= 1 - code.value;
      discountDisplay.textContent = `-${code.value * 100}% discount applied`;
    }
  });

  cartTotal.textContent = `Total: Rp. ${total.toFixed(2)}`;
}
