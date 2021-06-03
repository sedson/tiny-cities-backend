const { Schema, model } = require('mongoose');
const express = require('express');


const citySchema = new Schema({
  title: String,
  cityData: Object,
  time: Number
})

const City = model('City', citySchema);


const router = express.Router();
module.exports = router;

router.get('/', (req, res) => {
  City.find({}).sort({'time': -1}).exec((err, data) => {
    if (err) {
      res.status(400);
      return;
    }
    res.status(200).json({data})
  })
})

router.get('/:id', (req, res) => {
  console.log('get hit')
  City.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(400).json({hi: 'oof'});
      return;
    }
    res.status(200).json({data})
  })
})

router.delete('/:id', (req, res) => {
  City.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(400);
      return;
    }
    res.status(200).json({action: 'deleted'})
  })
})

router.post('/', (req, res) => {
  const entry = {
    title: req.body.title,
    cityData: req.body.cityData,
    time: Date.now(),
  }


  City.create(entry, (err, data) => {
    if (err) {
      res.status(400);
      return;
    }
    res.status(200).json(data)
  })
})


router.put('/:id', (req, res) => {
  const update = {
    time: Date.now(),
    cityData: req.body.cityData,
    title: req.body.title
  }

  City.findByIdAndUpdate(req.params.id, update, {new: true}, (err, data) => {
    if (err) {
      console.log(err);

      res.status(400);
      return;
    }
    res.status(200).json({message: "saved"})
  })
})
