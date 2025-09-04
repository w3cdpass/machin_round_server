const User = require('../model/User');
const jwt = require('jsonwebtoken')
const mysecret = 'dfdfdfdf';

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const assignInfoToken = {
            user: true,
            email: user.email,
        };
        const token = jwt.sign(assignInfoToken, mysecret)
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: false, // because localhost is HTTP
        });

        res.status(201).json({ status: 'User Created', data: user, "token": token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find()
        res.status(200).json({ status: 'success', users: allUser })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
