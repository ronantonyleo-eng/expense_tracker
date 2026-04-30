// Get elements
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");

const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");

// Load saved data or empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add transaction
addBtn.addEventListener("click", addTransaction);

function addTransaction() {
  const description = text.value.trim();
  const value = Number(amount.value);
  const transactionType = type.value;

  if (description === "" || value <= 0) {
    alert("Please enter valid details.");
    return;
  }

  const transaction = {
    id: Date.now(),
    description: description,
    amount: value,
    type: transactionType
  };

  transactions.push(transaction);

  saveData();
  updateUI();

  // Clear inputs
  text.value = "";
  amount.value = "";
  type.value = "income";
}

// Update UI
function updateUI() {
  list.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        ${item.description} - ₹${item.amount}
      </span>
      <button onclick="deleteTransaction(${item.id})">🗑</button>
    `;

    list.appendChild(li);

    if (item.type === "income") {
      totalIncome += item.amount;
      li.classList.add("plus");
    } else {
      totalExpense += item.amount;
      li.classList.add("minus");
    }
  });

  const totalBalance = totalIncome - totalExpense;

  income.innerText = `₹${totalIncome}`;
  expense.innerText = `₹${totalExpense}`;
  balance.innerText = `₹${totalBalance}`;
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(item => item.id !== id);

  saveData();
  updateUI();
}

// Save to localStorage
function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Load page
updateUI();
