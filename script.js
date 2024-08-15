document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.pratos, .bebidas, .sobremesas');
    const finalizarButton = document.querySelector('.selecionar');
    const modalOverlay = document.getElementById('modal-overlay');
    const confirmButton = document.getElementById('confirm-button');
    const cancelButton = document.getElementById('cancel-button');
    const modalContent = document.getElementById('modal-content');

    sections.forEach(section => {
        const items = section.querySelectorAll('.prato1');

      
        enableDragScroll(section);

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
        let message = 'Olá, gostaria de fazer o pedido:\n';

        selectedItems.forEach(item => {
            const name = item.querySelector('h6').innerText;
            const price = parseFloat(item.querySelectorAll('h6')[1].innerText.replace('R$ ', '').replace(',', '.'));
            total += price;
            itemsHtml += `<p>${name} - R$ ${price.toFixed(2)}</p>`;
            message += `- ${name}\n`;
        });

        itemsHtml += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
        message += `Total: R$ ${total.toFixed(2)}`;

        modalContent.innerHTML = itemsHtml;
        modalOverlay.style.display = 'flex';

        confirmButton.addEventListener('click', function() {
            const whatsappLink = `https://wa.me/5581987010502/?text=${encodeURIComponent(message)}`;
            window.location.href = whatsappLink;
        });
    }

    cancelButton.addEventListener('click', function() {
        modalOverlay.style.display = 'none';
    });

    
    function enableDragScroll(container) {
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 3; 
            container.scrollLeft = scrollLeft - walk;
        });
    }
});

