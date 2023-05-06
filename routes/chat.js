// const express = require('express');
// const router = express.Router();
// const Chatroom = require('../models/chatroom');
// const Message = require('../models/message');

// // Create a new chat room
// router.post('/chatrooms', async (req, res) => {
//   try {
//     const chatroom = new Chatroom({
//       name: req.body.name
//     });
//     const savedChatroom = await chatroom.save();
//     res.status(201).json(savedChatroom);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Get all messages for a chat room
// router.get('/chatrooms/:chatroomId/messages', async (req, res) => {
//   try {
//     const messages = await Message.find({ chatroom: req.params.chatroomId })
//       .populate('user', 'name')
//       .sort({ createdAt: 'asc' })
//       .exec();
//     res.status(200).json(messages);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const chatController = require('../controllers/chat_controller');

// // Create a new chat room
// router.post('/chatrooms', chatController.createChatRoom);

// // Get all messages for a chat room
// router.get('/chatrooms/:chatroomId/messages', chatController.getChatRoomMessages);

// module.exports = router;

