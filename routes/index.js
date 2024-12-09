var express = require('express');
var router = express.Router();
const { index, health, notFound, error } = require('../controllers/index');

/* GET home page. */
router.get('/', index);
router.get('/health', health);
router.get('/not-found', notFound);
router.get('/error', error);

module.exports = router;
