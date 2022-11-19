// Variable 

const CartButton = document.querySelector(".cart-button")
const CloseCartButton = document.querySelector(".close-cart")
const ClearCartButton = document.querySelector(".clear-cart")
const CartDOM = document.querySelector(".cart")
const CartOverlay = document.querySelector(".cart-overlay")
const CartItems = document.querySelector(".cart-item")
const CartTotal = document.querySelector(".cart-total")
const CartContent = document.querySelector(".cart-content")
const productsDOM = document.querySelector(".ProductCenter")

//Cart
let Cart = [];


//getting the product
class Products {
    async getProducts() {
        try {
            let result = await fetch("laptop_price.json")
            let products = await result.json();
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

//display products
class UI {
    displayProducts(products){
        let result = "";
        products.forEach(product => {
             result +=`
            <!--Single Product-->
            <article class="Product">

                <div class="ImageContainer">

                    <img src="./Image/Computer.png" alt="Product" class="ProductImage">

                    <button class="BagButton", data-id=${product.laptop_ID}>
                        <i class="fas fa-shopping-cart"></i>
                        Add to bag
                    </button>

                </div>

                <h3>${product.Product}</h3>
                <h4>${product.Price_euros}</h4>
            </article>
            <!--End of single product-->
            `;
        });
        productsDOM.innerHTML = result;
    }
}


//Local Storage
class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    //get all Products
    products.getProducts().then(products => ui.displayProducts(products))
});