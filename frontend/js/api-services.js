

const form = document.getElementById('urlForm');
const input = document.getElementById('originalUrl');
const result = document.getElementById('result');
const shortUrl = document.getElementById('shortUrl');


form.addEventListener('submit', async (e) => {

    e.preventDefault();
    const originalUrl = input.value.trim();

    if (!originalUrl) {
        showModal('Por favor, insira uma URL válida.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/my-system/urls', {
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
        shortUrl.textContent = "http://localhost:8000/my-system/urls/"+data.shortUrl.shortCode;
        shortUrl.href = "http://localhost:8000/my-system/urls/"+data.shortUrl.shortCode;
        result.classList.remove('hidden');
    } catch (error) {
        showModal(error.message);
    }

});