const mongoose = require('mongoose');
const fileSchema = mongoose.Schema({

fileName:{
    type: String,
    required: true,
    },
fileSize:{
type: Number,
required: true,

},
fileType:{
    type: String,
    required: true,
    
    },
fileDate:{
    type:Date,
    required:false,
    default:Date.now
},
isStarred:{
    type:Boolean,
    required:false,
    default:false
},
isArchived:{
    type:Boolean,
    required:false,
    default:false
},
});
const file = mongoose.model('file',fileSchema)
module.exports = file ;