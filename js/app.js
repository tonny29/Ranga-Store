const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
    
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Total-Rating:${product.rating.count}</p>
      <p>Average-Rating:${product.rating.rate}</p>
      <h2>Price:$ ${product.price}</h2>
      <button onclick="addToCart(${product.id} ,${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="details(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  // console.log(count);
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  console.log(converted);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
const details=(productId)=>{
  const url=`https://fakestoreapi.com/products/${productId}`;
 fetch(url)
 .then(res=>res.json())
 .then(data=>displayDetails(data))
}
const displayDetails=(productDetail)=>{
  console.log(productDetail);
  const div=document.getElementById('detail-products');
  div.innerHTML=`
  <div class="card mb-3 details-single" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${productDetail.image}" class="img-fluid rounded-start single-image">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title">${productDetail.title}</h3>
        <p class="card-text">${productDetail.description}</p>
        <h3>Price:$${productDetail.price}</h3>
      </div>
    </div>
  </div>
</div>
  `
}
