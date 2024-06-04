const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const dbConfig = config.dbConfig;

let db;

// Function to initialize the database connection
function initializeDbConnection() {
    db = mysql.createConnection(dbConfig);
    db.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données MySQL :', err);
            throw err;
        }
        console.log('Connecté à la base de données MySQL');
    });
}

// Spécifiez le répertoire contenant vos fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'))
})

// Endpoint pour la recherche
app.get('/search', (req, res) => {
    const input = req.query.entry.toLowerCase();

    // Requête SQL pour chercher dans la base de données
    const query = `SELECT label FROM entries WHERE entry = ?`;

    db.query(query, [input], (err, result) => {
        if (err) {
            console.error('Erreur lors de la recherche dans la base de données :', err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }

        console.log("Result length");
        console.log(result.length);
        
        if (result.length > 0) {
            res.send(result[0].label);
        } else {
            res.send('Aucun résultat trouvé');
        }
    });
});

module.exports = { app, initializeDbConnection };

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
        initializeDbConnection();
    });
}
