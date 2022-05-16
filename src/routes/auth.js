const { Router } = require('express');
const { login } = require('../controller/auth');

const authRoute = Router();

authRoute.post('/', login);

authRoute.get('/', (req, res) => {
    console.log('Auth GET');
    res.json({ message: 'Auht Response' });
});

module.exports = authRoute;
