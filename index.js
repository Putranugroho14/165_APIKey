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

// 🚀 ROUTE /CREATE: Membuat dan Menyimpan API Key ke Database
app.post('/create', async (req, res) => {
    
    // 1. Buat Key (Logika lama, tapi dipertahankan)
    const randomBytes = crypto.randomBytes(16).toString('hex').toUpperCase();
    const apiKey = `Putra-${randomBytes.slice(0, 8)}-${randomBytes.slice(8, 16)}-${randomBytes.slice(16, 24)}-${randomBytes.slice(24, 32)}`;

    // 2. Simpan ke Database
    try {
        const sql = 'INSERT INTO api_keys (api_key) VALUES (?)';
        // Menyimpan key baru, created_at akan otomatis diisi oleh MySQL
        const [result] = await pool.execute(sql, [apiKey]); 
        
        // 3. Kirim respons sukses
        res.json({ 
            apiKey, 
            status: 'success', 
            message: 'API Key berhasil dibuat dan disimpan.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Error saat menyimpan API Key:', error);
        res.status(500).json({ status: 'error', message: 'Gagal menyimpan ke database.' });
    }
});

