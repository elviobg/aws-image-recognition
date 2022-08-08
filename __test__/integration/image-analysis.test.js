const { describe, test, expect } = require('@jest/globals');

const aws = require('aws-sdk');
aws.config = {
    region: 'us-east-1',
}
const requestMock = require('../mocks/request.json');
const { main } = require('../../src');

describe('Image analyser', () => {
    it('Deve analisar uma imagem com URL correta - status code 200', async () => {
        const expected = {
            statusCode: 200,
            input: {
                queryStringParameters: {
                    imageUrl: requestMock.queryStringParameters.imageUrl,
                }
            },
            body: {},
        }
        const result = await main(requestMock);
        expect(result).toStrictEqual(expected);
    });
    test.todo('Deve dar erro ao receber um URL vazia - status code 400');
    test.todo('Deve dar erro ao receber uma URL inválida - status code 500');
})