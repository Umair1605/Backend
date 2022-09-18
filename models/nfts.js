const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
    }
    
})

module.exports = mongoose.model('Nfts', nftSchema)