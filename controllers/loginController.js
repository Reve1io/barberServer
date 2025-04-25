const pool = require('./../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.userAutorization = async (req, res) => {
    const { phone, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE phone = $1', [ phone ]);

    if (!user.rows[0]) {
        return res.status(404).send({error: 'User not found'});
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
        return res.status(401).send({error: 'Invalid password', 'сравнивалось': user.rows[0].password, password});
    }

    const token = jwt.sign(
        {userId: user.rows[0].id},
        process.env.JWT_SECRET || 'secret_key',
        {expiresIn: '1h'}
    );

    res.json({token});
}