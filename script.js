document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.pratos, .bebidas, .sobremesas');
    const finalizarButton = document.querySelector('.selecionar');
    const modalOverlay = document.getElementById('modal-overlay');
    const confirmButton = document.getElementById('confirm-button');
    const cancelButton = document.getElementById('cancel-button');
    const modalContent = document.getElementById('modal-content');

    sections.forEach(section => {
        const items = section.querySelectorAll('.prato1');

        items.forEach(item => {
            item.addEventListener('click', () => {
                items.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                checkSelections();
            });
        });
    });

    function checkSelections() {
        const allSelected = [...sections].every(section => 
            section.querySelector('.selected') !== null
        );

        if (allSelected) {
            finalizarButton.style.backgroundColor = '#32B72F';
            finalizarButton.innerHTML = '<p>Fechar pedido</p>';
            finalizarButton.addEventListener('click', openModal);
        } else {
            finalizarButton.style.backgroundColor = '#CBCBCB';
            finalizarButton.innerHTML = '<p>Selecione os 3 ítens</p><p>para fechar o pedido</p>';
            finalizarButton.removeEventListener('click', openModal);
        }
    }

    function openModal() {
        const selectedItems = document.querySelectorAll('.selected');
        let total = 0;
        let itemsHtml = '';

        selectedItems.forEach(item => {
            const name = item.querySelector('h6').innerText;
            const price = parseFloat(item.querySelectorAll('h6')[1].innerText.replace('R$ ', '').replace(',', '.'));
            total += price;
            itemsHtml += `<p>${name} - R$ ${price.toFixed(2)}</p>`;
        });

        itemsHtml += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
        modalContent.innerHTML = itemsHtml;
        modalOverlay.style.display = 'flex';
    }

    confirmButton.addEventListener('click', function() {
        alert('Pedido confirmado!');
        modalOverlay.style.display = 'none'; 
    });

    cancelButton.addEventListener('click', function() {
        modalOverlay.style.display = 'none';
    });


    function closeModal() {
        document.body.classList.remove('modal-active');
        modalOverlay.style.display = 'none';
    }
});
