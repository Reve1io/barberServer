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
