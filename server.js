const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { config } = require('dotenv');
const { Client } = require('pg');

const app = express();

const connectionData = {
    user: 'noesax',
    host: 'dpg-cktec1eb0mos73c2bfjg-a',
    database: 'tienda_8n1y',
    password: '2dvTtfwtx3xX2pgtkNN66QQfNKA17phq',
    port: 5432,
}

const client = new Client(connectionData)

client.connect();

app.use(cors());

app.use(express.json());

app.get('/registro', (req, res) => {
    pool.query('SELECT * FROM cliente')
        .then(response => {
            console.log(response.rows);
            res.json(response.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        });
});

app.post('/registro', (req, res) => {
    const { dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email } = req.body;
    const query = 'INSERT INTO cliente (dni, nombre, apellido, fechanac, distrito, departamento, fechaafili, correo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [dni, nombre, apellido, fechaNacimiento, distrito, departamento, fechaAfiliacion, email];

    pool.query(query, values)
        .then(() => {
            res.status(201).json({ message: 'Registro exitoso ' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error en el registro' });
        });
});

app.post('/login', (req, res) => {
    const { dni, correo } = req.body;
    const query = 'SELECT * FROM cliente WHERE dni = $1 AND correo = $2';
    const values = [dni, correo];

    pool.query(query, values)
        .then(response => {
            if (response.rows.length === 1) {
                res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error en el inicio de sesión' });
        });
});

app.get('/productos', (req, res) => {
    pool.query('SELECT * FROM producto')
        .then(response => {
            console.log(response.rows);
            res.json(response.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error en la consulta de productos' });
        });
});

app.get('/login', (req, res) => {
    res.send('Página de inicio de sesión');
});

app.listen(8081, () => {
    console.log('Listening en el puerto 8081');
});
