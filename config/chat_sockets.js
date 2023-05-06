// const Message=require('../models/message');
// const Post=require('../models/post');
// const user=require('../models/user');
// // const Message = require('../models/message');

// module.exports.chatSockets = function(socketServer) {
//   let io = require('socket.io')(socketServer);

//   io.sockets.on('connection', function(socket) {
//     console.log('New connection received:', socket.id);

//     socket.on('disconnect', function() {
//       console.log('Socket disconnected:', socket.id);
//     });

//     socket.on('join_room', function(data) {
//       console.log('Joining request received:', data);

//       // Join the user to the chatroom
//       socket.join(data.chatroom);

//       // Retrieve messages for the chatroom from the database
//       Message.find({ chatroom: data.chatroom }, function(err, messages) {
//         if (err) {
//           console.log(err);
//           return;
//         }

//         // Emit the messages to the user
//         socket.emit('load_messages', messages);
//       });

//       // Emit a user_joined event to all users in the chatroom
//       io.in(data.chatroom).emit('user_joined', data);
//     });

//     socket.on('send_message', function(data) {
//       // Save the message to the database
//       Message.create(
//         {
//           message: data.message,
//           user_email: data.user_email,
//           chatroom: data.chatroom
//         },
//         function(err, message) {
//           if (err) {
//             console.log(err);
//             return;
//           }

//           // Emit the message to the chatroom
//           io.in(data.chatroom).emit('receive_message', message);
//         }
//       );
//     });
//   });
// };



module.exports.chatSockets=function(socketServer){
let io=require('socket.io')(socketServer);
io.sockets.on('connection',function(socket){
    console.log("new connection received",socket.id);
    socket.on('disconnect',function(){
        console.log("socket disconnected")
    });
    socket.on('join_room',function(data){
        console.log("joining request received",data);
        socket.join(data.chatroom);
        io.in(data.chatroom).emit('user_joined',data);
    })
    socket.on('send_message',function(data){
        io.in(data.chatroom).emit('receive_message',data);
    });
});
}


// const Message = require('../models/message');

// module.exports.chatSockets = function(socketServer) {
//     const io = require('socket.io')(socketServer);

//     io.sockets.on('connection', function(socket) {
//         console.log('New connection received:', socket.id);

//         socket.on('disconnect', function() {
//             console.log('Socket disconnected:', socket.id);
//         });

//         socket.on('join_room', async function(data) {
//             try {
//                 const chatroom = await chatroom.findById(data.chatroom);
//                 if (!chatroom) {
//                     console.log('Chatroom not found.');
//                     return;
//                 }

//                 socket.join(data.chatroom);
//                 io.in(data.chatroom).emit('user_joined', data);
//             } catch (err) {
//                 console.log('Error:', err);
//             }
//         });

//         socket.on('send_message', async function(data) {
//             try {
//                 const chatroom = await chatroom.findById(data.chatroom);
//                 if (!chatroom) {
//                     console.log('Chatroom not found.');
//                     return;
//                 }

//                 const message = new Message({
//                     chatroom: chatroom._id,
//                     message: data.message,
//                     user: data.user
//                 });

//                 await message.save();

//                 io.in(data.chatroom).emit('receive_message', {
//                     message: data.message,
//                     user: data.user
//                 });
//             } catch (err) {
//                 console.log('Error:', err);
//             }
//         });
//     });
// };
