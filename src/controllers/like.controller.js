const { Like, User } = require("../models");

const likeController = {
  // Dar like
  async add(req, res) {
    try {
      const like = await Like.create({
        userId: req.user?.id || req.body.userId,
        postId: req.body.postId,
      });
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ message: "Error al dar like", error });
    }
  },

  // Quitar like
  async remove(req, res) {
    try {
      const deleted = await Like.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) return res.status(404).json({ message: "Like no encontrado" });
      res.json({ message: "Like eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar like", error });
    }
  },

  // Obtener likes de un post
  async getByPost(req, res) {
    try {
      const likes = await Like.findAll({
        where: { postId: req.params.postId },
        include: [{ model: User, as: "user", attributes: ["id", "userName"] }],
      });
      res.json(likes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener likes", error });
    }
  },
};

module.exports = likeController;
