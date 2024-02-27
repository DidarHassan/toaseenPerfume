const express = require('express');
const dbConnection = require("../dbConnection")
const router = express.Router();



//posts Products/category joined
router.post('/add', (req, res) => {
    let product = req.body;
    var query = "INSERT INTO product (name, categoryId, imgUrl, description, price, status) VALUES (?, ?, ?, ?, ?, 'true')";
    dbConnection.query(query, [product.name, product.categoryId, product.imgUrl, product.description, product.price], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Product added successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

//get Products/category inner joined
router.get('/get', (req, res, next) => {
    var query = "SELECT p.id, p.name, p.description, p.imgUrl, p.price, p.status, c.id AS categoryId, c.name AS categoryName FROM product AS p INNER JOIN category AS c ON p.categoryId = c.id";

    dbConnection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

//get all prod/cate 
router.get('/getProductId/:id', (req, res, next) => {
    var productId = req.params.id;
    var query = "SELECT p.id, p.name, p.description, p.imgUrl, p.price, p.status, c.id AS categoryId, c.name AS categoryName FROM product AS p INNER JOIN category AS c ON p.categoryId = c.id WHERE p.id = ?";

    dbConnection.query(query, [productId], (err, results) => {
        if (!err) {
            if (results.length > 0) {
                return res.status(200).json(results[0]); // Assuming there should be only one product with a given ID
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});


//get category id
router.get('/getByCategory/:id', (req, res, next) => {
    const id = req.params.id;
    var query = "SELECT id, name FROM product WHERE categoryId=? AND status='true'";
    dbConnection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

//get Products id
router.get('/getById/:id', (req, res, next) => {
    const id = req.params.id;
    var query = "SELECT id, name, description, price FROM product WHERE id=?";
    dbConnection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.length > 0) {
                return res.status(200).json(results[0]);
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});


//Update
router.patch('/update', (req, res) => {
    let product = req.body;
    var updateQuery = "UPDATE product SET name=?, categoryId=?, description=?, price=? WHERE id=?";
    dbConnection.query(updateQuery, [product.name, product.categoryId, product.description, product.price, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Product ID does not exist" });
            }
            return res.status(200).json({ message: "Updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Delete all products
router.delete('/delete/:id', (req, res) => {
    const deletProduct = req.params.id;
    // Delete the user from the database
    dbConnection.query('DELETE FROM product WHERE id = ?', [deletProduct], (error, results) => {
        if (error) {
            console.error('Error deleting Log:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.affectedRows > 0) {
                console.log('Deleted data successfully');
                res.status(200).json({ message: 'Deleted data successfully' });
            } else {
                console.log('User not found');
                res.status(404).json({ error: 'Log Data not found' });
            }
        }
    });
});


router.patch('/updateStatus/:id', (req, res) => {
    const productId = req.params.id;
    const { status } = req.body;

    var updateQuery = "UPDATE product SET status=? WHERE id=?";
    dbConnection.query(updateQuery, [status, productId], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json({ message: "Status updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;