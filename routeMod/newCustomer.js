const express = require('express');
const dbConnection = require("../dbConnection")
const router = express.Router();

//Add
// router.post('/addCustomer', (req, res) => {
//     let newCustomer = req.body;
//     addCustomerQuery = "select email,phoneNumber,role,status from newCustomer where email=?"
//     dbConnection.query(addCustomerQuery, [newCustomer.email], (err, results) => {
//         if (!err) {
//             if (results.length <= 0) {
//                 query = "INSERT INTO newCustomer (firstName, lastName, email, gender, phoneNumber, customerNumber, status, role) VALUES (?, ?, ?,?, ?, ? ,'false','customer')";
//                 dbConnection.query(query, [newCustomer.firstName, newCustomer.lastName, newCustomer.email, newCustomer.gender, newCustomer.phoneNumber, newCustomer.customerNumber], (err, results) => {
//                     if (!err) {
//                         return res.status(200).json({ message: "Successfully Customer Added..." });
//                     } else {
//                         return res.status(400).json(err);
//                     }
//                 })
//             } else {
//                 return res.status(400).json({ message: "This Email Is Already Exist..!" });
//             }
//         } else {
//             return res.status(500).json(err);
//         }
//     })
// });

//GET

router.get('/get', (req, res) => {

    dbConnection.query('SELECT * FROM addUsers', (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});


router.post('/addCustomer', (req, res) => {
    let addUsers = req.body;
    addUsersQuery = "select userid,onumac,status from addUsers where userid=?"
    dbConnection.query(addUsersQuery, [addUsers.userid], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "INSERT INTO addUsers (userid, name, onuname, onuleser, onumac, address, mobile, status) VALUES (?, ?, ?,?, ?, ? ,?,?)";
                dbConnection.query(query, [addUsers.userid, addUsers.name, addUsers.onuname, addUsers.onuleser, addUsers.onumac, addUsers.address, addUsers.mobile, addUsers.status], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Customer Added..." });
                    } else {
                        return res.status(400).json(err);
                    }
                })
            } else {
                return res.status(400).json({ message: "This User Id Is Already Exist..!" });
            }
        } else {
            return res.status(500).json(err);
        }
    })
});

//Update
router.patch('/update', (req, res) => {
    let addUsers = req.body;
    var updateQuery = "UPDATE addUsers SET id=? WHERE id=?";
    dbConnection.query(updateQuery, [addUsers.id, addUsers.id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Customer ID does not exist" });
            }
            return res.status(200).json({ message: "Updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


router.delete('/delete/:id', (req, res) => {
    const addUsers = req.params.id;
    // Delete the user from the database
    dbConnection.query('DELETE FROM addUsers WHERE id = ?', [addUsers], (error, results) => {
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




module.exports = router;