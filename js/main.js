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
            {id: 9, title: 'No product available', price: 0, img: 'img/not_foto.png'},
            {id: 10, title: 'No product available', price: 0, img: 'img/not_foto.png'},
            {id: 11, title: 'No product available', price: 0, img: 'img/not_foto.png'},
            {id: 12, title: 'No product available', price: 0, img: 'img/not_foto.png'},
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


class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        // this.itembasket = itembasket
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }

}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 40000},
            {id: 2, title: 'Mouse', price: 200},
            {id: 3, title: 'Keyboard', price: 800},
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

}

let list = new ProductsList();
list.render();

const list = new GoodsList();
list.fetchGoods();
list.render();