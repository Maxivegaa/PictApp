const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like.controller");

// Likes
router.post("/", likeController.add);                  // Dar like
router.get("/post/:postId", likeController.getByPost); // Likes de un post
router.delete("/:id", likeController.remove);          // Quitar like

module.exports = router;
