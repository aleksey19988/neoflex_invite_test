let cart = JSON.parse(sessionStorage.getItem('cart'));

const itemsListContainer = document.getElementById('items-list');

function renderItemCard(parentElem, img, title, oldPrice = null, currentPrice, discount = null, count, article, totalItemPrice) {

    oldPrice = oldPrice ?? '';//Если в old_price передали значение - оно запишется, иначе - запишется пустая строка
    
    let htmlText = `<div class="item-card" data-article="${article}">
                        <div class="item-data">
                            <div class="img-and-count">
                                <img src="${img}" alt="headphones" class="item-img">
                                <div class="counter-tools" data-article="${article}">
                                    <img src="icons/minus.png" alt="-" class="minus-btn" id="minus-btn">
                                    <div class="item-count">${count}</div>
                                    <img src="icons/plus.png" alt="+" class="plus-btn" id="plus-btn">
                                </div>
                            </div>
                            <div class="item-title-and-price">
                                <div class="item-title">${title}</div>
                                <div class="item-price">${currentPrice} &#8381</div>
                                <div class="item-price old-price">${oldPrice}</div>
                            </div>
                        </div>
                            <div class="trash-and-total" data-article="${article}">
                                <img src="icons/trash.svg" alt="Удалить" class="trash-icon" id="trash-icon">
                                <div class="total-price">${totalItemPrice} &#8381</div>
                            </div>
                    </div>`;
    let htmlTextWithDiscount = `<div class="item-card" data-article="${article}">
                                    <div class="item-data">
                                        <div class="img-and-count">
                                            <img src="${img}" alt="headphones" class="item-img">
                                            <div class="counter-tools" data-article="${article}">
                                                <img src="icons/minus.png" alt="-" class="minus-btn" id="minus-btn">
                                                <div class="item-count">${count}</div>
                                                <img src="icons/plus.png" alt="+" class="plus-btn" id="plus-btn">
                                            </div>
                                        </div>
                                        <div class="item-title-and-price">
                                            <div class="item-title">${title}</div>
                                            <div class="current-price-and-discount">
                                                <div class="item-price current-price">${currentPrice} &#8381</div>
                                                <div class="item-price discount">-${discount}%</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="trash-and-total" data-article="${article}">
                                        <img src="icons/trash.svg" alt="Удалить" class="trash-icon" id="trash-icon">
                                        <div class="total-price">${totalItemPrice} &#8381</div>
                                    </div>
                                </div>`

    if (discount !== null) {
        parentElem.insertAdjacentHTML('beforeend', htmlTextWithDiscount);
    } else {
        parentElem.insertAdjacentHTML('beforeend', htmlText);
    }
}

function getPropertyValue(item, property) {
    
    if (Object.hasOwnProperty.call(item, property)) {
        return item[property];
    }

    return null;
}

function renderTotalPrice(totalPrice) {
    let totalValue = document.getElementById('total-data-number');
    totalValue.innerHTML = `${totalPrice} &#8381`;
}

/* Перебираем корзину и отрисовываем каждый товар */
function renderCart() {
    let totalPrice = 0;//Переменная для подсчёта общей суммы заказа

    cart.forEach(element => {// Перебираем массив с товарами
        let img = getPropertyValue(element, 'img');
        let title = getPropertyValue(element, 'title');
        let oldPrice = getPropertyValue(element, 'old_price');
        let currentPrice = getPropertyValue(element, 'current_price');
        let discount = getPropertyValue(element, 'discount');
        let article = getPropertyValue(element, 'article');
        let count = getPropertyValue(element, 'count');
        let totalItemPrice = currentPrice * count;
        totalPrice += totalItemPrice;
        /*На каждой итерации вызываем функцию ниже и отрисовываем карточку с товаром */
        renderItemCard(itemsListContainer, img, title, oldPrice, currentPrice, discount, count, article, totalItemPrice);
    });
    
    renderTotalPrice(totalPrice);
}

/* Обрабатываем нажатия на плюс и минус */

function changeNumbersOfItems(cart, item, operation) {
    if (operation === '-') {
        cart.forEach(element => {
            if (element.article === item.article) {
                element.count -= 1;
            }
        });
    } else if (operation === '+') {
        cart.forEach(element => {
            if (element.article === item.article) {
                element.count += 1;
            }
        });
    }
    updateContent();
}

function deleteItem(cart, item) {
    console.log(item);
    updatedData = cart.filter(elem => {
        return elem.article !== item.article;//Если у просматримаего элемента артикул отличный от того, который надо удалить - добавляем его в результат
    });
    console.log(updatedData);
    updateContent(updatedData);
    location.reload();// Пока обновление работает только через автоматическое обновление страницы при достижении кол-ва товара - 0 (ноль)
}

function updateContent(updatedData) {
    sessionStorage.removeItem('cart');//Очищаем данные корзины из sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(updatedData));//Добавляем уже актуальные данные в sessionStorage
    let itemsList = document.getElementById('items-list');// Находим контейнер с карточками товара и очищаем его для дальнейшей отрисовки новых данных. Можно было бы просто менять число в самой карточке, но я пока не умею
    itemsList.innerHTML = '';
    renderCart();// Рендерим карточки товара с актуальными данными
}

document.onclick = event => {
    if (event.target.classList.contains('plus-btn')) {
        let itemArticle = event.target.parentElement.dataset.article;//Получаем артикул товара, на котором нажали
        item = cart.filter(elem => {
            return elem.article === itemArticle;
        });
        changeNumbersOfItems(cart, item[0], '+');
    } else if (event.target.classList.contains('minus-btn')) {
        let itemArticle = event.target.parentElement.dataset.article;//Получаем артикул товара, на котором нажали
        item = cart.filter(elem => {
            return elem.article === itemArticle;
        });
        if (item[0].count <= 1) {//Если у нас и так единица товара в корзине, то при уменьшении он просто должен удаляться из корзины
            deleteItem(cart, item[0]);
        } else {
            changeNumbersOfItems(cart, item[0], '-');
        }
    } else if (event.target.classList.contains('trash-icon')) {
        let itemArticle = event.target.parentElement.dataset.article;//Получаем артикул товара, на котором нажали
        item = cart.filter(elem => {
            return elem.article === itemArticle;
        });
        deleteItem(cart, item[0]);
    }
}

/* Удаление товара из корзины */

renderCart();