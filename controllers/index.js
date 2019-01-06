const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
   console.log("index");
   res.send(["metin", "pınar", "fırat"]);
});

module.exports = router;
