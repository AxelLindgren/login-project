const bcrypt = require('bcrypt');
let users = []; 

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: Date.now().toString(), username, password: hashedPassword };
        users.push(user);
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};

exports.login = (req, res) => {
    res.send('Login successful');
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.send('Logout successful');
    });
};
