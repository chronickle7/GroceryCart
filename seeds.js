const mongoose = require('mongoose');
const Product = require('./models/product');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log(" Mongo Connection open");
    })
    .catch(err => {
        console.log("error in mongo connection is ", err);
    })


// const p = new Product({
//     name: 'Banana',
//     price: 50,
//     category: 'fruit'
// })

// p.save()
//     .then(data => {
//         console.log(data);
//     })
//     .catch(e => {
//         console.log(e);
//     })

const seedProducts = [
    {
        name: 'Mango',
        price: 60,
        category: 'fruit'
    },
    {
        name: 'Papaya',
        price: 90,
        category: 'fruit'
    },
    {
        name: 'Lady Finger',
        price: 40,
        category: 'vegetable'
    },
    {
        name: 'Carrots',
        price: 50,
        category: 'vegetable'
    },
    {
        name: 'milk',
        price: 60,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })