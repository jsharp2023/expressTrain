const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Global store
let store = [
    {
        name: 'apple',
        price: 1.5
    }
];

// Routes
// Root Route ("/")
app.get('/', (req, res) => {
    res.json(store);
});

// Get All Products Route ("/get-all-products")
app.get('/get-all-products', (req, res) => {
    const productNames = store.map(product => product.name);
    res.json(productNames);
});

// Get Product by Name Route ("/get-product/:productName")
app.get('/get-product/:productName', (req, res) => {
    const productName = req.params.productName;
    const product = store.find(item => item.name === productName);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Create Product Route ("/create-product")
app.post('/create-product', (req, res) => {
    const newProduct = req.body;
    const productExists = store.find(item => item.name === newProduct.name);
    
    if (productExists) {
        res.status(400).send('Product already exists');
    } else {
        store.push(newProduct);
        res.send('Product added');
    }
});

// Delete Product Route ("/delete-product/:productName")
app.delete('/delete-product/:productName', (req, res) => {
    const productName = req.params.productName;
    const productIndex = store.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        store.splice(productIndex, 1);
        res.send('Product deleted');
    } else {
        res.status(404).send('Product not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


