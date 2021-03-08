const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchProducts();
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    // _fetchProducts() {
    //     this.goods = [
    //         {id: 1, title: 'Notebook', price: 40000, img: 'img/netbuk.jpg'},
    //         {id: 2, title: 'Mouse', price: 200, img: 'img/mouse.jpg'},
    //         {id: 3, title: 'Keyboard', price: 800, img: 'img/keyboard.jpg'},
    //         {id: 4, title: 'Gamepad', price: 500, img: 'img/gamepad.jpg'},
    //         {id: 5, title: 'TV', price: 100000, img: 'img/TV.jpg'},
    //         {id: 6, title: 'Headphones', price: 500, img: 'img/headphones.jpg'},
    //         {id: 7, title: 'Microphone', price: 500, img: 'img/microphone.jpg'},
    //         {id: 8, title: 'Telephone', price: 500, img: 'img/telephone.jpg'},
    //         {id: 9, title: 'No product available', price: 0, img: 'img/not_foto.png'},
    //         {id: 10, title: 'No product available', price: 0, img: 'img/not_foto.png'},
    //         {id: 11, title: 'No product available', price: 0, img: 'img/not_foto.png'},
    //         {id: 12, title: 'No product available', price: 0, img: 'img/not_foto.png'},
    //     ];

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }

    getSum() {
        let res = this.allProducts.reduce((sum, item) => sum += item.price, 0);
        alert(res);
    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
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

class Basket {
    constructor() {
        this.countGoods = 0; //Общая стоимость товаров
        this.amount = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров
        this.container = '.cart-content'; // контейнер для корзины
        this.allProducts = [];
        this._getBasket()
            .then(() => {
                this.render();
            });
    }

    //метод получения товаров в корзине
    _getBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.basketItems = data;
                this.countGoods = data.countGoods;
                this.totalPrice = data.totalPrice;
                this.amount = data.amount;
            })
            .catch(error => {
                console.log(error);
            })
    }

    //отрисовка корзины
    render() {
        document.querySelector(this.container).innerHTML = '';
        const block = document.querySelector(this.container);
        for (let product of this.basketItems.contents) {
            const prod = new ElemBasket(product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
        }
        let out = `<div class="out">Всего товаров в корзине: ${this.countGoods}<br> На сумму: ${this.amount} рублей</div> `;
        block.insertAdjacentHTML('beforeend', out);
    }
}
class ElemBasket {
    constructor(product) {
        this.title = product.product_name;
        this.id = product.id_product;
        this.amount = product.amount;
        this.price = product.price;
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="cart-item">
                    <div class="cart-desc">
                        <h3 class="cart-name">${this.title}</h3>
                        <p>Количество: ${this.quantity} шт.</p>
                        <p class="cart-price">Цена: ${this.price} руб.</><br>
                        <p class="cart-price">Итого: ${this.price} руб.</p><br>
                  </div>
              </div>`
    }

    // addGoods() {
    // }
    //
    // removeGoods() {
    //
    // }
    //
    // changeGoods() {
    //
    // }
}

let list = new ProductsList();
list.render();
list.getSum();

let cart = new Basket();