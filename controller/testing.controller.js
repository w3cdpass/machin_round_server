exports.getSomeRes = (req, res) => {
    try {
        res.status(200).json({
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers,
            cookies: req.cookies,
            ip: req.ip
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.someData = (req, res) => {
    try {
        res.status(200).json({
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers,
            cookies: req.cookies
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}