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

productButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

promoCodeInput.addEventListener("input", () => {
  updateTotal(cartItems.reduce((acc, item) => acc + item.price, 0));
});

function addToCart(event) {
  const button = event.target;
  const productName = button.getAttribute("data-name");
  const productPrice = parseFloat(button.getAttribute("data-price"));
  const item = { name: productName, price: productPrice };
  cartItems.push(item);
  displayCart();
}

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
