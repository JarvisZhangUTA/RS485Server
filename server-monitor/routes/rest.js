const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();

const CommandModel = require('../models/Command.model');

router.get('/commands', function(req, res) {
  let page = req.query.page ? +req.query.page : 1;
  let per_page = req.query.per_page ? +req.query.per_page : 10;

  CommandModel.find().limit(per_page).skip( per_page * ( page - 1 ) ).exec(function (err, doc) {
      if(err) { res.status(500).json(err); return; };
      res.status(200).json(doc);
  });
});

module.exports = router;