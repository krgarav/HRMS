const User = require('../models/user');

// @desc    Create new user
// @route   POST /users
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) { 
        res.status(400).json({ error: err.message });
    }
};

// @desc    Get all users
// @route   GET /users
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// @desc    Get single user
// @route   GET /users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
};

// @desc    Update user
// @route   PUT /users/:id
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.json(updatedUser);
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
};

// @desc    Delete user
// @route   DELETE /users/:id
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
};
