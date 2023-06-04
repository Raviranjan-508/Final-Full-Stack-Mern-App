const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config()


const notesController = Router();


module.exports = {
    notesController
}