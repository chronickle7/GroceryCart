const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product');
const methodOverride = require('method-override')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log(" Mongo Connection open");
    })
    .catch(err => {
        console.log("error in mongo connection is ", err);
    })



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    }
    else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }

})


const category = ['fruit', 'vegetable', 'dairy'];
////////////New Product ///////////////////////

app.get('/products/new', (req, res) => {
    res.render('products/new', { category });
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})
//////////////////////////////////////////////////////
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/show', { foundProduct })
})

////////////////Editing and Updating Product/////////////

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, category });
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true })
    res.redirect(`/products/${product._id}`);
})


///////////////DELETING//////////////////////////////////////
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})


app.listen(3000, () => {
    console.log('App is listening to port 3000');
})