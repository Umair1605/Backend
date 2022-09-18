const nftModel = require('../models/nfts');

exports.postNft = async (req,res) => {
    const data = new nftModel({
        name: req.body.name,
        user: req.body.user
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getNftById = async (req, res) => {
    try{
        const data = await nftModel.find().populate("user");

        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}