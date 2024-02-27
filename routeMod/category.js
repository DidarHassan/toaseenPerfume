const express = require('express');
const dbConnection = require("../dbConnection")
const router = express.Router();
var auth = require('../sevices/auth');
var role = require('../sevices/checkRole');




router.post('/add', (req , res, next) => {
    let category = req.body;
    categoryQuery = "insert into category (name,imgUrl) values(?, ?)";
    dbConnection.query(categoryQuery, [category.name, category.imgUrl], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Category Added Successfully.." });
        } else {
            return res.status(500).json(err);
        }
    })
});

router.get('/get', (req, res) => {
    getCategoryQuery = "select *from category order by name";
    dbConnection.query(getCategoryQuery, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
});


router.patch('/update', (req, res, next) => {
    let update = req.body;
    var updateCategoryQuery = "UPDATE category SET name=? WHERE id=?";
    dbConnection.query(updateCategoryQuery, [update.name, update.id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Category ID not found" });
            }
            return res.status(200).json({ message: "Category updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;