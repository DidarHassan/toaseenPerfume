// const express = require('express');
// const dbConnection = require("../dbConnection")
// const router = express.Router();



// router.get('/productCountByCategory', (req, res) => {
//     var query = "SELECT categoryId, COUNT(*) AS productCount FROM product GROUP BY categoryId";
//     dbConnection.query(query, (err, results) => {
//         if (!err) {
//             return res.status(200).json(results);
//         } else {
//             return res.status(500).json(err);
//         }
//     });
// });
// module.exports = router;