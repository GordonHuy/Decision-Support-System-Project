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
            let data = await result.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

//display products
class UI {

}

//Local Storage
class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    //get all Products
    products.getProducts().then(data => console.log(data));
});