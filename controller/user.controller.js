const User = require('../model/User');


exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ status: 'User Created', data: user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find().populate('')
        res.status(200).json({ status: 'success', users: allUser})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
