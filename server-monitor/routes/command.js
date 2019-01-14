const config = require('../config');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();

const CommandModel = require('../models/Command.model');

router.get('/', async function(req, res) {
  let page = req.query.page ? +req.query.page : 1;
  let per_page = req.query.per_page ? +req.query.per_page : 10;

  let data = await CommandModel.find().sort({date: 'desc'}).limit(per_page).skip( per_page * ( page - 1 ) ).exec();
  let total = await CommandModel.count().exec();
  
  res.status(200).json({ data, total });
});

module.exports = router;