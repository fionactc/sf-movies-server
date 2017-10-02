## Aftership Code Challenge - Movies in San Francisco (Server)
This is a web application that let users search and see where movies have been filmed in San Francisco. This is the server side code repo.

Live Demo: [HERE](https://evening-ocean-41110.herokuapp.com/)

Client Side Source: [HERE](https://github.com/fionactc/sf-movies-client)

### Technical Choices
- Node.js: Javascript on server side
- Express: Web framework for Node
- axios: promise-based HTTP requests
- memory-cache: caching incoming data. as only one instance is using this cache, in-memory cache is chosen over centralized cache for its speed and simplicity.
- Chai, Mocha: testing and assertion
- Co-mocha: generator in test

### Project structure
```
├── index.js // entry point
├── npm-debug.log
├── package.json
├── src
│   ├── cache.js // middleware module for caching
│   ├── geoCoder.js // module for using Google GeoCode service
│   ├── movie.js // app routes
│   └── socrata.js // module for Socrata Database (SF movies data)
└── tests 
    ├── geoCoder.spec.js
    ├── movie.spec.js
    └── test-setup.spec.js
```

### API Endpoints
**1. Get movie titles**
**GET** `/api/titles?searchTerm={String}`

Resposnse Data: 

Attribute | Type
---|---
title | String

Response example:
```
[ { title: 'Alexander\'s Ragtime Band' }]
```

**2. Get movie information and locations**
**GET** `/api/movie?title={String}`

Response Data:

Attribute | Type
---|---
director | String
locations | String
release_year | String
title | String
coordinates | Object

Response example:
```
[ { director: 'Henry King',
    locations: 'San Francisco Bay',
    release_year: '1938',
    title: 'Alexander\'s Ragtime Band',
    coordinates: { lat: 37.8039503, lng: -122.4268418 } } ]
```

### Test
- not full coverage
- for routes with straightforward business logic, response status is tested to see if routes handle incomplete request information
- method in `socrata.js` is stubbed when performing route test since it only returns data from 3rd party data source
- in route `GET /movie`, response data is tested to see if coordinates object has been successfully appended. Therefore `geocoder.getCoordinates()` is allowed to fire


### Trade-offs discussion and future Todos
- Security wise, only Heroku default SSL is enabled. Reason being this application does not do much sensitive data transmission or authentication. 
- Better test coverage is required
- Use centralized caching for scalability
- Add monitoring, logging for production
