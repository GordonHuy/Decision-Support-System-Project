const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItem = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

//Cart
let cart = [];

//Getting the products
class Products{
    async getProducts(){
        try{
            let result = await fetch('laptop_price.json')
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
        let result = '';
        products.forEach(product => {
            result += `
            <!--Single Product-->
            <article class="product">
                <div class="img-container">
                    <img src="./Image/Laptop.png" alt="product" class="product-img">
                    <button class="bag-btn" data-id=${product.laptop_ID}>
                        <i class="fas fa-shopping-cart"></i>
                        Add To Bag
                    </button>
                </div>
                <h3>${product.Product}</h3>
                <h3>Type: ${product.TypeName}<h3>
                <h3>Screen size: ${product.Inches} Inches<h3>
                <h3>Operating System: ${product.OpSys}<h3>
                <h4>${product.Price_euros} euros </h4>
            </article>
            <!--End of Single Product-->
            `;
        });
        productsDOM.innerHTML = result;
    }

    getBagButton(){
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id == id);
            if(inCart){
                button.innerText = "In Cart";
                button.disable = true
            }
            else{
                button.addEventListener('click', (event)=>{
                    event.target.innerText = "In Cart";
                    event.target.disabled = true
                })
            }
        });
    }
}

//Local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new Products();

    //get all products
    products.getProducts().then(products => {
        ui.displayProducts(products)
        Storage.saveProducts(products);
    }).then(()=>{
        ui.getBagButton();
    });
});