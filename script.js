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

function addCustomItem() {
  const name = document.getElementById("customName").value.trim();
  const price = parseFloat(document.getElementById("customPrice").value);
  if (!name || isNaN(price) || price < 0) return;

  const btn = document.createElement("button");
  btn.textContent = `${name} - $${price.toFixed(2)}`;
  btn.onclick = () => addToCart({ name, price });
  itemsDiv.appendChild(btn);
  document.getElementById("customName").value = "";
  document.getElementById("customPrice").value = "";
}

document.getElementById("sell").onclick = async () => {
  const name = document.getElementById("cashierName").value.trim();
  const pass = document.getElementById("cashierPass").value;

  if (!name || !pass || Object.keys(cart).length === 0) {
    alert("Missing cashier info or empty cart.");
    return;
  }

  const payload = {
    cashier: name,
    password: pass,
    cart: cart
  };

  try {
    await fetch("https://script.google.com/macros/s/AKfycbwt_8QHS8TL-zs-JG1UpAcpSvDpZCvsNkjROwThxYpsvLhDpnCui2Mo4cjZsMINSziBow/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    clearCart();
    alert("Sale recorded.");
  } catch (e) {
    alert("Error sending data.");
  }
};

document.getElementById("testSell").onclick = clearCart;
document.getElementById("clearItems").onclick = clearCart;

function clearCart() {
  cart = {};
  updateReceipt();
}
