const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const swaggerSpec = require('./swagger/index');
const port = 3000;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.text());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// console.log(typeof(swaggerSpec));

// fs.writeFile("swagger.json", JSON.stringify(swaggerSpec), 'utf8', function (err) {
//   if (err) {
//       console.log("An error occured while writing JSON Object to File.");
//       return console.log(err);
//   }

//   console.log("JSON file has been saved.");
// });

// const buf = Buffer.from(JSON.stringify(swaggerSpec));

// app.use(
//     OpenApiValidator.middleware({
//       apiSpec: swaggerSpec,
//       validateResponses: false, // <-- to validate responses
//       // unknownFormats: ['my-format'] // <-- to provide custom formats
//     }),
//   );
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerSpec,
    validateResponses: false, // <-- to validate responses
    // unknownFormats: ['my-format'] // <-- to provide custom formats
  }),
);


  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.post('/api/person', (req, res) => {
      const { name } = req.body;
      console.log('name : ', name);
      res.json({...req.body});
  })
  app.put('/api/person', (req, res) => {
    const { name } = req.body;
    console.log('name : ', name);
    res.json({...req.body});
})
  app.get('/api/person/:id', (req, res) => {
      res.json({query: req.query, params: req.params, header: req.headers});
  })


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})