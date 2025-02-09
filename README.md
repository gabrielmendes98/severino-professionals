# Severino Professionals

<a href="https://dsrfs16mf05d6.cloudfront.net/" target="_blank">Live Demo</a>

Severino is an application that seeks to facilitate the search for professionals in
various areas, with a more modern catalog.

This project is one of the parts of the Severino application, which will be composed of:

- A web portal for customers (React)
- An app for customers (React Native)
- A portal for professionals (React) - Corresponds to this repository
- A server to serve all applications (NodeJS)

The main libraries used to make this application were:

- React
- React Router Dom
- Material UI
- Formik
- Yup
- React Google Login
- React Input Mask
- Styled Components

For automated tests and static tests, the following were used:

- Jest
- React Testing Library
- Eslint
- Prettier
- MSW
- Husky
- Lint Staged

For hosting, the following were used:

- AWS S3
- AWS CloudFront

<br/>
<hr/>
<br/>

### Coverage tests:

![coverage-severino-professionals](https://user-images.githubusercontent.com/26449308/146114742-534671b6-9bba-4abe-b837-01c45a7211bf.png)
<br/> <br/>

### Page diagram:

![Fluxos ](https://user-images.githubusercontent.com/26449308/146116160-a8b09723-81b1-431b-aec6-23444cd603e2.png)
<br/> <br/>

### Architecture general:

![general-architecture](https://user-images.githubusercontent.com/26449308/146116357-83ade62b-9c51-4f55-ad7c-be62c8aedb11.png)

### TODO:

- Improve city selection. Currently, when selecting a state, it searches for all
cities in that state and this can be slow at times.

- Refactor services folder. Rename requests folder to apis.

### Running locally:

- `git clone https://github.com/gabrielmendes98/severino-professionals.git`
- `cd severino-professionals`
- `yarn`
- `yarn start:prod`
