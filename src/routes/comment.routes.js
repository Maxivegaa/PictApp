const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");

// Comentarios
router.post("/", commentController.create);             // Crear comentario
router.get("/post/:postId", commentController.getByPost); // Comentarios de un post
router.delete("/:id", commentController.remove);        // Eliminar comentario

module.exports = router;
