const express=require('express');
const router = express.Router();
const likesController=require('../controllers/likes_controller');
router.get('/loved',likesController.loved);
module.exports = router;