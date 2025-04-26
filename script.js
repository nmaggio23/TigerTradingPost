const items = [
  { name: "Gatorade Zero", price: 3.00 },
  { name: "Izze", price: 2.00 },
  { name: "Welch’s Fruit Snacks (3 for $1)", price: 1.00 / 3 },
  { name: "Baked Chips", price: 2.50 },
  { name: "Cheez-Its", price: 2.00 },
  { name: "Scrunchies (2 for $1)", price: 1.00 / 2 },
  { name: "Clawclips", price: 1.00 },
  { name: "Hair Ties (4 for $1)", price: 1.00 / 4 },
  { name: "Chapstick", price: 1.00 },
  { name: "USB to USBC Cord", price: 7.00 },
  { name: "USBC to Lightning Cord", price: 7.00 },
  { name: "Charging Block", price: 7.00 },
  { name: "iPad Stylus", price: 1.00 },
  { name: "2 Gatorade for $5", price: 5.00 },
  { name: "2 Izze for $3", price: 3.00 },
  { name: "Charging Bundle", price: 12.00 },
];

let cart = {};
let total = 0;

const totalDisplay = document.getElementById("total");
const receiptDiv = document.getElementById("receipt-items");
const itemsDiv = document.getElementById("items");

function updateReceipt() {
  receiptDiv.innerHTML = "";
  total = 0;

  for (const [itemName, { quantity, price }] of Object.entries(cart)) {
    const lineTotal = quantity * price;
    total += lineTotal;

    const div = document.createElement("div");
    div.textContent = `${itemName} x${quantity} — $${lineTotal.toFixed(2)}`;
    receiptDiv.appendChild(div);
  }

  totalDisplay.textContent = total.toFixed(2);
}

function addToCart(item) {
  if (!cart[item.name]) {
    cart[item.name] = { quantity: 1, price: item.price };
  } else {
    cart[item.name].quantity += 1;
  }
  updateReceipt();
}

items.forEach(item => {
  const btn = document.createElement("button");
  btn.textContent = `${item.name} - $${item.price.toFixed(2)}`;
  btn.onclick = () => addToCart(item);
  itemsDiv.appendChild(btn);
});

document.getElementById("sell").onclick = clearCart;
document.getElementById("clearItems").onclick = clearCart;

function clearCart() {
  cart = {};
  updateReceipt();
}
