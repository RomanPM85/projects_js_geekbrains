// const products = [
//     {id: 1, title: 'Notebook', price: 40000, context: 'img/netbuk.jpg'},
//     {id: 2, title: 'Mouse', price: 200, context: 'img/mouse.jpg'},
//     {id: 3, title: 'Keyboard', price: 800, context: 'img/keyboard.jpg'},
//     {id: 4, title: 'Gamepad', price: 500, context: 'img/gamepad.jpg'},
//     {id: 5, title: 'TV', price: 100000, context: 'img/TV.jpg'},
//     {id: 6, title: 'Headphones', price: 500, context: 'img/headphones.jpg'},
//     {id: 7, title: 'Microphone', price: 500, context: 'img/microphone.jpg'},
//     {id: 8, title: 'Telephone', price: 500, context: 'img/telephone.jpg'},
//     {id: 9},
//     {id: 10},
//     {id: 11},
//     {id: 12},
// ];

// //Функция для формирования верстки каждого товара
// const renderProduct = (title='No product available', price=0, context='img/not_foto.png') => {
//     return `<div class="product-item">
//                 <img class="image" src="${context}" alt="photo products">
//                 <h3>${title}</h3>
//                 <p>Цена: ${price} руб.</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item.title, item.price, item.context)).join('');
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList;
// };
//
// renderPage(products);

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 40000, img: 'img/netbuk.jpg'},
            {id: 2, title: 'Mouse', price: 200, img: 'img/mouse.jpg'},
            {id: 3, title: 'Keyboard', price: 800, img: 'img/keyboard.jpg'},
            {id: 4, title: 'Gamepad', price: 500, img: 'img/gamepad.jpg'},
            {id: 5, title: 'TV', price: 100000, img: 'img/TV.jpg'},
            {id: 6, title: 'Headphones', price: 500, img: 'img/headphones.jpg'},
            {id: 7, title: 'Microphone', price: 500, img: 'img/microphone.jpg'},
            {id: 8, title: 'Telephone', price: 500, img: 'img/telephone.jpg'},
            {id: 9, title:'No product available', price:0, img:'img/not_foto.png'},
            {id: 10},
            {id: 11},
            {id: 12},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
//            block.innerHTML += productObj.render();
        }
    }

}


class ProductItem {
    constructor(product, img) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img class="image" src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list.render();
