const pool = require('./../db');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    console.log("request body:", JSON.stringify(req.body));
    const { firstname, lastname, age, phone, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!firstname || !lastname || !age || !phone || !password) {
        return res.status(400).send({error: 'First name, last name, age, phone and password is required'});
    }
    try {
        const result = await pool.query('INSERT INTO Users (firstname, lastname, age, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstname, lastname, age, phone, hashedPassword]);
        console.log("Query:", result);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};

exports.getAllUsers = async (req, res) => {

    try {
        const result = await pool.query('SELECT * FROM Users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send({error: 'User not found'});
        }

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, age, phone, password } = req.body;

    if (!firstname || !lastname || !age || !phone) {
        return res.status(400).send({error: 'All field is required'});
    }

    try {
        let query, params;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query = 'UPDATE Users SET firstname=$2, lastname=$3, age=$4, phone=$5, password=$6 WHERE id=$1 RETURNING *';
            params = [id, firstname, lastname, age, phone, hashedPassword];
        } else {
            query = 'UPDATE Users SET firstname=$2, lastname=$3, age=$4, phone=$5 WHERE id=$1 RETURNING *';
            params = [id, firstname, lastname, age, phone];
        }

        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).send({error: 'User not found'});
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM Users WHERE id = $1', [id]);
        res.status(200).json('User successfully deleted');
        } catch (err) {
            res.status(500).json({error: err.message});
    }
};