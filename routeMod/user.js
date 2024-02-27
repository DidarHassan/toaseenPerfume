const express = require('express');
const jwt = require('jsonwebtoken');
const dbConnection = require("../dbConnection")
const router = express.Router();
require('dotenv').config();
var auth = require('../sevices/auth');
var role = require('../sevices/checkRole')

//SIGNUP
router.post('/signup', (req, res) => {
    let user = req.body;
    signupQuery = "select email,password,role,status from user where email=?"
    dbConnection.query(signupQuery, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user(name,email,phoneNumber,password,status,role) values(?,?,?,?,'false','user')"
                dbConnection.query(query, [user.name, user.email, user.phoneNumber, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Registered" });
                    } else {
                        return res.status(400).json(err);
                    }
                })
            } else {
                return res.status(400).json({ message: "This Email Is Already Exist..!" });
            }
        } else {
            return res.status(500).json(err);
        }
    })
});//SIGNUP END

//LOGIN
router.post('/login', (req, res) => {
    let user = req.body;
    loginQuery = "select email,password,role,status from userDtls where email=?"
    dbConnection.query(loginQuery, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Invalid Email or Password" });


            } else if (results[0].status === 'false') {
                return res.status(401).json({ message: "wait for admin approval" });


            } else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
                res.status(200).json({ token: accessToken });


            } else {
                return res.status(400).json({ message: "backend server error" });
            }
        } else {
            return res.status(500).json(err);
        }
    })
});//LOGIN END


//USER GET
router.get('/get', (req, res) => {
    var getQuery = "SELECT id, name , email, phoneNumber, password FROM user WHERE role='user'";
    dbConnection.query(getQuery, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});//USER GET END


// USER UPDATE
router.patch('/update', (req, res) => {
    let user = req.body
    var updateQuery = "update user set status=?, id=?";
    dbConnection.query(updateQuery, [user.status, user.id], (err, results) => {
        if (!err) {

            if (results, affectedRows == 0) {
                return res.status(404).json({ message: "user id does not exist..!" });
            }
            return res.status(200).json({ message: "Updated Successfully" });

        } else {
            return res.status(500).json(err);
        }
    });
});//USER UPDATE END


// //JWT GET
// router.get('/checkToken', auth.authToken, (req, res) => {
//     return res.status(200).json({ message: "true" });
// })//JWT GET END
























































module.exports = router;