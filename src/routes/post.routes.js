const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

// CRUD de posts
router.post("/", postController.create);       // Crear post
router.get("/", postController.getAll);        // Obtener todos los posts
router.get("/:id", postController.getById);    // Obtener un post por id
router.put("/:id", postController.update);     // Actualizar un post
router.delete("/:id", postController.remove);  // Eliminar un post

module.exports = router;
