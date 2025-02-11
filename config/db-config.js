const mongoose = require('mongoose')

const dbConnect = async ()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))
}

module.exports = dbConnect;
