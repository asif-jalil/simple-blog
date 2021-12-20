const express = require('express');
const router = express.Router();
const postController = require('../posts/posts.controller');
const categoryController = require('../categories/categories.controller');
const { isAuthenticated } = require('../user/user.controller.practice');
// const postMiddleware = require('../posts/posts.middleware');

router.get('/', function(req, res) {
  return res.json({ message: 'App is running'});
});
router.post('/posts', isAuthenticated, postController.createPosts);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', postController.updatePostById);
router.delete('/posts/:id', postController.deletePostById);

router.post('/categories', categoryController.createCategories);
router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryController.updateCategoryById);
router.delete('/categories/:id', categoryController.deleteCategoryById);

module.exports = router;
