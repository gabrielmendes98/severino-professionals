# Severino Professionals

<a href="https://dsrfs16mf05d6.cloudfront.net/">Live Demo</a>

Severino é uma aplicação que busca facilitar a pesquisa por profissionais de
diversas áreas, como um catálogo mais moderno.

Este projeto é uma das partes da aplicação Severino, que será composta por:

- Um portal web para os clientes (React)
- Um app para os clientes (React Native)
- Um portal para os profissionais (React) - Corresponde a este repositório
- Um servidor para servir todas as aplicações (NodeJS)

As Principais bibliotecas utilizadas para fazer essa aplicação foram:

- React
- React Router Dom
- Material UI
- Formik
- Yup
- React Google Login
- React Input Mask
- Styled Components

Para testes automatizados e testes estáticos, foram utilizados:

- Jest
- React Testing Library
- Eslint
- Prettier
- MSW
- Husky
- Lint Staged

Para hospedagem foi utilizado:

- AWS S3
- AWS CloudFront

<br/>
<hr/>
<br/>

### Cobertura de testes:

![cobertura-severino-professionals](https://user-images.githubusercontent.com/26449308/146114742-534671b6-9bba-4abe-b837-01c45a7211bf.png)
<br/> <br/>

### Diagrama das páginas:

![Fluxos ](https://user-images.githubusercontent.com/26449308/146116160-a8b09723-81b1-431b-aec6-23444cd603e2.png)
<br/> <br/>

### Arquitetura geral:

![arquitetura-geral](https://user-images.githubusercontent.com/26449308/146116357-83ade62b-9c51-4f55-ad7c-be62c8aedb11.png)

### TODO:

- Melhorar seleção de cidades. Atualmente ao selecionar um estado, busca todas
  as cidades naquele estado e isso pode ser lento às vezes.
- Refatorar pasta services. Renomear pasta requests para apis.

### Rodando localmente:

- `git clone https://github.com/gabrielmendes98/severino-professionals.git`
- `cd severino-professionals`
- `yarn`
- `yarn start:prod`
