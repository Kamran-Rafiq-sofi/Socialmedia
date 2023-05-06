// const mongoose=require('mongoose');
// // const User=require('../models/user');
// const messageSchema=new mongoose.Schema({
//     chatroom:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref:'Chatroom'


//     },
//     message:{
//         type:String,
//         required:true
//     },
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:'chatroom is required',
//         ref:'User'
//     },



// },
// {
//     timestamps:true
// }

// );


// const Message=mongoose.model('Message',messageSchema);
// module.exports = Message;


const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  chatroom: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);


// module.exports=mongoose.model('Message',messageSchema);
