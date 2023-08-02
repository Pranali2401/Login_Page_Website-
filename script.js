const loginForm = document.getElementById("loginForm");
const customerList = document.getElementById("customerList");
const customerDetails = document.getElementById("customerDetails");
const addCustomerBtn = document.getElementById("addCustomerBtn");
const customerForm = document.getElementById("customerForm");
const customerTable = document.querySelector("#customerList table");
const cancelBtn = document.getElementById("cancelBtn");

let customers = [];

function showLoginPage() {
    loginForm.classList.remove("hidden");
    customerDetails.classList.add("hidden");
    customerList.classList.add("hidden");
}

function showCustomerList() {
    loginForm.classList.add("hidden");
    customerDetails.classList.add("hidden");
    customerList.classList.remove("hidden");
    displayCustomers();
}

function showCustomerDetails() {
    loginForm.classList.add("hidden");
    customerList.classList.add("hidden");
    customerDetails.classList.remove("hidden");
}

// Add event listener for the login form submission
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const loginId = document.getElementById("loginId").value;
    const password = document.getElementById("password").value;
    // Perform login validation here (not implemented in this basic example)

    // Simulate successful login (remove this line in a real application)
    const isLoggedIn = true;

    if (isLoggedIn) {
        showCustomerList();
    }
});

addCustomerBtn.addEventListener("click", function () {
    showCustomerDetails();
    resetCustomerForm();
});

customerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const customerId = parseInt(document.getElementById("customerId").value);
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (customerId) {
        // Update existing customer
        updateCustomer(customerId, firstName, lastName, address, city, state, email, phone);
    } else {
        // Add new customer
        addCustomer(firstName, lastName, address, city, state, email, phone);
    }

    showCustomerList();
});

cancelBtn.addEventListener("click", function () {
    showCustomerList();
});

function generateCustomerId() {
    return customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
}

function resetCustomerForm() {
    document.getElementById("customerId").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

function displayCustomers() {
    customerTable.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
        </tr>
    `;
    customers.forEach(customer => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.firstName} ${customer.lastName}</td>
            <td>${customer.address}</td>
            <td>${customer.city}</td>
            <td>${customer.state}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button onclick="editCustomer(${customer.id})">Edit</button>
                <button onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        `;
        customerTable.appendChild(row);
    });
}

function addCustomer(firstName, lastName, address, city, state, email, phone) {
    const newCustomer = {
        id: generateCustomerId(),
        firstName,
        lastName,
        address,
        city,
        state,
        email,
        phone
    };
    customers.push(newCustomer);
}

function updateCustomer(customerId, firstName, lastName, address, city, state, email, phone) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        customer.firstName = firstName;
        customer.lastName = lastName;
        customer.address = address;
        customer.city = city;
        customer.state = state;
        customer.email = email;
        customer.phone = phone;
    }
}

function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (customer) {
        document.getElementById("customerId").value = customer.id;
        document.getElementById("firstName").value = customer.firstName;
        document.getElementById("lastName").value = customer.lastName;
        document.getElementById("address").value = customer.address;
        document.getElementById("city").value = customer.city;
        document.getElementById("state").value = customer.state;
        document.getElementById("email").value = customer.email;
        document.getElementById("phone").value = customer.phone;
        showCustomerDetails();
    }
}

function deleteCustomer(id) {
    customers = customers.filter(customer => customer.id !== id);
    displayCustomers();
}

// Initially show the login page on page load
showLoginPage();