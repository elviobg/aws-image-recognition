const { describe, test, expect } = require('@jest/globals');

const aws = require('aws-sdk');
aws.config = {
    region: 'us-east-1',
}
const requestMock = require('../mocks/request.json');
const { main } = require('../../src');

describe('Image analyser', () => {
    it('Deve analisar uma imagem com URL correta - status code 200', async () => {
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
            body: { 
                data: dataBodyPugImage 
            },
        }
        const result = await main(requestMock);
        expect(result).toStrictEqual(expected);
    }, 10000);
    test.todo('Deve dar erro ao receber um URL vazia - status code 400');
    test.todo('Deve dar erro ao receber uma URL inválida - status code 500');
})