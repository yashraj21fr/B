let expenses = [];

// Add Expense Function
function addExpense() {
  const expense = document.getElementById("expense").value;
  const category = document.getElementById("category").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!expense || !category || !amount || !date || !time) {
    alert("Please fill in all fields.");
    return;
  }

  expenses.push({ expense, category, amount, date, time });
  displayExpenses();
  saveExpensesToLocalStorage();
  clearForm();
}

// Display Expenses in Table
function displayExpenses() {
  const tbody = document.querySelector("#expense-table tbody");
  tbody.innerHTML = "";

  expenses.forEach((exp) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${exp.expense}</td>
            <td>${exp.category}</td>
            <td>${exp.amount}</td>
            <td>${exp.date}</td>
            <td>${exp.time}</td>
        `;
    tbody.appendChild(row);
  });
}

// Save Expenses to Local Storage
function saveExpensesToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Load Expenses from Local Storage on Page Load
window.onload = function () {
  if (localStorage.getItem("expenses")) {
    expenses = JSON.parse(localStorage.getItem("expenses"));
    displayExpenses();
  }
};

// Clear Form Fields
function clearForm() {
  document.getElementById("expense").value = "";
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
}

// Export Expenses to CSV
function exportExpenses() {
  const csvContent = expenses
    .map(
      (exp) =>
        `${exp.expense},${exp.category},${exp.amount},${exp.date},${exp.time}`
    )
    .join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "expenses.csv");
  a.click();
}

// Search Expenses
function searchExpenses() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredExpenses = expenses.filter((exp) =>
    exp.expense.toLowerCase().includes(searchTerm)
  );
  displayFilteredExpenses(filteredExpenses);
}

function displayFilteredExpenses(filteredExpenses) {
  const tbody = document.querySelector("#expense-table tbody");
  tbody.innerHTML = "";

  filteredExpenses.forEach((exp) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${exp.expense}</td>
            <td>${exp.category}</td>
            <td>${exp.amount}</td>
            <td>${exp.date}</td>
            <td>${exp.time}</td>
        `;
    tbody.appendChild(row);
  });
}
