const express = require('express');
var cors = require('cors');
const dbConnection = require("./dbConnection");
const categoryRoute = require("./routeMod/category");
const addProductsRoute = require("./routeMod/addProducts");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/category', categoryRoute);
app.use('/addProducts', addProductsRoute);



app.get('/get', (req, res) => {
    query = "select *from product";
    dbConnection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
});
module.exports = app;