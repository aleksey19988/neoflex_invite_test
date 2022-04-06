const headphones = [
    {
        img: 'item-images/headphones-item-1.png',
        title: 'Apple BYZ S852I',
        old_price: 3527,
        current_price: 2927,
        rate: 4.7,
        article: 'item-1',
    },
    {
        img: 'item-images/headphones-item-2.png',
        title: 'Apple EarPods',
        current_price: 2327,
        rate: 4.5,
        article: 'item-2',
    },
    {
        img: 'item-images/headphones-item-3.png',
        title: 'Apple EarPods',
        current_price: 2327,
        rate: 4.5,
        article: 'item-3',
    },
    {
        img: 'item-images/headphones-item-4.png',
        title: 'Apple BYZ S852I',
        current_price: 2927,
        discount: 20,
        rate: 4.7,
        article: 'item-4',
    },
    {
        img: 'item-images/headphones-item-5.png',
        title: 'Apple EarPods',
        current_price: 2327,
        rate: 4.5,
        article: 'item-5',
    },
    {
        img: 'item-images/headphones-item-6.png',
        title: 'Apple EarPods',
        current_price: 2327,
        rate: 4.5,
        article: 'item-6',
    },
];

const wirelessHeadphones = [
    {
        img: 'item-images/wireless-headphones-item-1.png',
        title: 'Apple AirPods',
        current_price: 9527,
        rate: 4.7,
        article: 'wireless-item-1',
    },
    {
        img: 'item-images/wireless-headphones-item-2.png',
        title: 'GERLAX GH-04',
        current_price: 6527,
        rate: 4.7,
        article: 'wireless-item-2',
    },
    {
        img: 'item-images/wireless-headphones-item-3.png',
        title: 'BOROFONE BO4',
        current_price: 9527,
        rate: 4.7,
        article: 'wireless-item-3',
    }
];

const headphonesListContainer = document.getElementById('headphones-list');
const wirelessHeadphonesListContainer = document.getElementById('wireless-headphones-list');

function getPropertyValue(item, property) {
    
    if (Object.hasOwnProperty.call(item, property)) {
        return item[property];
    }

    return null;
}

