const express = require('express');
const router = express.Router();

router.post("/registro_persona", function (req, res) {
    res.json({
        mensaje:"Hola desde el POST"
    })
});

router.get("/listar_persona", function (req, res) {
    res.json({
        mensaje:"Hola desde el GET"
    })
});

router.put("/listar_persona", function (req, res) {
    res.json({
        mensaje:"Hola desde el GET"
    })
});

router.delete("/listar_persona", function (req, res) {
    res.json({
        mensaje:"Hola desde el GET"
    })
});

module.exports = router;