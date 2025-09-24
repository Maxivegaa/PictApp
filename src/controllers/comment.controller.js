const { Comment, User } = require("../models");

const commentController = {
  // Crear comentario
  async create(req, res) {
    try {
      const { content } = req.body;

      // Validar que el comentario no sea vacío
      if (!content || content.trim() === "") {
        return res.status(400).json({ message: "El comentario debe contener caracteres." });
      }

      // Validar que el comentario no tenga más de 20 caracteres
      if (content.length > 20) {
        return res.status(400).json({ message: "El comentario no puede tener más de 20 caracteres." });
      }

      const comment = await Comment.create({
        ...req.body,
        userId: req.user?.id || req.body.userId,
        postId: req.body.postId,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Error al crear comentario", error });
    }
  },

  // Obtener comentarios de un post
  async getByPost(req, res) {
    try {
      const comments = await Comment.findAll({
        where: { postId: req.params.postId },
        include: [{ model: User, as: "user", attributes: ["id", "userName", "profilePicture"] }],
      });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener comentarios", error });
    }
  },

  // Eliminar comentario
  async remove(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "Comentario no encontrado" });
      }

      // Actualizar "deleted" a true
      comment.deleted = true;
      await comment.save();

      res.json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar comentario", error });
    }
  },
};

module.exports = commentController;
