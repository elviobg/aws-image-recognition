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

    return TranslatedText.split(";; ");
  }

  mergeTranlatedNames(names, originalItems) {
    for (const index in names) {
      const currentName = names[index];
      originalItems.items[index].TranslatedName = currentName;
    }
  }

  formatResults(items) {
    const texts = [];
    items.forEach((item) => {
      texts.push(
        `${item.Confidence.toFixed(2)}% de chance de ser: ${
          item.TranslatedName
        }`
      );
    });

    return texts;
  }

  async main(event) {
    try {
      const { imageUrl } = event.queryStringParameters;
      if (!imageUrl) {
        return {
          statusCode: 400,
          body: {
            message: "Empty IMG field!",
            data: [],
          },
        };
      }
      const confidence = 90;
      const imageBuffer = await this.getImageBuffer(imageUrl);
      const detected = await this.recognizeImageLabels(imageBuffer, confidence);
      const labelsInPT = await this.translateText(detected.names);
      this.mergeTranlatedNames(labelsInPT, detected);
      const texts = this.formatResults(detected.items);
      return {
        statusCode: 200,
        body: {
          message: "SUCESS",
          data: texts,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: "Internal Server Error!",
          data: [],
        },
      };
    }
  }
};
