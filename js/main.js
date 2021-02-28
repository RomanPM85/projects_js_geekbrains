const products = [
    {id: 1, title: 'Notebook', price: 2000, context: 'img/netbuk_small.jpg'},
    {id: 2, title: 'Mouse', price: 20, context: 'img/netbuk_small.jpg'},
    {id: 3, title: 'Keyboard', price: 200, context: 'img/netbuk_small.jpg'},
    {id: 4, title: 'Gamepad', price: 50, context: 'img/netbuk_small.jpg'},
    {id: 5, title: 'Gamepad2', price: 10, context: 'img/netbuk_small.jpg'},
];
//Функция для формирования верстки каждого товара
const renderProduct = (title, price, context) => {
    return `<div class="product-item">
                <img src="${context}" alt="foto">
                <h3>${title}</h3>
                <p>Цена: ${price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price, item.context));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);