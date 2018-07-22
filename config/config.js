var config = {
    "development": {
        port: 3000,
        db: 'mongodb://127.0.0.1:27017/test',
        host: 'localhost'
    },
    "production": {
        port: 3000,
        db: 'mongodb://127.0.0.1:27017/test',
        host: 'ec2-18-191-252-51.us-east-2.compute.amazonaws.com'
    }
};

module.exports = config;