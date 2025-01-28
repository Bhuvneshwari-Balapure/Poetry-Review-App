const express = require("express");
const router = express.Router();
const PoetController = require("../Controllers/PoetController");

router.post("/poetRegister", PoetController.PoetRgistration);
router.post("/poetLogin", PoetController.PoetLogin);

module.exports = router;
