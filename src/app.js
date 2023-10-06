const express = require("express");
const cors = require('cors');
const chatRouters = require("./routers/chat.routers");
const prendasRouters = require("./routers/prenda.routers");
const userRouters = require("./routers/user.routers")
const correoRouters = require("./routers/correo.routers")
const errorHandling = require("./error/errorHandling");
const app = express();

// app.set("port", 3000);

const corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
    maxAge: 500,
    origin: ['http://localhost:4200','https://gala-go-tau.vercel.app/' ]
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(prendasRouters);
app.use(chatRouters);
app.use(userRouters);
app.use(correoRouters);
app.use(function(req, res, next)
{
    res.status(404).json({error:true,
                          codigo: 404,
                          message: "Endpoint doesnt found"})
});

app.use(errorHandling);

module.exports = app;