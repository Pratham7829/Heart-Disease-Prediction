const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/", (req, res) => {
    const python = spawn("python", ["../backend/utils/runModel.py"]);

    python.stdin.write(JSON.stringify(req.body));
    python.stdin.end();

    python.stdout.on("data", (data) => {
        res.json(JSON.parse(data.toString()));
    });

    python.stderr.on("data", (err) => {
        console.log("Python Error:", err.toString());
    });
});

module.exports = router;
