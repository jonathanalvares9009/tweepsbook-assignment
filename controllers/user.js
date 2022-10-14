const bcrypt = require("bcrypt");
const User = require("../model/User.js")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const getUserHandler = async (req, res) => {
    const { email } = req.params;
    const user = await User.findOne({ email: email });
    if(user) res.status(200).send(user)
    else res.status(404).send("User not found");
};

const createUserHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, " ", email, " ", password, " ")
        if (!name || !email || !password) {
            res.status(400).send({
                success: false,
                msg: "To create a new user name, email and password is required."
            })
        } else {
            const emailExists = await User.findOne({ email: email });
            if (emailExists) {
                res.status(409).send({
                    success: false,
                    msg: "Email already exists"
                })
            } else {
                const hashPassword = await bcrypt.hash(password, 10)
                const user = new User({
                    name: name,
                    email: email,
                    password: hashPassword
                });
                const result = await user.save();
                if (result) {
                    res.status(200).send({
                        success: true,
                        msg: "User created successfully"
                    })
                } else {
                    res.status(500).send({
                        success: false,
                        msg: "Server error"
                    })
                }
            }
        }
    } catch (error) {
        res.send("error " + error.message);
    }
};

const deleteUserHandler = async (req, res) => {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ email: email });
    if(user) {
        res.status(200).send("User deleted successfully");
    } else {
        res.status(404).send("User not found")
    }
};

const updateUserHandler = async (req, res) => {
    const { email } = req.params;
    const { password, updatedName } = req.body;

    const user = await User.findOne({ email: email });
    if(!user) {
        res.status(404).send("User not found");
    }

    const hashPassword = await bcrypt.compare(password, user.password)
    if(!hashPassword) res.status(400).send("Password is invalid");

    const updateUser = await User.updateOne({ email: email }, { $set: {name: updatedName }});
    if(updateUser) res.status(200).send("Name has been updated")
    else res.status(500).send("Server error") 
}

module.exports = { getUserHandler ,createUserHandler, deleteUserHandler, updateUserHandler }