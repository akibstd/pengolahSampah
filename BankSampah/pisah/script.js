const priceList = {
    'botol': 3000,
    'kardus': 2000,
    'kertas': 1500,
    'kaleng': 4000
};

let transactions = [];

document.getElementById('wasteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const type = document.getElementById('wasteType').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const price = priceList[type];
    const total = price * weight;
    const date = new Date().toLocaleDateString('id-ID');

    transactions.push({
        date,
        type,
        weight,
        price,
        total
    });

    updateTable();
    updateStatistics();
    this.reset();
});

function updateTable() {
    const tbody = document.querySelector('#wasteTable tbody');
    tbody.innerHTML = '';

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>${transaction.weight} kg</td>
            <td>Rp ${transaction.price.toLocaleString('id-ID')}</td>
            <td>Rp ${transaction.total.toLocaleString('id-ID')}</td>
        `;
        tbody.appendChild(row);
    });
}

function updateStatistics() {
    const totalWeight = transactions.reduce((sum, t) => sum + t.weight, 0);
    const totalIncome = transactions.reduce((sum, t) => sum + t.total, 0);

    document.getElementById('totalWeight').textContent = `${totalWeight.toFixed(1)} kg`;
    document.getElementById('totalIncome').textContent = `Rp ${totalIncome.toLocaleString('id-ID')}`;
    document.getElementById('totalTransactions').textContent = `${transactions.length} setoran`;
}