// адресс на репозиторий, где хранятся json файлы с товарами
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        isVisibleCart: false,
        searchLine: '',
        catalogUrl: '/catalogData.json',
        products: [],
        cartItems: [],
        isCartFull: false,
        cartProductsCount: 0,
        cartProductsSum: 0,
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: `https://placehold.it/50x70`
    },
    computed: {
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        this.cartProductsCount++;
                        this.cartProductsSum += product.price;
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({
                                quantity: 1
                            }, product);
                            this.cartItems.push(prod);
                        }
                        this.isCartFull = !!this.cartItems.length;

                        console.log(this.cartProductsCount, this.cartProductsSum);
                    } else {
                        console.log('Error!');
                    }
                })
        },
        removeProduct(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        let id = +product.id_product;
                        let find = this.cartItems.find(el => el.id_product === id);
                        this.cartProductsCount--;
                        this.cartProductsSum -= product.price;
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }
                        this.isCartFull = !!this.cartItems.length;
                    } else {
                        console.log('Error!');
                    }
                })
        },
        FilterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (this.filtered.includes(el)) {
                    block.classList.remove('invisible')
                } else {
                    block.classList.add('invisible')
                }
            })
        },
        init() {
            document.querySelector('.search-form').addEventListener('submit', e => {
                e.preventDefault();
            });
            if (this.cartItems.length) {
                this.isCartFull = true;
            }
        },
    },
    mounted() {
        this.init();
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
    }
});

// реализация из 6 классов, для просмотра читать снизу вверх, т.е. от вызовов классов

// Базовый класс родитель
// class List {
//     // Конструктор: путь к json файлу через url, контейнер куда будут вставляться товары, связь между классами
//     constructor(url, container, list = list2){
//         this.container = container; //контейнер
//         this.list = list; // связь классв
//         this.url = url; // адресс
//         this.goods = []; //массив товаров, сами товары
//         this.allProducts = []; //массив объектов класса товара
//         this.filtered = []; // массив объектов фильтра
//         this._init(); // вызов метода инит, для переопределения в потомке от данного класса
//     }
//     getJson(url){ //метод получение файла JSON и преобразования его в код JavaScript
//         return fetch(url ? url : `${API + this.url}`) // для запуска как локальных так и из репозитория
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     handleData(data){ //распаковываем список товаров и передаем методу render для отображения на странице
//         this.goods = [...data];
//         this.render();
//     }
//     calcSum(){ // метод суммирование товаров
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//     render(){ // вывод товаров на страницу
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObj = new this.list[this.constructor.name](product);
//             console.log(productObj);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render()); //вывод отдельного товара
//         }
//     }
//     filter(value){ // метод фильтрации товаров по каталогу
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible'); //по умолчанию невидимый
//             } else {
//                 block.classList.remove('invisible'); //по умолчанию невидимый
//             }
//         })
//     }
//     _init(){
//         return false
//     }
// }
// // класс базового товара:
// class Item{
//     constructor(el, img = 'https://placehold.it/200x150'){
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.id_product = el.id_product;
//         this.img = img;
//     }
//     render(){
//         return `<div class="product-item" data-id="${this.id_product}">
//                 <img src="${this.img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${this.product_name}</h3>
//                     <p>${this.price} $</p>
//                     <button class="buy-btn"
//                     data-id="${this.id_product}"
//                     data-name="${this.product_name}"
//                     data-price="${this.price}">Купить</button>
//                 </div>
//             </div>`
//     }
// }
// // список товаров каталога, потомок класса List
// class ProductsList extends List{
//     constructor(cart, container = '.products', url = "/catalogData.json"){
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }
//     _init(){ //регистрируем собитие нажатие клика,
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('buy-btn')){
//                 this.cart.addProduct(e.target);
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value)
//         })
//     }
// }
//
// //класс товара каталога
// class ProductItem extends Item{}
// // класс - списк товаров корзинки
// class Cart extends List{
//     constructor(container = ".cart-block", url = "/getBasket.json"){
//         super(url, container);
//         this.getJson()
//             .then(data => {
//                 this.handleData(data.contents);
//             });
//     }
//     addProduct(element){
//         this.getJson(`${API}/addToBasket.json`) //addToBasket.json, проверка связи с JSON объектом в репозитории.
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id']; // получаем id по событию
//                     let find = this.allProducts.find(product => product.id_product === productId); //ищем товары
//                     if(find){
//                         find.quantity++;//если товар находим такой же, прибавляем количество
//                         this._updateCart(find); //обновляем корзину
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         };
//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     removeProduct(element){ //метод удаление элементов корзинки
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find.quantity > 1){
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     _updateCart(product){ //метод обновление, добавление элементов  корзинки
//        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
//        block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
//     }
//     _init(){
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//         document.querySelector(this.container).addEventListener('click', e => {
//            if(e.target.classList.contains('del-btn')){
//                this.removeProduct(e.target);
//            }
//         })
//     }
//
// }
// // класс товара корзинки
// class CartItem extends Item{
//     constructor(el, img = 'https://placehold.it/50x100'){
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render(){
//     return `<div class="cart-item" data-id="${this.id_product}">
//             <div class="product-bio">
//             <img src="${this.img}" alt="Some image">
//             <div class="product-desc">
//             <p class="product-title">${this.product_name}</p>
//             <p class="product-quantity">Quantity: ${this.quantity}</p>
//         <p class="product-single-price">$${this.price} each</p>
//         </div>
//         </div>
//         <div class="right-block">
//             <p class="product-price">$${this.quantity*this.price}</p>
//             <button class="del-btn" data-id="${this.id_product}">&times;</button>
//         </div>
//         </div>`
//     }
// }
// // Связь классов между собой {класс список_товаров: класс_товары}
// const list2 = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };
//
// let cart = new Cart();
// let products = new ProductsList(cart);
// products.getJson(`getProducts.json`).then(data => products.handleData(data));
