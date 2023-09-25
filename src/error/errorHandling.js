const express = require('express');
const app = express();

function errorHandling(err, req, res, next)
{
    res.status(500).json({message: err.message});
}

module.exports = errorHandling;