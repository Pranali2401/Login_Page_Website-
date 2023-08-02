const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Sample customer data
let customers = [
    { id: 1, firstName: "John", lastName: "Doe", address: "123 Main St", city: "Example City", state: "NY", email: "john@example.com", phone: "123-456-7890" },
    // Add more customers here
];

// Login route (not implemented in this basic example)
app.post('/api/login', (req, res) => {
    // Perform login validation here
    const { loginId, password } = req.body;
    // You can check the loginId and password against a database or a predefined list of valid credentials
    if (loginId === 'admin' && password === 'password') {
        res.json({ success: true, message: 'Login successful.' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid login credentials.' });
    }
});

// Route to get all customers
app.get('/api/customers', (req, res) => {
    res.json(customers);
});

// Route to add a new customer
app.post('/api/customers', (req, res) => {
    const newId = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    const newCustomer = {
        id: newId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        email: req.body.email,
        phone: req.body.phone
    };
    customers.push(newCustomer);
    res.json(newCustomer);
});

// Route to delete a customer by ID
app.delete('/api/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    customers = customers.filter(customer => customer.id !== id);
    res.json({ message: 'Customer deleted successfully.' });
});

// Update route (not implemented in this basic example)
app.put('/api/customers/:id', (req, res) => {
    // To be implemented
    res.json({ message: 'Update functionality will be implemented later.' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});