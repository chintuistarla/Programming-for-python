const apiUrl = 'http://localhost:5000/api/products'; // Your API endpoint

// Fetch and display all products in the table
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl); // Fetch product data from backend
        if (response.ok) {
            const products = await response.json(); // Parse JSON response

            const tableBody = document.getElementById('product-table-body');
            tableBody.innerHTML = ''; // Clear the current rows in the table

            if (products.length > 0) {
                // Loop through products and display them in the table
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product._id}</td>
                        <td>${product.name}</td>
                        <td>${product.description || 'N/A'}</td>
                        <td>${product.price}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button onclick="editProduct('${product._id}')">Edit</button>
                            <button onclick="deleteProduct('${product._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row); // Append the new row to the table
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="6">No products found.</td>`;
                tableBody.appendChild(row);
            }
        } else {
            console.error('Error fetching products:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Add or update a product
async function saveProduct(event) {
    event.preventDefault();

    const productId = document.getElementById('product-id').value;
    const productData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value, 10),
    };

    if (productId) {
        // Update existing product
        await fetch(`${apiUrl}/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
    } else {
        // Add new product
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
    }

    document.getElementById('product-form').reset(); // Reset form
    fetchProducts(); // Fetch updated data to update table
}

// Delete a product
async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchProducts(); // Fetch updated data to refresh the table
    }
}

// Populate the form for editing
async function editProduct(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const product = await response.json();

    document.getElementById('product-id').value = product._id;
    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description || '';
    document.getElementById('price').value = product.price;
    document.getElementById('stock').value = product.stock;
}

// Initialize event listeners
document.getElementById('product-form').addEventListener('submit', saveProduct);

// Fetch and display products on page load
fetchProducts();
