const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send(['metin', 'pınar', 'fırat']);
});

module.exports = router;
