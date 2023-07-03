// connnect to mongodb

const mongoose = require('mongoose');

var url = 'mongodb+srv://meprazhant:asd@cluster0.pgc8hzg.mongodb.net/?retryWrites=true&w=majority'

const connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.once('open', () => {
        console.log('Connected to MongoDB');
    }
    );

    db.on('error', () => {
        console.error('Error connecting to MongoDB');
    }
    );
}

module.exports = connect;



