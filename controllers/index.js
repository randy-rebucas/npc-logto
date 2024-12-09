
exports.index = async (req, res) => {
    res.json({ message: 'Hello World' });
}

exports.health = async (req, res) => {
    res.json({ message: 'Hello World' });
}

exports.notFound = async (req, res) => {
    res.status(404).json({ message: 'Not Found' });
}

exports.error = async (req, res) => {
    res.status(500).json({ message: 'Internal Server Error' });
}

