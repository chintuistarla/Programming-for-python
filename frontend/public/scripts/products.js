const apiUrl = 'http://localhost:5000/api/products'; // Backend API endpoint

// Fetch and display all products in the table
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const products = await response.json();
            const tableBody = document.getElementById('productTableBody');
            tableBody.innerHTML = ''; // Clear the table body

            if (products.length > 0) {
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.price}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button onclick="editProduct('${product._id}')">Edit</button>
                            <button onclick="deleteProduct('${product._id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="5">No products found.</td>`;
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
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const productId = document.getElementById('productId')?.value; // Check if editing
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

    document.getElementById('productForm').reset();
    document.getElementById('productId')?.remove(); // Remove hidden input if it exists
    fetchProducts(); // Refresh product list
});

// Edit a product
async function editProduct(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    if (response.ok) {
        const product = await response.json();

        document.getElementById('name').value = product.name;
        document.getElementById('description').value = product.description;
        document.getElementById('price').value = product.price;
        document.getElementById('stock').value = product.stock;

        // Add hidden input for product ID
        if (!document.getElementById('productId')) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.id = 'productId';
            input.value = product._id;
            document.getElementById('productForm').appendChild(input);
        }
    }
}

// Delete a product
async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchProducts(); // Refresh product list
    }
}

// Fetch and display products on page load
fetchProducts();
