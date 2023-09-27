const products = require("../JsonData/products.json");
const fs = require("fs");
const path = require("path");

const updateProducts = path.join(__dirname, "../JsonData/products.json");

function saveDataToJsonFile(products) {
    fs.writeFileSync(updateProducts, JSON.stringify(products, null, 2));
}

exports.getAllProducts = (req ,res) => {
    res.json(products);
}

exports.getProduct = (req, res) =>{
    const productId = parseInt(req.params.id);
    const product = products.find((u) => parseInt(u.id) === productId);

    if (!product) {
        return res.status(404).json({ error: 'product not found' });
    }
    res.json(product);
}

exports.addProduct = (req, res) =>{
    const newProduct = req.body;
    products.push(newProduct);
    saveDataToJsonFile(products);
    res.status(200).json({success : 'product created successfully'});
}

exports.editProduct = (req, res) =>{
    const productId = parseInt(req.params.id);
    const { name, price, description, quantity, product_type } = req.body;
    if (!name || !price || !description || !quantity || !product_type) {
        return res.status(400).json({ error: 'Please provide name and email' });
    }
    const product = products.find((u) => parseInt(u.id) === productId);

    if (!product) {
        return res.status(404).json({ error: 'product not found' });
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.quantity = quantity;
    product.product_type = product_type;
    saveDataToJsonFile(products);

    res.json(product);
}
exports.deleteProduct = (req, res) =>{
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((u) =>parseInt(u.id) === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'product not found' });
    }
    products.splice(productIndex, 1);
    saveDataToJsonFile(products);
    res.status(204).send();
}
exports.outOfStockProduct = (req, res) =>{
    const outOfStockProducts = products.filter((p) => p.quantity < 5);
    res.json(outOfStockProducts);
}
exports.filterProduct = (req, res) =>{
    const value = req.query.product_type
    const filteredProduct = products.filter((p)=>p.product_type === value)
    res.json(filteredProduct);
}
exports.sortProduct = (req, res)=>{    
    const sortedProduct = products.sort((a,b) => a.price - b.price)
    res.json(sortedProduct)
}
exports.searchProduct = (req, res) => {
    const value = req.query.search
    const searchedProduct = products.filter((p) => (
        (p.name && p.name.toLowerCase().includes(value.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(value.toLowerCase()))
      ));      
    res.json(searchedProduct);
}
