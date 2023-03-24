const express = require('express');
const router = express.Router();
router.use('/', require('./swagger'));

// router.use("/", require("./swagger"));

/* for testing only
router.get('/', (req, res) => {
    res.send('Home')
}) */

router.use('/meals', require('./meals'))
router.use('/customers', require('./customers'))

module.exports = router;