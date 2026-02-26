const products = [
  {
    id: "gm-101",
    name: "Premium Rice Pack (5kg)",
    description: "Long-grain pantry staple sourced for everyday cooking.",
    price: 14.99
  },
  {
    id: "gm-102",
    name: "Kitchen Paper Towels",
    description: "Highly absorbent twin-roll set for home and office use.",
    price: 6.5
  },
  {
    id: "gm-103",
    name: "Family Dishwashing Liquid",
    description: "Grease-cutting formula with fresh citrus fragrance.",
    price: 5.25
  },
  {
    id: "gm-104",
    name: "Laundry Detergent Powder",
    description: "Deep-clean blend for bright and long-lasting fabric care.",
    price: 9.75
  },
  {
    id: "gm-105",
    name: "Reusable Food Storage Set",
    description: "Microwave-safe containers for easy meal prep and storage.",
    price: 12.0
  },
  {
    id: "gm-106",
    name: "Bath Soap Value Bundle",
    description: "Six moisturizing bars for daily personal care routines.",
    price: 7.2
  }
];

const cart = new Map();

const productGrid = document.getElementById("productGrid");
const template = document.getElementById("productTemplate");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function renderProducts() {
  products.forEach((product) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".name").textContent = product.name;
    clone.querySelector(".description").textContent = product.description;
    clone.querySelector(".price").textContent = currency.format(product.price);

    clone.querySelector(".add").addEventListener("click", () => {
      addToCart(product.id);
    });

    productGrid.appendChild(clone);
  });
}

function addToCart(productId) {
  const currentQty = cart.get(productId) ?? 0;
  cart.set(productId, currentQty + 1);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  if (!cart.size) {
    cartItems.innerHTML = '<p class="empty">Your cart is empty.</p>';
    cartTotal.textContent = currency.format(0);
    cartCount.textContent = "0";
    return;
  }

  let total = 0;
  let count = 0;

  for (const [id, qty] of cart.entries()) {
    const product = products.find((item) => item.id === id);
    if (!product) {
      continue;
    }

    const linePrice = product.price * qty;
    total += linePrice;
    count += qty;

    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <strong>${product.name}</strong>
      <p>Qty: ${qty}</p>
      <small>${currency.format(linePrice)}</small>
    `;

    cartItems.appendChild(item);
  }

  cartTotal.textContent = currency.format(total);
  cartCount.textContent = String(count);
}

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);

renderProducts();
renderCart();
