const apiUrl = 'http://localhost:5000/api/customers'; // Your API endpoint

// Add a new customer
document.getElementById('addCustomerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const customerData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value, 10),
        gender: document.getElementById('gender').value,
        occupation: document.getElementById('occupation').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });

    alert((await response.json()).message);
    document.getElementById('addCustomerForm').reset();
});

// Fetch a customer to edit
async function fetchCustomer() {
    const email = document.getElementById('editEmail').value;
    const response = await fetch(`${apiUrl}/${email}`);
    const customer = await response.json();

    const editSection = document.getElementById('editCustomerDetails');
    if (customer.name) {
        editSection.innerHTML = `
            <form id="updateCustomerForm">
                <input type="text" id="editName" value="${customer.name}" required />
                <input type="number" id="editAge" value="${customer.age}" required />
                <select id="editGender">
                    <option value="Male" ${customer.gender === 'Male' ? 'selected' : ''}>Male</option>
                    <option value="Female" ${customer.gender === 'Female' ? 'selected' : ''}>Female</option>
                </select>
                <input type="text" id="editOccupation" value="${customer.occupation}" />
                <textarea id="editAddress">${customer.address}</textarea>
                <input type="text" id="editPhone" value="${customer.phone}" required />
                <button type="submit">Update</button>
            </form>
        `;

        document.getElementById('updateCustomerForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const updatedCustomer = {
                name: document.getElementById('editName').value,
                age: parseInt(document.getElementById('editAge').value, 10),
                gender: document.getElementById('editGender').value,
                occupation: document.getElementById('editOccupation').value,
                address: document.getElementById('editAddress').value,
                phone: document.getElementById('editPhone').value
            };

            const updateResponse = await fetch(`${apiUrl}/${email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCustomer)
            });

            alert((await updateResponse.json()).message);
        });
    } else {
        alert('Customer not found');
    }
}

// Delete a customer
document.getElementById('deleteCustomerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('deleteEmail').value;
    const response = await fetch(`${apiUrl}/${email}`, {
        method: 'DELETE'
    });

    alert((await response.json()).message);
});
