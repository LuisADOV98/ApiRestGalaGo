const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "admin",
        password: process.env.DB_PASSWORD || "GalaGo.2023",
        database: process.env.DB_NAME || "GalaGo",
        port: process.env.DB_PORT || 3306
    })