const { get } = require("axios");
module.exports = class handler {
  constructor({ recognitorSvc, translatorSvc }) {
    this.recognitorSvc = recognitorSvc;
    this.translatorSvc = translatorSvc;
  }

  async getImageBuffer(imageUrl) {
    const response = await get(imageUrl, {
      responseType: "arraybuffer",
    });

    return Buffer.from(response.data, "base64");
  }

  async recognizeImageLabels(imageBuffer, confidence) {
    const result = await this.recognitorSvc
      .detectLabels({
        Image: {
          Bytes: imageBuffer,
        },
      })
      .promise();

    const items = result.Labels.filter(
      ({ Confidence }) => Confidence >= confidence
    );

    const names = items.map(({ Name }) => Name).join(";; ");
    return {
      names,
      items,
    };
  }

  async translateText(text) {
    const params = {
      SourceLanguageCode: "en",
      TargetLanguageCode: "pt",
      Text: text,
    };

    const { TranslatedText } = await this.translatorSvc
      .translateText(params)
      .promise();

    return TranslatedText.split(';; ');
  }

  async main(event) {
    const { imageUrl } = event.queryStringParameters;
    const confidence = 90;
    const imageBuffer = await this.getImageBuffer(imageUrl);
    const detected = await this.recognizeImageLabels(imageBuffer, confidence);
    const labelsInPT = await this.translateText(detected.names);
    return {
      statusCode: 200,
      body: {
        data: []
      },
      input: event,
    };
  }
};
