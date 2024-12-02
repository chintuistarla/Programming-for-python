const apiUrl = 'http://localhost:3000/api/suppliers'; // Your API endpoint

// Fetch and display all suppliers in the table
async function fetchSuppliers() {
    try {
        const response = await fetch(apiUrl); // Fetch supplier data from backend
        if (response.ok) {
            const suppliers = await response.json(); // Parse JSON response

            const tableBody = document.getElementById('supplier-table-body');
            tableBody.innerHTML = ''; // Clear the current rows in the table

            if (suppliers.length > 0) {
                // Loop through suppliers and display them in the table
                suppliers.forEach(supplier => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${supplier._id}</td>
                        <td>${supplier.name}</td>
                        <td>${supplier.email}</td>
                        <td>${supplier.contact}</td>
                        <td>${supplier.productsSupplied.join(', ')}</td>
                        <td>
                            <button onclick="editSupplier('${supplier._id}')">Edit</button>
                            <button onclick="deleteSupplier('${supplier._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row); // Append the new row to the table
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="6">No suppliers found.</td>`;
                tableBody.appendChild(row);
            }
        } else {
            console.error('Error fetching suppliers:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching suppliers:', error);
    }
}

// Add or update a supplier
async function saveSupplier(event) {
    event.preventDefault();

    const supplierId = document.getElementById('supplier-id').value;
    const supplierData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        contact: document.getElementById('contact').value,
        productsSupplied: document.getElementById('products-supplied').value.split(',').map(p => p.trim()),
    };

    if (supplierId) {
        // Update existing supplier
        await fetch(`${apiUrl}/${supplierId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(supplierData),
        });
    } else {
        // Add new supplier
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(supplierData),
        });
    }

    document.getElementById('supplier-form').reset(); // Reset form
    fetchSuppliers(); // Fetch updated data to update table
}

// Delete a supplier
async function deleteSupplier(id) {
    if (confirm('Are you sure you want to delete this supplier?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchSuppliers(); // Fetch updated data to refresh the table
    }
}

// Populate the form for editing
async function editSupplier(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const supplier = await response.json();

    document.getElementById('supplier-id').value = supplier._id;
    document.getElementById('name').value = supplier.name;
    document.getElementById('email').value = supplier.email;
    document.getElementById('contact').value = supplier.contact;
    document.getElementById('products-supplied').value = supplier.productsSupplied.join(', ');
}

// Initialize event listeners
document.getElementById('supplier-form').addEventListener('submit', saveSupplier);

// Fetch and display suppliers on page load
fetchSuppliers();
