let cards = {
    // Armazena as informações dos cards base do site
    '1': {
        image: 'assets/img/image1.png',
        tag: 'Camisetas',
        name: 'Lightweight Jacket',
        info: 'Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...',
        price: 'R$ 100.00',
        id: '1'
    },
    '2': {
        image: 'assets/img/image2.png',
        tag: 'Acessórios',
        name: 'Black Hat',
        info: 'O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...',
        price: 'R$ 100.00',
        id: '2'
    },
    '3': {
        image: 'assets/img/image3.png',
        tag: 'Acessórios',
        name: 'Mask',
        info: 'Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...',
        price: 'R$ 40.00'
,        id: '3'
    },
    '4': {
        image: 'assets/img/image4.png',
        tag: 'Camisetas',
        name: 'T-Shirt',
        info: 'Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...',
        price: 'R$ 100.00',
        id: '4'
    },
    '5': {
        image: 'assets/img/image5.png',
        tag: 'Camisetas',
        name: 'Short-Sleeve T-Shirt',
        info: 'Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...',
        price: 'R$ 100.00',
        id: '5'
    },
    '6': {
        image: 'assets/img/image6.png',
        tag: 'Camisetas',
        name: 'Champion Packable Jacket',
        info: 'Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...',
        price: 'R$ 100.00',
        id: '6'
    }
}

// Função para criar cada card
function createCard(card){
    // Criar elementos do card
    let cardConteiner = document.createElement('div')
    let figureConteiner = document.createElement('figure')
    let cardImage = document.createElement('img')
    let infoConteiner = document.createElement('div')
    let itemTag = document.createElement('span')
    let itemName = document.createElement('h3')
    let itemInfo = document.createElement('span')
    let itemPrice = document.createElement('span')
    let itemAdd = document.createElement('a')

    // Adicionar classes e ID's aos elementos do card
    cardConteiner.classList.add('vitrine--card')
    figureConteiner.classList.add('vitrine--card-figure')
    infoConteiner.classList.add('vitrine--card-info-conteiner')
    itemTag.classList.add('vitrine--card-tag')
    itemName.classList.add('vitrine--card-name')
    itemInfo.classList.add('vitrine--card-info')
    itemPrice.classList.add('vitrine--card-price')
    itemAdd.classList.add('vitrine--card-add')
    cardConteiner.id = `vitrine-${card.id}`

    // Adicionar conteúdo em cada elemento
    cardImage.src = card.image
    itemTag.innerText = card.tag
    itemName.innerText = card.name
    itemInfo.innerText = card.info
    itemPrice.innerText = card.price
    itemAdd.innerText = 'Adicionar ao carrinho'

    // Adicionar elementos dentro de seus respectivos 'parents'
    cardConteiner.appendChild(figureConteiner)
    cardConteiner.appendChild(infoConteiner)
    figureConteiner.appendChild(cardImage)
    infoConteiner.appendChild(itemTag)
    infoConteiner.appendChild(itemName)
    infoConteiner.appendChild(itemInfo)
    infoConteiner.appendChild(itemPrice)
    infoConteiner.appendChild(itemAdd)

    // Criar eventListener do botão de adicionar ao carrinho
    itemAdd.addEventListener('click', addToCart)

    // Adicionar o card à vitrine
    let vitrine = document.getElementsByClassName('vitrine')[0]
    vitrine.appendChild(cardConteiner)
}

// Função para adicionar card ao carrinho
function addToCart(event) {
    // Seleciona o card clicado
    const cardID = event.target.parentNode.parentNode.id        // Seleciona o ID do card
    const card = cards[cardID.split('-')[1]]                    // Seleciona o card na lista de cards com o mesmo ID

    // Seleciona o carrinho
    let carrinho = document.getElementsByClassName('carrinho--lista')[0]

    // Criar os elementos que irão dentro do item no carrinho
    let cardConteiner = document.createElement('li')
    let figureConteiner = document.createElement('figure')
    let infoConteiner = document.createElement('div')
    let itemImage = document.createElement('img')
    let itemName = document.createElement('h3')
    let itemPrice = document.createElement('span')                                  
    let removeCard = document.createElement('a')

    // Adicionar Classes nos items do carrinho
    cardConteiner.classList.add('carrinho--card')
    figureConteiner.classList.add('carrinho--card-figure')
    infoConteiner.classList.add('carrinho--card-info')
    itemName.classList.add('carrinho--card-name')
    itemPrice.classList.add('carrinho--card-price')
    removeCard.classList.add('carrinho--card-remove')

    // Adicionar conteúdo nos elementos
    itemImage.src = card.image
    itemName.innerText = card.name
    itemPrice.innerText = card.price
    removeCard.innerText = 'Remover produto'

    // Adicionar elementos dentro de seus respectivos 'parents'
    cardConteiner.appendChild(figureConteiner)
    cardConteiner.appendChild(infoConteiner)
    figureConteiner.appendChild(itemImage)
    infoConteiner.appendChild(itemName)
    infoConteiner.appendChild(itemPrice)
    infoConteiner.appendChild(removeCard)

    // Adicionar a função de remover produto
    removeCard.addEventListener('click', removeCartItem)

    // Verifica se o carrinho está vazio para remover o elemento padrão
    const carrinhoVazio = carrinho.children[0].nodeName == 'DIV'
    if (carrinhoVazio) {
            carrinho.removeChild(carrinho.children[0])
            let carrinhoTotal = document.getElementsByClassName('carrinho-total')[0]
            carrinhoTotal.style.display = 'flex'
    }
    // Adicionar itemConteiner em carrinho
    carrinho.appendChild(cardConteiner)

    // Atualiza o valor total do carrinho
    updateCartTotal()
}

