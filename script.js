const items = [
  { name: "Gatorade Zero", price: 3.00 },
  { name: "Izze", price: 2.00 },
  { name: "Welch’s Fruit Snacks (3 for $1)", price: 1.00},
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

let total = 0;

const totalDisplay = document.getElementById("total");
const itemsDiv = document.getElementById("items");

items.forEach(item => {
  const btn = document.createElement("button");
  btn.textContent = `${item.name} - $${item.price.toFixed(2)}`;
  btn.onclick = () => {
    total += item.price;
    totalDisplay.textContent = total.toFixed(2);
  };
  itemsDiv.appendChild(btn);
});

document.getElementById("reset").onclick = () => {
  total = 0;
  totalDisplay.textContent = "0.00";
};
