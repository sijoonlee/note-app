const mongoose = require('mongoose')

const memoSchema = new mongoose.Schema({
    webID: {
        type: String  
    },
    title: {
        type: String
        // required: true,
        // trim: true
    },
    body: {
        type: String
    },
    posX:{
        type: Number
    },
    posY:{
        type: Number
    },
    width:{
        type: Number
    },
    height:{
        type: Number
    },
    isHidden:{
        type: Boolean
    }
    //,
    // owner:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User' // reference: model name
    // }
}, {
    timestamps: true
})

const Memo = mongoose.model('Memo',memoSchema)

module.exports = Memo