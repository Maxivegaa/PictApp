const { Post, User, Comment, Like } = require("../models");

const postController = {
  // Crear un post
  async create(req, res) {
    try {
      const post = await Post.create({
        ...req.body,
        userId: req.user?.id || req.body.userId, // si usas auth
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el post", error });
    }
  },

  // Obtener todos los posts (con usuario, likes y comentarios opcionalmente)
  async getAll(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          { model: User, as: "user", attributes: ["id", "userName", "profilePicture"] },
          { model: Comment, as: "comments" },
          { model: Like, as: "likes" },
        ],
      });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener posts", error });
    }
  },

  // Obtener un post por id
  async getById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          { model: User, as: "user", attributes: ["id", "userName", "profilePicture"] },
          { model: Comment, as: "comments" },
          { model: Like, as: "likes" },
        ],
      });
      if (!post) return res.status(404).json({ message: "Post no encontrado" });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener post", error });
    }
  },

  // Actualizar un post
  async update(req, res) {
    try {
      const [updated] = await Post.update(req.body, { where: { id: req.params.id } });
      if (!updated) return res.status(404).json({ message: "Post no encontrado" });
      res.json({ message: "Post actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar post", error });
    }
  },

  // Eliminar un post
  async remove(req, res) {
    try {
      const deleted = await Post.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ message: "Post no encontrado" });
      res.json({ message: "Post eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar post", error });
    }
  },
};

module.exports = postController;
