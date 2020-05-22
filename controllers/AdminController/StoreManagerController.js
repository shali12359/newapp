const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const Manager = require("../../model/AdminModels/Manager");
const User = require("../../model/user/user");
const nodeMailer = require('nodemailer');
const texts = require('../../constants/texts');
const emailCongig = texts.emailConfigure;

//add store manager
exports.addManager = (req, res, next) => {
    const {body} = req;
    const {
        fname,
        lname,
        DOB,
        address,
        contact,
        Gender,
        NIC,

    } = body;
    let {
        managerID,
        email,
        password,
        ComPassword
    } = body;


    if(password !== ComPassword){
        return res.send({
            message: 'Confirm Password is not matching!'
        });
    }
    if(new Date(DOB) >= Date.now()){
        return res.send({
            message: 'Incorrect DOB!'
        });
    }

    Manager.find({
            managerID
        }).exec()
          .then(manager => {
            if (manager.length >= 1) {
                return res.json({
                    message: 'Manager is already exists'
                });
            } else {
                Manager.find({
                    email
                }).exec()
                  .then(manager => {
                        if (manager.length >= 1) {
                            return res.json({
                                message: 'Email is already exists'
                            });
                        } else {
                            bcrypt.hash(password, 10, (err, hash) => {
                                if (err) {
                                    return res.status(500).json({
                                        error: err
                                    })
                                } else {

                                    const newManager = new Manager();
                                    newManager.managerID= managerID;
                                    newManager.fname = fname;
                                    newManager.lname = lname;
                                    newManager.email = email;
                                    newManager.DOB = DOB;
                                    newManager.address = address;
                                    newManager.contact = contact;
                                    newManager.Gender = Gender;
                                    newManager.NIC = NIC;
                                
                                    const user = new User({
                                        _id:mongoose.Types.ObjectId(),
                                        UserID : managerID,
                                        Type : "StoreManager",
                                        Username : email,
                                        Password : hash
                                    });

                                    // const newUser = new User();
                                    // _id = mongoose.Types.ObjectId();
                                    // newUser.UserID = managerID;
                                    // newUser.Type = "StoreManager";
                                    // newUser.Username = email;
                                    // newUser.Password = hash;

                                    newManager
                                        .save()
                                        .then(result => {
                                            console.log(result);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.json({
                                                message: 'Please enter Email with only simple letters'
                                            });
                                        });

                                        user.save()
                                        .then(result => {
                                            console.log(result);
                                            res.status(201).json({
                                                message: 'Manager successfully created and send the creditianlas'
                                            })
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(500).json({});
                                        });

                                        const Emailtransporter = nodeMailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: emailCongig.Email,
                                                pass: emailCongig.password
                                            }
                                        });
                                   
                                        let mailOption = {
                                            from : emailCongig.Email,
                                            to : email,
                                            subject : 'Added as Store Manager\n',
                                            text : 'Dear Sir / Madam\n'+
                                            'Your Added as Store Manager.'+
                                            'Use below creditionals to login to the system.\n' +
                                            'Username : ' + email + '\n' +
                                            'Password : ' + password
                                        };

                                       

                                        Emailtransporter.sendMail(mailOption, (err,info) => {
                                                if(err){
                                                    console.log(err);
                                                }else{
                                                    console.log('Email Sent : ' + info.response);
                                                }
                                        });
                                    
                                }
                            });
                        }
                    });
            }
        });
}


//get all store managers
exports.getAllManager = (req, res) => {
    Manager.find((err, manager) => {
        if(err){
            console.log(err);
        }
        else {
            res.json(manager);
        }
    });
}


//get specific manager details
exports.getManager = (req, res) => {
    let managerid = req.params.id;
    Manager.findById(managerid)
    .then(manager => res.json(manager))
    .catch(err => res.status(400).json('Error: ' + err));
}




//edit store manger details
exports.editManager = (req, res) => {
    const {body} = req;
    const {
        managerID,
        fname,
        lname,
        DOB,
        address,
        contact,
        email,
        Gender,
        NIC,

    } = body;

    if(new Date(DOB) >= Date.now()){
        return res.send({
            message: 'Incorrect DOB!'
        });
    }

    Manager.findById(req.params.id, (err, manager) => {
        if (!manager)
            res.status(404).send("Store Manager data is not found");
        else {
            manager.managerID = managerID;
            manager.fname = fname;
            manager.lname = lname;
            manager.DOB = DOB;
            manager.address = address;
            manager.email = email;
            manager.contact = contact;
            manager.Gender = Gender;
            manager.NIC = NIC;

            manager.save().then(manager => {
                res.json('Update Store Manager Successfully');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
}


//delete store manger details
exports.deleteManager = (req,res,next) => {
    Manager.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Manager deleted",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

        
}
