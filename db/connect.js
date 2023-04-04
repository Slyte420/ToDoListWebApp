const moongose = require('mongoose')


const connectDB = (uri) => {
    return moongose.connect(uri).then(() => console.log('Connected to MongoDb')).catch((error) => console.log(error))
}

module.exports = connectDB