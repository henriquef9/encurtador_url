
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');



modalClose.onclick = () => modal.classList.add('hidden');
window.onclick = (e) => {
    if (e.target == modal) modal.classList.add('hidden');
};

function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
}
