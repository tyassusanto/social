const router = require('express').Router()
const postController = require('../controllers/posts')
const upload = require('../middlewere/upload')

router.post('/', postController.createPost) // create a post
// router.post('/upload', upload.single('img'), postController.createUpload)
router.put('/:id', postController.updatePost) // update a post
router.delete('/:id', postController.deletePost) // delete a post
router.put('/:id/like', postController.likePost) // like/dislike a post
router.get('/:id', postController.getPost) // get a post
router.get('/timeline/:userId', postController.getAllPosts) // get all posts / timeline
router.get('/profile/:username', postController.getUserPosts) // get user's all posts / timeline

module.exports = router