// Função para remover item do carrinho
function removeCartItem(event) {
    // Remove o card
    const cartItem = event.target.parentNode.parentNode
    cartItem.remove()

    // Verifica se o carrinho está vazio e remove o elemento 'carrinho-total' se estiver
    const isCartEmpty = carrinho.children.length == 0
    if (isCartEmpty) {
        createEmptyCart()
        const carrinhoTotal = document.getElementsByClassName('carrinho-total')[0]
        carrinhoTotal.style.display = 'none'
    }
    // Atualiza o valor total do carrinho
    updateCartTotal()
}

// Função para adicionar elementos para o carrinho vazio
function createEmptyCart() {
    // Criar os elementos do carrinho sem itens
    let emptyCartConteiner = document.createElement('div')
    let emptyCartTitle = document.createElement('h2')
    let emptyCartAdd = document.createElement('a')

    // Adicionar texto nos elementos
    emptyCartTitle.innerText = 'Carrinho Vazio'
    emptyCartAdd.innerText = 'Adicionar itens'

    // Adicionar classes aos elementos
    emptyCartConteiner.classList.add('carrinho--vazio-conteiner')
    emptyCartAdd.classList.add('carrinho--card-add')

    // Adicionar elementos em seu parent
    emptyCartConteiner.appendChild(emptyCartTitle)
    emptyCartConteiner.appendChild(emptyCartAdd)

    // Adicionar conteiner de elementos no carrinho
    carrinho = document.getElementsByClassName('carrinho--lista')[0]
    carrinho.appendChild(emptyCartConteiner)
}

function updateCartTotal() {
    // Selecionar elementos que serão atualizados
    let quantityElement = document.getElementById('carrinho-quantity')
    let priceElement= document.getElementById('carrinho-price')

    // Receber a quantidade total de itens
    let cartTotalQuantity = document.getElementsByClassName('carrinho--card')
    cartTotalQuantity = cartTotalQuantity.length.toString()

    // Receber o preço total dos itens
    const cartCards = document.getElementsByClassName('carrinho--card')
    let cartTotalPrice = 0
    for (let i = 0; i < cartCards.length; i++) {                             // Iterar por todos os cards no carrinho
        let cardPrice = cartCards[i].childNodes[1].childNodes[1].innerText   // Acessa o elemento que contém o valor do card
        cardPrice = parseInt(cardPrice.split(' ')[1])                        // Transforma a string 'R$ 100' em número
        cartTotalPrice += cardPrice
    }
    cartTotalPrice = `R$ ${cartTotalPrice},00`

    // Atualizar os elementos de acordo com os as quantidades recebidas
    quantityElement.innerText = cartTotalQuantity
    priceElement.innerText = cartTotalPrice
}

function filterByName() {
    resetVitrine()

    // Seleciona todas as cards da vitrine e armazena em um array
    const vitrineCards = document.getElementsByClassName('vitrine--card')

    // Armazena o valor da pesquisa
    const searchValue = document.querySelector('.barra-pesquisa--input').value
    console.log(searchValue)

    // Itera por todos os card da vitrine
    for (let i = 0; i < vitrineCards.length; i++) {
        const currentCard = vitrineCards[i]
        const currentCardName = currentCard.querySelector('.vitrine--card-name').innerText.toLowerCase()
        
        // Remove o card se o seu nome não incluir o valor selecionado
        if (currentCardName.includes(searchValue.toLowerCase()) == false) {
            currentCard.remove()
            // Decremento do "i" por motivo de remover um elemento do array, que altera seu tamanho
            i--
        }
    }
}

function filterByTag(tag) {
    resetVitrine()

    if (tag != 'Todos'){
        // Seleciona todas as cards da vitrine e armazena em um array
        const vitrineCards = document.getElementsByClassName('vitrine--card')

        // Itera por cada card e verifica se ela possui a tag selecionada
        for (let i = 0; i < vitrineCards.length; i++) {
            const currentCard = vitrineCards[i]
            const currentCardTag = currentCard.querySelector('.vitrine--card-tag').innerText

            if (currentCardTag != tag) {
                // Remove o card se ele não tiver a tag selecionada 
                currentCard.remove()
                // Decremento do "i" por motivo de remover um elemento do array, que altera seu tamanho
                i--
            }
        }
    }
}

function resetVitrine() {
    // Resetar os cards na vitrine
    const vitrine = document.querySelector('.vitrine')
    vitrine.innerHTML = ''
    for(const card of Object.values(cards)) {
        createCard(card)
    }
}

// Criar todos os cards padrão
resetVitrine()

// Criar elemento padrão do carrinho
createEmptyCart()

// Adiciona Event Listener no menu de links
const tagLink = document.getElementsByClassName('menu--link')
for (let i = 0; i < tagLink.length; i++) {
    const link = tagLink[i]
    const tagName = link.innerText
    link.addEventListener('click', () => filterByTag(tagName))
}

// Adiciona Event Listener no botão de pesquisa
const searchButton = document.querySelector('.barra-pesquisa--button')
searchButton.addEventListener('click', filterByName)
