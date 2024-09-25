let balance = 5000;

// Update the balance displayed on the page
document.getElementById('balance').textContent = balance + " BDT";

document.getElementById('donation-btn').addEventListener('click', () => {
    document.getElementById('donation-section').classList.remove('hidden');
    document.getElementById('history-section').classList.add('hidden');
    toggleActive('donation-btn');
});

document.getElementById('history-btn').addEventListener('click', () => {
    document.getElementById('donation-section').classList.add('hidden');
    document.getElementById('history-section').classList.remove('hidden');
    toggleActive('history-btn');
});

function donate(donationId, donationName) {
    // Get donation input and amount element
    const input = document.getElementById(`${donationId}-input`);
    const amountElement = document.getElementById(`${donationId}-amount`);
    const donationAmount = parseFloat(input.value);
  
    // Validate input
    if (isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    
    if (donationAmount > balance) {
      alert("You don't have enough balance.");
      return;
    }
  
    // Deduct amount from balance
    balance -= donationAmount;
    document.getElementById('balance').innerText = Number(balance.toFixed(2));
  
    // Update total donation for the card
    const currentAmount = parseFloat(amountElement.innerText);
    amountElement.innerText = currentAmount + donationAmount;
  
    // Add entry to the history
    addToHistory(donationName, donationAmount);
  
    // Clear input
    input.value = '';
  };
  
  // Function to add entry to history
  function addToHistory(donationName, amount) {
    const historyList = document.getElementById('history-list');
    const date = new Date().toLocaleString();
    
    const li = document.createElement('li');
    li.textContent = `${amount} BDT donated to ${donationName} on ${date}`;
    historyList.appendChild(li);

    // Show modal
    showModal();

  };

function showModal() {
    const modal = document.getElementById('donation-modal');
    modal.classList.add('modal-open');
};

function closeModal() {
    const modal = document.getElementById('donation-modal');
    modal.classList.remove('modal-open');
};

function toggleActive(buttonId) {
    document.getElementById('donation-btn').classList.remove('btn-success');
    document.getElementById('history-btn').classList.remove('btn-success');
    document.getElementById(buttonId).classList.add('btn-success');
};
