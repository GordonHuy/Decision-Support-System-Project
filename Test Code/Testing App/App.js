const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

//Cart
let cart = [];
//buttons
let buttonsDOM = [];

//Getting the products
class Products{
    async getProducts(){
        try{
            let result = await fetch('laptop_price_2.json')
            let products =  await result.json()
            return products;
        } catch(error){
            console.log(error)
        }
    }
}

//Display products
class UI{
    displayProducts(products){
        console.log(products)
        let result = "";
        products.forEach(product => {
            result += `
            <!--Single Product-->
            <article class="product">
                <div class="img-container">
                    <img src="./Image/Laptop.png" alt="product" class="product-img">
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        Add To Bag
                    </button>
                </div>
                <h3>Name: ${product.Product}</h3>
                <h3>Brand: ${product.Company}</h3>
                <h3>Type: ${product.TypeName}</h3>
                <h3>Screen Size: ${product.Inches} Inches</h3>
                <h4>Price: ${product.Price_euros} euros</h4>
            </article>
            <!--End of Single Product-->
            `;
        });
        productsDOM.innerHTML = result;
    }

    getBagButtons(){
        const buttons = [ ...document.querySelectorAll(".bag-btn")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                button.innerText = "In Cart";
                button.disabled = true;
            }
            button.addEventListener("click", (event)=>{
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    //get product from products
                    let cartItem = {...Storage.getProduct(id),amount: 1 };
                    //add product to the cart
                    cart = [...cart, cartItem];
                    //save cart in local storage
                    Storage.saveCart(cart)
                    //set cart values
                    this.setCartValues(cart);
                    //display cart item
                    this.addCartItem(cartItem);
                    //show the cart

                });
        });
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.Price_euros * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML= `
        <img src="./Image/Computer.png" alt="product" />
                    <div>
                        <h4>${item.Product}</h4>
                        <h5>${item.Price_euros} euros</h5>
                        <span class="remove-item" data-id=${item.id}>Remove</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up" data-id=${item.id}></i>
                        <p class="item-amount">${item.amount}</p>
                        <i class="fas fa-chevron-down" data-id=${item.id}></i>
                    </div>
        `;
        cartContent.appendChild(div);
        console.log(cartContent);
    }
}

//Local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)

    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new Products();

    //get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(()=>{
        ui.getBagButtons();
    });
});