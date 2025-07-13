

const form = document.getElementById('urlForm');
const input = document.getElementById('originalUrl');
const result = document.getElementById('result');
const shortUrl = document.getElementById('shortUrl');

const url = '/link/';
const ip = 'http://44.199.192.128'

form.addEventListener('submit', async (e) => {

    e.preventDefault();
    const originalUrl = input.value.trim();

    if (!originalUrl) {
        showModal('Por favor, insira uma URL válida.');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl: originalUrl })
        });

        if (!response.ok) {
            throw new Error('Erro ao encurtar a URL');  
        }

        const data = await response.json();
        shortUrl.textContent = ip+url+data.shortUrl.shortCode;
        shortUrl.href =  ip+url+data.shortUrl.shortCode;
        result.classList.remove('hidden');
    } catch (error) {
        showModal("Falha ao encurtar a URL: " + error.message);
    }

});