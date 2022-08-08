module.exports = class handler {
  constructor({
    recognitorSvc, translatorSvc
  }) {
    this.recognitorSvc = recognitorSvc
    this.translatorSvc = translatorSvc
  }

  async main(event){
    return {
      statusCode: 200,
      body: 'Done!',
      input: event,
    }
  }
}