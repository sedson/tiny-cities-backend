require('dotenv').config();
const PORT = process.env.PORT || 3000;

// EXPRESS
const express = require('express')
const app = express();

// MONGOOSE config
const mongoose = require('mongoose');
const mongoURI = process.env.DB || 'mongodb://127.0.0.1:27017/tinycities';

const mongooseOpts = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect(mongoURI, mongooseOpts);

const db = mongoose.connection;

db.on('error', (err)=> { console.log('ERROR: ', err)});
db.on('connected', ()=> { console.log("mongo connected")});
db.on('disconnected', ()=> { console.log("mongo disconnected")});

// CORS config
const cors = require('cors');
const corsOPTS  ={
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "optionsSuccessStatus": 204
}

app.use(cors());


// MIDDLEWARE
app.use(express.json());
app.use('/api', require('./city.js'))

app.get('/', (req, res) => {
  res.json({
    message: "running"
  })
})

app.listen(PORT, () => {
  console.log('Listening...')
})
