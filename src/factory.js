const aws = require('aws-sdk');
const Handler = require('./handler');

const recognitorSvc = new aws.Rekognition();
const translatorSvc = new aws.Translate();

const handler = new Handler({
    recognitorSvc, translatorSvc
})

module.exports = handler.main.bind(handler);