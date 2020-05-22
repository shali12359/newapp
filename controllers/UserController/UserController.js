const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../model/user/user');
const texts = require('../../constants/texts');
const JWT_KEY = texts.JWTKEY.key;



// user registration
exports.user_signup = (req, res, next) => {

    const { Username } = req.body;
    User.find({ Username })
        .exec()
        .then(user => {
            //console.log(user)
            if (user.length >= 1) {
                return res.json({
                    message: 'User Already exist'
                });
            } else {
                bcrypt.hash(req.body.Password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const nwuser = new User({
                            _id: mongoose.Types.ObjectId(),
                            Type: "User",
                            Fname: req.body.fname,
                            Username: req.body.Username,
                            Password: hash
                        });
                        nwuser
                            .save()
                            .then(result => {
                                console.log('User Created', result);
                                res.status(200).json({
                                    message: 'User Created'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}




// user login functionality
exports.userSignin = (req, res, next) => {
    User.find({ Username: req.body.Username }).exec().then(user => {
        if (user.length < 1) {
            return res.send({ message: 'unauthorized User!!!!' });
        }
        bcrypt.compare(req.body.Password, user[0].Password, (err, result) => {
            if (err) {
                return res.send({ message: 'Password does not match!!!!!' });
            }
            if (result) {
                let token = null;
                if (user[0].Token === null) {
                    token = jwt.sign(
                        {
                            Username: user[0].Username,
                            UserId: user[0]._id
                        },
                        JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                } else {
                    token = user[0].Token;
                }
                user[0]._id = user[0]._id;
                user[0].Token = token;
                user[0].LastLogin = Date.now();
                user[0]
                    .save()
                    .then(result => {
                        console.log("User - " + user[0]._id + " Signed-in, Time - " + Date.now());
                    })
                    .catch(err => {
                        console.log(err);
                    });
                return res.status(200).json({
                    message: 'Authentication successful',
                    token: token,
                    username: user[0].Fname,
                    userId: user[0]._id,
                    type: user[0].Type
                });
            } else {
                return res.status(401).send('UNAUTHORIZED');
            }
        })
    });
}


//validate user
exports.user_validate = (req, res, next) => {
    User.find({ _id: req.body.user.userId, Token: req.body.token }).exec().then(user => {
        if (user.length < 1) {
            return res.status(200).json({
                valid: false
            });
        } else {
            return res.status(200).json({
                valid: true
            });
        }
    });
}


//sign out function
exports.user_signout = (req, res, next) => {
    User.find({ _id: req.body.user.userId, Token: req.body.token }).exec().then(user => {
        if (user.length < 1) {
            return res.status(404).send('user not found');
        } else {
            user[0]._id = req.body.user.userId;
            user[0].Token = null;
            user[0]
                .save()
                .then(result => {
                    console.log("User - " + user[0]._id + " Signed-out, Time - " + Date.now());
                    res.status(200).json({
                        message: 'Sign Out',
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                });
        }
    });
}


//get all users details
exports.GetAlluser_details = (req, res) => {
    User.find((err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
}

//delete specific user details
exports.deleteUser = (req,res,next) => {
    User.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}