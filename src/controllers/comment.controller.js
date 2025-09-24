const { Comment, User } = require("../models");

const commentController = {
  // Crear comentario
  async create(req, res) {
    try {
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
      const deleted = await Comment.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ message: "Comentario no encontrado" });
      res.json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar comentario", error });
    }
  },
};

module.exports = commentController;