function renderHeadphoneCard(parentElem, img, title, old_price = null, current_price, discount_item = null, rate, article) {
    
    let oldPrice = old_price ?? '';//Если в old_price передали значение - оно запишется, иначе - запишется пустая строка

    let htmlText = `<div class="card ${article}">
                        <img src="${img}" alt="Headphones" class="card-img-top item-img">
                        <div class="card-body">
                            <div class="left-content">
                                <h5 class="card-title item-title">${title}</h5>
                                <div class="card-text item-rating">
                                    <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.6268 17.6614L5.41618 22.0127L7.37647 13.892L0.960754 8.46201L9.38215 7.79538L12.6268 0.0867653L15.8715 7.79538L24.2941 8.46201L17.8771 13.892L19.8374 22.0127L12.6268 17.6614Z" fill="#FFCE7F" class="item-rating-icon"/>
                                    </svg>
                                    <div class="item-rating-text">${rate}</div>
                                </div>
                            </div>
                            <div class="right-content">
                                <div class="item-price">
                                    <div class="card-text item-current-price">${current_price} &#8381</div>
                                    <div class="card-text item-old-price">${oldPrice}</div>
                                </div>
                                <div class="button item-buy" data-article="${article}">Купить</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
    let htmlTextWithDiscount = `<div class="card ${article}">
                                    <img src="${img}" alt="" class="card-img-top item-img">
                                    <div class="card-body">
                                        <div class="left-content">
                                            <h5 class="card-title item-title">${title}</h5>
                                            <div class="card-text item-rating">
                                                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.6268 17.6614L5.41618 22.0127L7.37647 13.892L0.960754 8.46201L9.38215 7.79538L12.6268 0.0867653L15.8715 7.79538L24.2941 8.46201L17.8771 13.892L19.8374 22.0127L12.6268 17.6614Z" fill="#FFCE7F" class="item-rating-icon"/>
                                                </svg>
                                                <div class="item-rating-text">${rate}</div>
                                            </div>
                                        </div>
                                        <div class="right-content">
                                            <div class="item-price">
                                                <div class="price-with-discount">
                                                    <div class="card-text item-current-price">${current_price} &#8381</div>
                                                    <div class="card-text item-discount">-${discount_item}%</div>
                                                </div>
                                                <div class="card-text item-old-price"></div>
                                            </div>
                                            <div class="button item-buy" data-article="${article}">Купить</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>  `

    if (discount_item !== null) {
        parentElem.insertAdjacentHTML('beforeend', htmlTextWithDiscount);
    } else {
        parentElem.insertAdjacentHTML('beforeend', htmlText);
    }
}

/* Перебираем список товаров "наушники" и отрисовываем их */
headphones.forEach(element => {// Перебираем массив с товарами
    let img = getPropertyValue(element, 'img');
    let title = getPropertyValue(element, 'title');
    let oldPrice = getPropertyValue(element, 'old_price');
    let currentPrice = getPropertyValue(element, 'current_price');
    let discount = getPropertyValue(element, 'discount');
    let rate = getPropertyValue(element, 'rate');
    let itemNum = getPropertyValue(element, 'article');

    /*На каждой итерации вызываем функцию ниже и отрисовываем карточку с товаром */
    renderHeadphoneCard(headphonesListContainer, img, title, oldPrice, currentPrice, discount, rate, itemNum);
});

/* Перебираем список товаров "беспроводные наушники" и отрисовываем их */
wirelessHeadphones.forEach(element => {// Перебираем массив с товарами

    /* Записываем каждое свойство в отдельную переменную для дальнейшего использования и подстановки значений в функции */
    let img = getPropertyValue(element, 'img');
    let title = getPropertyValue(element, 'title');
    let oldPrice = getPropertyValue(element, 'old_price');
    let currentPrice = getPropertyValue(element, 'current_price');
    let discount = getPropertyValue(element, 'discount');
    let rate = getPropertyValue(element, 'rate');
    let itemNum = getPropertyValue(element, 'article');

    /*На каждой итерации вызываем функцию ниже и отрисовываем карточку с товаром */
    renderHeadphoneCard(wirelessHeadphonesListContainer, img, title, oldPrice, currentPrice, discount, rate, itemNum);

});

/* Раздел, отвечающий за обработку добавления товара в корзину */

let cart = [];

function getItemByArticle(itemsList, article) {
    return itemsList.filter((element) => {
        return element.article === article;
    });
}

function addItemToTheCart(cart, item) {
    let isAlreadyAdded = false;// Переменная для проверки на наличие товара в корзине

    if (cart.length === 0) {//Если корзина пустая, то сразу добавляем товар в корзину
        item[0].count = 1;
        cart.push(item[0]);
        return true;
    }

    cart.forEach(element => {
        if (element.article === item[0].article) {// Если в корзине уже лежит такой товар, то просто увеличиваем его кол-во на 1
            element.count += 1;
            isAlreadyAdded = true;
        }
    });

    if (!isAlreadyAdded) {
        item[0].count = 1;
        cart.push(item[0]);
    }
}

function getItemCount() {
    result = 0;

    lastUpdatedData = JSON.parse(sessionStorage.getItem('cart'));
    lastUpdatedData.forEach(element => {
        result += element.count;
    });

    return result;
}

document.onclick = event => {
    if (event.target.classList.contains('item-buy')) {
        let itemArticle = event.target.dataset.article;// Получаем артикул товара, на котором нажали "купить"
        item = getItemByArticle(headphones, itemArticle);
        if (item.length < 1) {// Если в списке с обычными наушниками ничего не нашёл
            item = getItemByArticle(wirelessHeadphones, itemArticle);// То ищем в списке с беспроводными
        }
        addItemToTheCart(cart, item);//Добавляем товар в корзину

        /*Добавляем данные в SessionStorage */
        sessionStorage.setItem('cart', JSON.stringify(cart));//Записываем данные в строку JSON, т. к. sessionStorage принимает только строку

        /*Увеличиваем число на иконке корзины в соответствии с количеством товара в корзине */
        let cartCircle = document.getElementById('cart-circle');
        cartCircle.innerHTML = getItemCount();
    }
}

