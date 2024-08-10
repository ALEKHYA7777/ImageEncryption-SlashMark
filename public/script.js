document.getElementById('encryptBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('imageInput').files[0];
    const key = document.getElementById('keyInput').value;

    if (!fileInput || !key) {
        alert('Please select an image and enter a secure key.');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput);
    formData.append('key', key);

    fetch('/encrypt', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'encrypted-image.enc';
        link.click();
        URL.revokeObjectURL(url);
        document.getElementById('result').innerText = 'Image encrypted successfully!';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Encryption failed.';
    });
});

document.getElementById('decryptBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('imageInput').files[0];
    const key = document.getElementById('keyInput').value;

    if (!fileInput || !key) {
        alert('Please select an image and enter a secure key.');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput);
    formData.append('key', key);

    fetch('/decrypt', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'decrypted-image.png';
        link.click();
        URL.revokeObjectURL(url);
        document.getElementById('result').innerText = 'Image decrypted successfully!';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Decryption failed.';
    });
});
