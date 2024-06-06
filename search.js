const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

let db;

function initializeDbConnection() {
    db = mysql.createConnection(dbConfig);
    db.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données MySQL :', err);
            throw err;
        }
    });
}

function closeDbConnection() {
    if (db) {
        db.end((err) => {
            if (err) {
                console.error('Erreur lors de la fermeture de la connexion à la base de données :', err);
                throw err;
            }
        });
    }
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'))
})

// Endpoint pour la recherche
app.get('/search', (req, res) => {
    const input = req.query.entry.toLowerCase();

    const query = `SELECT label FROM entries WHERE entry = ?`;

    db.query(query, [input], (err, result) => {
        if (err) {
            console.error('Erreur lors de la recherche dans la base de données :', err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }        
        if (result.length > 0) {
            res.send(result[0].label);
        } else {
            res.send('Aucun résultat trouvé');
        }
    });
});

module.exports = { app, initializeDbConnection, closeDbConnection };

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
        initializeDbConnection();
    });
}
