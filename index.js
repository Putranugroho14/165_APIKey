const express = require('express');
const path = require('path');
const crypto = require('crypto');
// KONEKSI DATABASE ---
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

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint test (tetap)
app.get('/test', (req, res) => {
    res.send('Hello World!');
});

// Endpoint utama: kirim file index.html (tetap)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
