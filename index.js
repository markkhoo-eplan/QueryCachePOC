const express = require('express')
const app = express()
const port = 3030

const sequelize = require('./config/connection');
const routes = require('./controllers');

sequelize.authenticate()
  .then(() => {
    console.log('Connection to db has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// routes setting
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})