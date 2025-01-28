const express = require("express");
const router = express.Router();
const PoetryController = require("../Controllers/PoetryController");

router.post("/createPoetry", PoetryController.CreatePoetry);
router.get("/DisplayPoetry", PoetryController.DisplayPoetry);
router.get("/GetPoetryForEdit/:id", PoetryController.GetPoetryDetail);
router.put("/updatePoetry", PoetryController.UpdatePoetryDetail);
router.get("/DisplayAllPoetry", PoetryController.DisplayAllPoetry);
router.delete("/DelPoetry/:id", PoetryController.DelPoetry);
router.post("/addReview/:id", PoetryController.AddReview);
router.get("/GetAllReviews/:id", PoetryController.GetAllReviews);
module.exports = router;
