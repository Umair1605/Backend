const Model = require('../models/users');
var web3 = require('web3');
exports.updateBalance = async (event) => {

    console.log(event.returnValues);
    const from = event.returnValues.from;
    const to = event.returnValues.to;
    const value = event.returnValues.value;
    const amount = web3.utils.fromWei(value,'ether');
    try{
        const userFrom = await Model.findOne({accountNo:from});
        console.log(userFrom)
        if (userFrom) {
            const balance = userFrom.accountBalanace - amount;
            await Model.updateOne(
                {accountNo:from},
                { $set: 
                    { accountBalanace:  balance},
                }
            )
        }
        const userTo = await Model.findOne({accountNo:to});
        if(userTo !== null) {
            const balance = userTo.accountBalanace + parseInt(amount);
            await Model.updateOne(
                {accountNo:to},
                { $set: 
                    { accountBalanace:  balance},
                }
            )
        }

        const user = await Model.findOne({accountNo:from});
        const user1 = await Model.findOne({accountNo:to});
        console.log(user);
        console.log(user1);
    }
    catch(error){
        console.log(error);
    }
}