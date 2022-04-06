let cart = JSON.parse(sessionStorage.getItem('cart'));
console.log(cart);

const itemsListContainer = document.getElementById('items-list');

function renderItemCard(parentElem, img, title, oldPrice = null, currentPrice, discount = null, count, article, totalItemPrice) {

    oldPrice = oldPrice ?? '';//Если в old_price передали значение - оно запишется, иначе - запишется пустая строка
    
    let htmlText = `<div class="item-card ${article}">
                        <div class="item-data">
                            <div class="img-and-count">
                                <img src="${img}" alt="headphones" class="item-img">
                                <div class="counter-tools">
                                    <img src="icons/minus.png" alt="-" class="minus-btn">
                                    <div class="item-count">${count}</div>
                                    <img src="icons/plus.png" alt="+" class="plus-btn">
                                </div>
                            </div>
                            <div class="item-title-and-price">
                                <div class="item-title">${title}</div>
                                <div class="item-price">${currentPrice} &#8381</div>
                                <div class="item-price old-price">${oldPrice} &#8381</div>
                            </div>
                        </div>
                            <div class="trash-and-total">
                                <img src="icons/trash.svg" alt="Удалить" class="trash-icon">
                                <div class="total-price">${totalItemPrice} &#8381</div>
                            </div>
                    </div>`;
    let htmlTextWithDiscount = `<div class="item-card">
                                    <div class="item-data">
                                        <div class="img-and-count">
                                            <img src="${img}" alt="headphones" class="item-img">
                                            <div class="counter-tools">
                                                <img src="icons/minus.png" alt="-" class="minus-btn">
                                                <div class="item-count">${count}</div>
                                                <img src="icons/plus.png" alt="+" class="plus-btn">
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
                                    <div class="trash-and-total">
                                        <img src="icons/trash.svg" alt="Удалить" class="trash-icon">
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

/* Перебираем корзину и отрисовываем каждый товар */
cart.forEach(element => {// Перебираем массив с товарами
    let img = getPropertyValue(element, 'img');
    let title = getPropertyValue(element, 'title');
    let oldPrice = getPropertyValue(element, 'old_price');
    let currentPrice = getPropertyValue(element, 'current_price');
    let discount = getPropertyValue(element, 'discount');
    let article = getPropertyValue(element, 'article');
    let count = getPropertyValue(element, 'count');
    let totalItemPrice = currentPrice * count;

    /*На каждой итерации вызываем функцию ниже и отрисовываем карточку с товаром */
    renderItemCard(itemsListContainer, img, title, oldPrice, currentPrice, discount, count, article, totalItemPrice);
});