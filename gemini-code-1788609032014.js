// server.js (Node.js Express Backend)
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/gamerhub');

// User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Register Route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.json({ status: 'ok', message: 'User registered' });
    } catch (error) {
        res.json({ status: 'error', message: 'Duplicate username' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ status: 'error', message: 'Invalid user' });

    if (await bcrypt.compare(password, user.password)) {
        return res.json({ status: 'ok', token: 'user-logged-in-token' });
    }
    res.json({ status: 'error', message: 'Invalid password' });
});

app.listen(3000, () => console.log('Server running on port 3000'));