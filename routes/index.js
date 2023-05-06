const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');
console.log("router started");


// const chatController = require('../controllers/chat_controller');





router.get('/', homeController.home);

// // Route for creating a new chatroom
// router.post('/create-room', chatController.createChatRoom);

// // Route for getting all chatrooms
// router.get('/get-rooms', chatController.getRooms);

// // Route for getting all messages of a chatroom
// router.get('/get-messages/:roomId', chatController.getChatRoomMessages);

// // Route for sending a new message to a chatroom
// router.post('/send-message', chatController.sendMessage);

// from user.js

router.use('/users',require('./users'));
// from likes.js
router.use('/likes',require('./likes'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
// router.use('/chat',require('./chat'));
router.use('/api',require('./api'));


module.exports=router;

