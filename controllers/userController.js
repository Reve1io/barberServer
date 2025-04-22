const pool = require('./../db');

exports.createUser = async (req, res) => {
    console.log("request body:", JSON.stringify(req.body));
    const { firstname, lastname, age, phone, password } = req.body;

    if (!firstname || !lastname || !age || !phone || !password) {
        return res.status(400).send({error: 'First name, last name, age, phone and password is required'});
    }
    try {
        const result = await pool.query('INSERT INTO Users (firstname, lastname, age, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstname, lastname, age, phone, password]);
        console.log("Query:", result);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};