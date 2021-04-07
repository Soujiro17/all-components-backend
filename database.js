const mongoose = require('mongoose');

const MONGO_DB_URL = 'mongodb+srv://soujiro17:Lircay724@cluster0.kagba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Database is connected!"))
    .catch(err => console.log(err))

module.exports = mongoose