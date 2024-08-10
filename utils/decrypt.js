const crypto = require('crypto');

function decryptImage(data, key) {
    return new Promise((resolve, reject) => {
        try {
            const iv = data.slice(0, 16); // Extract the initialization vector
            const encryptedData = data.slice(16);

            const decipher = crypto.createDecipheriv('aes-256-cbc', crypto.createHash('sha256').update(key).digest(), iv);

            let decrypted = decipher.update(encryptedData);
            decrypted = Buffer.concat([decrypted, decipher.final()]);

            resolve(decrypted);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { decryptImage };
