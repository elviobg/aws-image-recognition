const { get } = require('axios');
module.exports = class handler {
  constructor({
    recognitorSvc, translatorSvc
  }) {
    this.recognitorSvc = recognitorSvc
    this.translatorSvc = translatorSvc
  }

  async getImageBuffer(imageUrl) {
    const response = await get(imageUrl, {
      responseType: 'arraybuffer',
    });

    return Buffer.from(response.data, 'base64');
  }

  async main(event){
    const { imageUrl } = event.queryStringParameters;
    const buffer = await this.getImageBuffer(imageUrl);
    return {
      statusCode: 200,
      body: 'Done!',
      input: event,
    }
  }
}