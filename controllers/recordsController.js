const pool = require('./../db');

exports.createRecord = async (req, res) => {
    const [userId, title, discription] = req.body;

    try {
        const result = pool.query('INSERT INTO Records (userId, title, discription) VALUES ($1, $2, $3) RETURNING *', [userId, title, discription]);
        console.log("Query:", result);
        result.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
}

exports.getAllRecords = async (req, res) => {
    try {
        const result = pool.query('SELECT * FROM Records');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}