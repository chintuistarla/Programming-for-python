const apiUrl = 'http://localhost:5000/api/customers'; // Your API endpoint

// Fetch and display all customers in the table
async function fetchCustomers() {
    try {
        const response = await fetch(apiUrl); // Fetch customer data from backend
        if (response.ok) {
            const customers = await response.json(); // Parse JSON response

            const tableBody = document.getElementById('customer-table-body');
            tableBody.innerHTML = ''; // Clear the current rows in the table

            if (customers.length > 0) {
                // Loop through customers and display them in the table
                customers.forEach(customer => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${customer._id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.age}</td>
                        <td>${customer.gender}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.address || 'N/A'}</td>
                        <td>${customer.occupation || 'N/A'}</td>
                        <td>
                            <button onclick="editCustomer('${customer._id}')">Edit</button>
                            <button onclick="deleteCustomer('${customer._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row); // Append the new row to the table
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="8">No customers found.</td>`;
                tableBody.appendChild(row);
            }
        } else {
            console.error('Error fetching customers:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
}

// Add or update a customer
async function saveCustomer(event) {
    event.preventDefault();

    const customerId = document.getElementById('customer-id').value;
    const customerData = {
        name: document.getElementById('name').value,
        age: parseInt(document.getElementById('age').value, 10),
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        occupation: document.getElementById('occupation').value,
    };

    if (customerId) {
        // Update existing customer
        await fetch(`${apiUrl}/${customerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });
    } else {
        // Add new customer
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });
    }

    document.getElementById('customer-form').reset(); // Reset form
    fetchCustomers(); // Fetch updated data to update table
}

// Delete a customer
async function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchCustomers(); // Fetch updated data to refresh the table
    }
}

// Populate the form for editing
async function editCustomer(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const customer = await response.json();

    document.getElementById('customer-id').value = customer._id;
    document.getElementById('name').value = customer.name;
    document.getElementById('age').value = customer.age;
    document.getElementById('gender').value = customer.gender;
    document.getElementById('phone').value = customer.phone;
    document.getElementById('address').value = customer.address || '';
    document.getElementById('occupation').value = customer.occupation || '';
}

// Initialize event listeners
document.getElementById('customer-form').addEventListener('submit', saveCustomer);

// Fetch and display customers on page load
fetchCustomers();
