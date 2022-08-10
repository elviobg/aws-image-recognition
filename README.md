Sistema Serverless para reconhecimento de elementos em imagem com AWS Rekognition e tradução para o português com AWS translate.

### Exemplo de uso
- Image utilizada
![Imagem usada](./public/pug.jpeg)

Chamada:
``` 
  {urlaws}/image-recognition?imageUrl=https://www.ative.pet/wp-content/uploads/2020/12/original-a3cc9078fd7c7869773ed4299205549c-scaled-2560x1280.jpeg 
```
Resultado:
```
{
    "message": "SUCESS",
    "data": [
        "98.24% de chance de ser: Cão",
        "98.24% de chance de ser: Animal",
        "98.24% de chance de ser: Mamífero",
        "98.24% de chance de ser: Canino",
        "98.24% de chance de ser: Animal de estimação",
        "93.96% de chance de ser: Pug"
    ]
} 
```

### Caracteristicas
- Input de grau de aceitação
- Utiliza Serverless framework
- Validação de input de imagem e grau de aceitação
- Testes de integração com jest