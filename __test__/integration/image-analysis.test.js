const { describe, test, expect } = require('@jest/globals');

const aws = require('aws-sdk');
aws.config = {
    region: 'us-east-1',
}
const requestMock = require('../mocks/request.json');
const { main } = require('../../src');

describe('Image analyser', () => {
    it('Deve analisar uma imagem com URL correta e grau de confiança padrão - status code 200', async () => {
        const dataBodyPugImage = [
            "98.24% de chance de ser: Cão",
            "98.24% de chance de ser: Animal",
            "98.24% de chance de ser: Mamífero",
            "98.24% de chance de ser: Canino",
            "98.24% de chance de ser: Animal de estimação",
            "93.96% de chance de ser: Pug"
        ];
        
        const expected = {
            statusCode: 200,
            body: JSON.stringify({ 
                message: 'SUCESS',
                data: dataBodyPugImage 
            }),
        }
        const result = await main({queryStringParameters: requestMock.queryStringParameters});
        expect(result).toStrictEqual(expected);
    }, 10000);

    it('Deve analisar uma imagem com URL correta e grau de confiança - status code 200', async () => {
        const dataBodyPugImage = [
            "98.24% de chance de ser: Cão",
            "98.24% de chance de ser: Animal",
            "98.24% de chance de ser: Mamífero",
            "98.24% de chance de ser: Canino",
            "98.24% de chance de ser: Animal de estimação"
        ];
        
        const expected = {
            statusCode: 200,
            body: JSON.stringify({ 
                message: 'SUCESS',
                data: dataBodyPugImage 
            }),
        }
        const result = await main({queryStringParameters: requestMock.queryStringParametersWithConfidence});
        expect(result).toStrictEqual(expected);
    }, 10000);
    it('Deve dar erro ao receber um URL vazia - status code 400', async () => {
        const expected = {
            statusCode: 400,
            body: JSON.stringify({ 
                message: 'Empty IMG field!',
                data: [] 
            }),
        }
        const result = await main({queryStringParameters: requestMock.emptyQueryStringParameters});
        expect(result).toStrictEqual(expected);
    });
    it('Deve dar erro ao receber uma URL inválida - status code 500', async () => {
        const expected = {
            statusCode: 500,
            body: JSON.stringify({ 
                message: 'Internal Server Error!',
                data: [] 
            }),
        }
        const result = await main({queryStringParameters: requestMock.invalidQueryStringParameters});
        expect(result).toStrictEqual(expected);
    });
})