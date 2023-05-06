// const Message = require('../models/message');

// module.exports.getMessages = async function(req, res) {
//   try {
//     const messages = await Message.find({ chatroom: req.params.id })
//       .populate('user', 'name email')
//       .sort({ createdAt: 1 });

//     return res.status(200).json({
//       success: true,
//       data: messages
//     });
//   } catch (err) {
//     console.log('Error in getting messages:', err);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };



// const Chatroom = require('../models/chatroom');
// const Message = require('../models/message');

// // Create a new chat room
// exports.createChatRoom = async (req, res) => {
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
// };

// // Get all messages for a chat room
// exports.getChatRoomMessages = async (req, res) => {
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
// };

