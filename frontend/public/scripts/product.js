const apiUrl = 'http://localhost:5000/api/products'; // Your API endpoint

// Add a new product
document.getElementById('addProductForm').onsubmit = async (e) => {
    e.preventDefault();

    const productData = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value, 10),
    };

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });

    alert((await res.json()).message);
    document.getElementById('addProductForm').reset();
};

// Fetch product for editing
async function fetchProduct() {
    const productName = document.getElementById('editProductName').value;
    const res = await fetch(`${apiUrl}/${productName}`);
    if (res.ok) {
        const product = await res.json();
        const details = `
            <input type="text" id="editName" value="${product.name}" required />
            <textarea id="editDescription">${product.description || ''}</textarea>
            <input type="number" id="editPrice" value="${product.price}" required />
            <input type="number" id="editStock" value="${product.stock}" required />
            <button type="button" onclick="updateProduct('${product.name}')">Update</button>
        `;
        document.getElementById('editProductDetails').innerHTML = details;
    } else {
        alert('Product not found');
    }
}

// Update product details
async function updateProduct(name) {
    const updatedProduct = {
        name: document.getElementById('editName').value,
        description: document.getElementById('editDescription').value,
        price: parseFloat(document.getElementById('editPrice').value),
        stock: parseInt(document.getElementById('editStock').value, 10),
    };

    const res = await fetch(`${apiUrl}/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
    });

    alert((await res.json()).message);
}

// Delete a product
document.getElementById('deleteProductForm').onsubmit = async (e) => {
    e.preventDefault();
    const productName = document.getElementById('deleteProductName').value;

    const res = await fetch(`${apiUrl}/${productName}`, {
        method: 'DELETE',
    });

    alert((await res.json()).message);
};
