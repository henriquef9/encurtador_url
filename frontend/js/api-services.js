

const form = document.getElementById('urlForm');
const input = document.getElementById('originalUrl');
const result = document.getElementById('result');
const shortUrl = document.getElementById('shortUrl');

const url = '/link/';

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
        shortUrl.textContent = 'http://3.236.159.9'+url+data.shortUrl.shortCode;
        shortUrl.href = 'http://3.236.159.9'+url+data.shortUrl.shortCode;
        result.classList.remove('hidden');
    } catch (error) {
        showModal("Falha ao encurtar a URL: " + error.message);
    }

});