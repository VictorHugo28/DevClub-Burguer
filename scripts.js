window.onload = function() {
    // Seleciona todas as imagens e esconde-as ao carregar a página
    const images = document.querySelectorAll('ul li img');
    const priceParagraphs = document.querySelectorAll('ul li p');
    const listItems = document.querySelectorAll('ul li'); // Seleciona os itens da lista (li) para remover as bordas
    let totalParagraphExists = false; // Variável para garantir que o parágrafo apareça apenas uma vez

    images.forEach(image => {
        image.style.display = 'none'; // Esconde as imagens
    });

    // Adiciona evento de clique ao botão "Mostrar tudo"
    const showAllButton = document.querySelector('button:nth-child(1)');
    showAllButton.addEventListener('click', function() {
        images.forEach(image => {
            image.style.display = 'block'; // Mostra todas as imagens ao clicar no botão
        });
    });

    // Função para aplicar 10% de desconto usando o botão "Mapear"
    const mapButton = document.querySelector('button:nth-child(2)');
    mapButton.addEventListener('click', function() {
        const prices = document.querySelectorAll('.item-price'); // Seleciona todos os elementos com o preço

        // Mapeia todos os preços e aplica o desconto
        prices.forEach(priceElement => {
            let priceText = priceElement.textContent.replace('R$', '').replace(',', '.').trim(); // Extrai o valor numérico
            let price = parseFloat(priceText); // Converte para número
            let discountedPrice = price * 0.9; // Aplica 10% de desconto
            priceElement.textContent = `R$ ${discountedPrice.toFixed(2).replace('.', ',')}`; // Atualiza o preço com o desconto
        });
    });

    // Função para somar todos os preços usando o botão "Somar tudo"
    const sumButton = document.querySelector('button:nth-child(3)');
    sumButton.addEventListener('click', function() {
        if (!totalParagraphExists) { // Garante que o parágrafo apareça apenas uma vez
            const prices = document.querySelectorAll('.item-price'); // Seleciona todos os elementos de preço

            // Converte os preços em um array de números e calcula a soma
            const total = Array.from(prices).reduce((sum, priceElement) => {
                let priceText = priceElement.textContent.replace('R$', '').replace(',', '.').trim(); // Extrai o valor numérico
                let price = parseFloat(priceText); // Converte para número
                return sum + price; // Soma os preços
            }, 0);

            // Esconde as imagens e os parágrafos de preços, e remove as bordas dos itens da lista
            images.forEach(image => {
                image.style.display = 'none'; // Esconde as imagens
            });
            priceParagraphs.forEach(paragraph => {
                paragraph.style.display = 'none'; // Esconde os parágrafos com os nomes e preços
            });
            listItems.forEach(item => {
                item.style.border = 'none'; // Remove as bordas dos itens da lista
            });

            // Cria o parágrafo com o total e adiciona à tela
            let totalParagraph = document.createElement('p');
            totalParagraph.textContent = `A soma de todos os itens do menu é: R$ ${total.toFixed(2).replace('.', ',')}`;
            totalParagraph.style.color = 'white';
            totalParagraph.style.fontSize = '24px';
            totalParagraph.style.fontWeight = 'bold';
            totalParagraph.style.position = 'absolute'; // Posiciona o parágrafo no centro da tela
            totalParagraph.style.top = '50%';
            totalParagraph.style.left = '50%';
            totalParagraph.style.transform = 'translate(-50%, -50%)'; // Centraliza o parágrafo
            totalParagraph.style.textAlign = 'center'; // Centraliza o texto

            document.body.appendChild(totalParagraph); // Adiciona o parágrafo ao corpo da página
            totalParagraphExists = true; // Impede que o parágrafo seja adicionado mais de uma vez
        }
    });

    // Função para filtrar e exibir apenas os lanches veganos usando o botão "Filtrar"
    const filterButton = document.querySelector('button:nth-child(4)');
    filterButton.addEventListener('click', function() {
        // Filtra apenas os lanches que têm a propriedade vegan: true
        const veganBurgers = Array.from(listItems).filter(item => {
            const itemName = item.querySelector('p').textContent;
            // Aqui, você pode comparar os nomes dos itens filtrados com a lista de veganos
            return ['Big Vegano', 'X-Vegan'].includes(itemName); // Exemplo com dois lanches veganos
        });

        // Esconde todos os lanches primeiro
        listItems.forEach(item => {
            item.style.display = 'none';
        });

        // Mostra apenas os lanches veganos
        veganBurgers.forEach(item => {
            item.style.display = 'block';
        });
    });
};
