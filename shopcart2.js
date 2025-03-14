document.addEventListener("DOMContentLoaded", function() {
        var MainImg = document.getElementById("MainImg");
        var smallImg = document.getElementsByClassName("small-image");

        for (var i = 0; i < smallImg.length; i++) {
            smallImg[i].addEventListener("click", function() {
                MainImg.src = this.src;
            });
        }
    });



let iconCart1= document.querySelector('.iconCart1');
let cart1= document.querySelector('.cart1');
let container= document.querySelector('.container');
let close= document.querySelector('.close');

iconCart1.addEventListener('click',()=>{
	if (cart1.style.right=='-100%'){
		cart1.style.right='0';
		container.style.transform='translateX(-400PX)';
	}else{
		cart1.style.right='-100%';
		container.style.transform='translateX(0)';
	}
	
})
close.addEventListener('click',()=>{
	cart1.style.right='-100%';
	container.style.transform='translatex(0)';
})

let products=null;
//get data from JSON
fetch('product.json')
.then(response=>response.json())
.then(data=>{
	products=data;
	addDataToHTML();
})
//show data 
function addDataToHTML(){
	//remove data 
	let listProductHTML=document.querySelector('.listProduct');
	listProductHTML.innerHTML='';
	
	//add new data
	if(products!=null){
		products.forEach(product=>{
			let newProduct=document.createElement('div');
			newProduct.classList.add('item');
			newProduct.innerHTML=
			`<img src="${product.image}">
			<h2>${product.name}</h2>
			<div class="price">$${product.price}</div>
			<button onclick="addCart(${product.id})">Add to Cart</button>`;
			listProductHTML.appendChild(newProduct);
		});
	}
}
let listCart=[];
function checkCart(){
	var cookieValue = document.cookie
	.split(';')
	.find(row=>row.startsWith('listCart='));
	if(cookieValue){
		listCart=JSON.parse(cookieValue.split('=')[1]);
	}
}
checkCart();
function addCart($idProduct){
	let productCopy=JSON.parse(JSON.stringify(products));
	//if product not in Cart
	if(!listCart[$idProduct]){
		let dataProduct = productCopy.filter(
			product=> product.id == $idProduct
		)[0];
		//add  product 
		listCart[$idProduct] = dataProduct;
		listCart[$idProduct].quantity = 1;
	}else{
		//if product is in cart
		listCart[$idProduct].quantity++;
	}
	//saving in cookie
	let timeSave="expires=Thu,31 Dec 2025 23:59:59 UTC";
	document.cookie="listCart="+JSON.stringify(listCart)+";"+timeSave+";path=/;";
	addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){

	let listCartHTML=document.querySelector('.listCart');
	listCart.innerHTML='';
	
	let totalHTML = document.querySelector('.totalQuantity');
	let totalQuantity=0;
	
	if (listCart){
		listCart.forEach(product=>{
			if(product){
				let newCart=document.createElement('div');
				newCart.classList.add('item');
				newCart.innerHTML =
				`<img src="${product.image}">
						<div class="content">
							<div class="name">
								${product.name}
							</div>
							<div class="price">
								$${product.price}
							</div>
						</div>
						<div class="quantity">
							<button>-</button>
							<span class ="value">3</span>
							${product.quantity}
							<button>+</button>
						</div>`;
						listCartHTML.appendChild(newCart);
			}
		})
	}
}