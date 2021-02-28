const products = [
    {id: 1, title: 'Notebook', price: 40000, context: 'img/netbuk.jpg'},
    {id: 2, title: 'Mouse', price: 200, context: 'img/mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 800, context: 'img/keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 500, context: 'img/gamepad.jpg'},
    {id: 5, title: 'TV', price: 100000, context: 'img/TV.jpg'},
    {id: 6, title: 'Headphones', price: 500, context: 'img/headphones.jpg'},
    {id: 7, title: 'Microphone', price: 500, context: 'img/microphone.jpg'},
    {id: 8, title: 'Telephone', price: 500, context: 'img/telephone.jpg'},
    {id: 9, title: 'No product available', price: 0, context: 'img/not_foto.png'},
    {id: 10, title: 'No product available', price: 0, context: 'img/not_foto.png'},
    {id: 11, title: 'No product available', price: 0, context: 'img/not_foto.png'},
    {id: 12, title: 'No product available', price: 0, context: 'img/not_foto.png'},
];
//Функция для формирования верстки каждого товара
const renderProduct = (title, price, context) => {
    return `<div class="product-item">
                <img class="image" src="${context}" alt="foto">
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