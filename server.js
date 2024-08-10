const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const { encryptImage } = require('./utils/encrypt');
const { decryptImage } = require('./utils/decrypt');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.post('/encrypt', (req, res) => {
    if (!req.files || !req.body.key) {
        return res.status(400).send('No files or key were uploaded.');
    }

    const image = req.files.image.data;
    const key = req.body.key;

    encryptImage(image, key)
        .then(encryptedData => {
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename="encrypted-image.enc"'
            });
            res.end(encryptedData);
        })
        .catch(err => res.status(500).send(`Encryption error: ${err.message}`));
});

app.post('/decrypt', (req, res) => {
    if (!req.files || !req.body.key) {
        return res.status(400).send('No files or key were uploaded.');
    }

    const image = req.files.image.data;
    const key = req.body.key;

    decryptImage(image, key)
        .then(decryptedData => {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="decrypted-image.png"'
            });
            res.end(decryptedData);
        })
        .catch(err => res.status(500).send(`Decryption error: ${err.message}`));
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
