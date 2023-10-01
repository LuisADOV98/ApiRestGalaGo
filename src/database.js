const mysql = require("mysql2");

const pool = mysql.createPool(
    {
        host: process.env.DB_HOST || "galago.cnenmyr1gswr.eu-north-1.rds.amazonaws.com",
        user: process.env.DB_USER || "admin",
        password: process.env.DB_PASSWORD || "GalaGo.2023",
        database: process.env.DB_NAME || "GalaGo",
        port: process.env.DB_PORT || 3306
    }).promise();
    console.log("conexion con la BBDD Creada");
    
    module.exports = {pool}

