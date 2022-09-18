const Model = require('../models/users');

exports.postUserRegister= async (req, res) => {
    const data = new Model({
        accountNo: req.body.account,
        accountBalanace: req.body.balance
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
};

//Get All
exports.getUser =  async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.updateBalance = async (req, res) => {
    console.log("Hello");
    const event = req.body.event;
    console.log("Ene .. ",event);
    const account = req.body.account;
    const balance = req.body.balance;
    console.log(typeof(account));
    try{
        // const user = await Model.findOne({accountNo:account});
        await Model.updateOne(
            {accountNo:account},
            { $set: 
                { accountBalanace:  balance},
            }
        )
        const user = await Model.findOne({accountNo:account});
        res.json(user)
        console.log(user);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}