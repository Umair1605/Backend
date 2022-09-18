require('dotenv').config();

const routes = require('./routes/routes');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
var Contract = require('web3-eth-contract');
const abi =  require('./contractData/ERC20-abi.json');
const ContractAddress = require ('./contractData/ERC20-address.json');
const Update = require('./functions/updateBalance');

// ALCHEMY_API_URL = "https://eth-rinkeby.alchemyapi.io/v2/wXDhX71Unm5M-lJB86RW840J3QlUTTsA"
// set provider for all later instances to use
Contract.setProvider('wss://eth-rinkeby.alchemyapi.io/v2/wXDhX71Unm5M-lJB86RW840J3QlUTTsA');

var contract = new Contract(abi,ContractAddress.address);

contract.events.Transfer(() => {
}).on("connected", function(subscriptionId){
    console.log('SubID: ',subscriptionId);
    
})
.on('data', function(event){
    console.log('Event:', event);
    Update.updateBalance(event);
    // console.log('Owner Wallet Address: ',event.returnValues.owner);
    //Write send email process here!
})
.on('changed', function(event){
    //Do something when it is removed from the database.
})
.on('error', function(error, receipt) {
    console.log('Error:', error, receipt);
});;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

app.use('/api', routes)