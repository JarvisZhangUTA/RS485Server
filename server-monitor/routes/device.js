const config = require('../config');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();

const DeviceModel = require('../models/Device.model');

