const express = require('express');
const path = require('path');
const crypto = require('crypto');
//KONEKSI DATABASE ---
require('dotenv').config(); 
const mysql = require('mysql2/promise'); 

const app = express();
const port = process.env.PORT || 3000; 

// Konfigurasi Pool Koneksi Database
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD, // Dibaca dari file .env
    database: process.env.DB_NAME || 'apikey', // Menargetkan database 'apikey'
    port: process.env.DB_PORT || 3309,
    connectionLimit: 10,
});

