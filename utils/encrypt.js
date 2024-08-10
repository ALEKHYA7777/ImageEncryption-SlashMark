const crypto = require('crypto');

function encryptImage(data, key) {
    return new Promise((resolve, reject) => {
        try {
            const iv = crypto.randomBytes(16); // Create a random initialization vector
            const cipher = crypto.createCipheriv('aes-256-cbc', crypto.createHash('sha256').update(key).digest(), iv);

            let encrypted = cipher.update(data);
            encrypted = Buffer.concat([encrypted, cipher.final()]);

            // Prepend IV to the encrypted data for decryption
            resolve(Buffer.concat([iv, encrypted]));
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { encryptImage };
