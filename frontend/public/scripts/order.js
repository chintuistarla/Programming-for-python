const apiUrl = 'http://localhost:5000/api/orders'; // Your API endpoint

// Fetch and display all orders in the table
async function fetchOrders() {
    try {
        const response = await fetch(apiUrl); // Fetch order data from backend
        if (response.ok) {
            const orders = await response.json(); // Parse JSON response

            const tableBody = document.getElementById('order-table-body');
            tableBody.innerHTML = ''; // Clear the current rows in the table

            if (orders.length > 0) {
                // Loop through orders and display them in the table
                orders.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order._id}</td>
                        <td>${order.product}</td>
                        <td>${order.price}</td>
                        <td>${order.quantity}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                            <button onclick="editOrder('${order._id}')">Edit</button>
                            <button onclick="deleteOrder('${order._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row); // Append the new row to the table
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="6">No orders found.</td>`;
                tableBody.appendChild(row);
            }
        } else {
            console.error('Error fetching orders:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

// Add or update an order
async function saveOrder(event) {
    event.preventDefault();

    const orderId = document.getElementById('order-id').value;
    const orderData = {
        product: document.getElementById('product').value,
        price: parseFloat(document.getElementById('price').value),
        quantity: parseInt(document.getElementById('quantity').value, 10),
        totalPrice: parseFloat(document.getElementById('price').value) * parseInt(document.getElementById('quantity').value, 10),
    };

    if (orderId) {
        // Update existing order
        await fetch(`${apiUrl}/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
    } else {
        // Add new order
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
    }

    document.getElementById('order-form').reset(); // Reset form
    fetchOrders(); // Fetch updated data to update table
}

// Delete an order
async function deleteOrder(id) {
    if (confirm('Are you sure you want to delete this order?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchOrders(); // Fetch updated data to refresh the table
    }
}

// Populate the form for editing
async function editOrder(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const order = await response.json();

    document.getElementById('order-id').value = order._id;
    document.getElementById('product').value = order.product;
    document.getElementById('price').value = order.price;
    document.getElementById('quantity').value = order.quantity;
    document.getElementById('totalPrice').value = order.totalPrice;
}

// Initialize event listeners
document.getElementById('order-form').addEventListener('submit', saveOrder);

// Fetch and display orders on page load
fetchOrders();
