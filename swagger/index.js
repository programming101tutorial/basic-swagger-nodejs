const swaggerJSDoc = require('swagger-jsdoc');

const definition = {
  openapi: "3.0.1",
  info: {
    title: 'Swagger',
    version: "1.0.1",
    description: 'example',
    termsOfService: "http://example.com/terms/",
    contact: {
      name: "API Support",
      url: "http://www.example.com/support",
      email: "support@example.com"
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:{port}/api",
      description: "The production API server",
      variables: {
        port: {
          enum: [
            "3000",
            "80",
            "443"
          ],
          default: "3000"
        },
      }
    }
  ],
  tags: [
    {
      name: "person",
      description: "person operations",
      externalDocs: {
        description: "Find out more",
        url: "http://swagger.io"
      }
    },
    {
      name: "login",
      description: "login operations",
      externalDocs: {
        description: "Find out more",
        url: "http://swagger.io"
      }
    }
  ],
};

const options = {
  definition,
  // Path to the API docs
  apis: ['./swagger/docs/*.yaml'],
};

//generate swagger.yaml
// swagger-jsdoc -d /swagger/index.js -o swagger.yaml

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
module.exports = swaggerJSDoc(options);