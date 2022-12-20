//  Global Variables
var currentIndex = 0;
var productNameInput = document.getElementById("ProductName");
var productPriceInput = document.getElementById("productPrice");
var productCatInput = document.getElementById("ProductCategory");
var productDescInput = document.getElementById("ProductDesc");

var mybtn = document.getElementById("saveProduct");

var productContainer = [];
//  check local Storage  
(function checkLocal() 
{
  if (localStorage.getItem("Products") != null) {
 getLocal() ;
  displayProduct();
  
}
}())

//  validate if we Add product Or Update Product
function validation() {
  if (mybtn.innerHTML == "Update") {
    makeUpdate(currentIndex);
  } else if (mybtn.innerHTML == "Save") {
    addProduct();
  }
}
// Add product And DispalyAfter Add 
function addProduct() {
  setTimeout(function () {
    remove();
  }, 2000);
  if (validateInputs() == true) {
    var product = {
      Name: productNameInput.value,
      Price: productPriceInput.value,
      category: productCatInput.value,
      Description: productDescInput.value,
    };
    productContainer.push(product);
    setLocal();
    displayProduct();
     
    clearForm();
  } else {
    clearForm();
  }
}
//  set Prodcut in Local Storage
function setLocal()
{
  localStorage.setItem("Products", JSON.stringify(productContainer));
}
//  get Data from Local Storage 


function getLocal()
{
  productContainer = JSON.parse(localStorage.getItem("Products"));
}

//  Dispaly Products
function displayProduct() {
  var cartona = "";
  for (var i = 0; i < productContainer.length; i++) {
    cartona += `
        <tr>
        <td class="pt-3">${i + 1}</td>
        <td class="pt-3">${productContainer[i].Name}</td>
        <td class="pt-3">${productContainer[i].Price}</td>
        <td class="pt-3">${productContainer[i].category}</td>
        <td class="pt-3">${productContainer[i].Description}</td>
        <td>
        <button class="btn " onclick=updateProduct(${i})>
        
        <i class="fa-regular fw-bold text-warning icons  fa-pen-to-square"></i>
        </button>
            <button class="btn" onclick=deleteProduct(${i})>
          
            <i class="fa-regular fw-bold text-danger icons fa-trash-can"></i>
            </button>
        </td>
    </tr> 

        `;
  }
  document.getElementById("productContainer").innerHTML = cartona;
}
// Clear values of inputs
function clearForm() {
  productNameInput.value = "";

  productPriceInput.value = "";
  productCatInput.value = "";
  productDescInput.value = "";
}

function deleteProduct(index) {
  productContainer.splice(index, 1);
  setLocal();
  displayProduct();
}

//  get Values of Product we Need to update , And displat it in inputs 
function updateProduct(index) {
  currentIndex = index;

  productNameInput.value = productContainer[index].Name;

  productPriceInput.value = productContainer[index].Price;
  productCatInput.value = productContainer[index].category;
  productDescInput.value = productContainer[index].Description;
  mybtn.innerHTML = "Update";
  
}
//  save Update in the currentIndex of product we Updated his Data 
function makeUpdate(currentIndex) {
  productContainer[currentIndex].Name = productNameInput.value;

  productContainer[currentIndex].Price = productPriceInput.value;
  productContainer[currentIndex].category = productCatInput.value;
  productContainer[currentIndex].Description = productDescInput.value;
  displayProduct();
  setLocal();
  clearForm();
  mybtn.innerHTML = "Save";
}

function search(term) {
  var cartona = "";
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].Name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      cartona += `
        <tr>
        <td class="pt-3">${i + 1}</td>
        <td class="pt-3">${productContainer[i].Name}</td>
        
        <td class="pt-3">${productContainer[i].Price}</td>
        <td class="pt-3">${productContainer[i].category}</td>
        <td class="pt-3">${productContainer[i].Description}</td>
        <td> 
<button class="btn " onclick=updateProduct(${i})>
<i class="fa-regular fw-bold text-warning icons  fa-pen-to-square"></i>
</button>
    <button class="btn" onclick=deleteProduct(${i})>
    <i class="fa-regular fw-bold text-danger icons fa-trash-can"></i>
    </button>
       </td>
  </tr> `;
    }
  }
  document.getElementById("productContainer").innerHTML = cartona;
}

const regex = {
  Name: /^[A-Z][a-zA-z]{1,}$/,
  Price: /^[1-9][0-9]{3,5}$/,
  Cate: /^(mobile|tv|laptop|Mobile|Tv|Laptop)/,
  Desc: /^[A-z a-z]{3,}\S[a-zA-z]$/,
};

function validateInputs() {
  console.log(regex.Name.test(productNameInput.value));
  console.log(regex.Price.test(productPriceInput.value));
  console.log(regex.Cate.test(productCatInput.value));
  console.log(regex.Desc.test(productDescInput.value));

  if (
    regex.Name.test(productNameInput.value) == true &&
    regex.Price.test(productPriceInput.value) == true &&
    regex.Cate.test(productCatInput.value) == true &&
    regex.Desc.test(productDescInput.value) == true
  ) {
    productNameInput.classList.add("is-valid");
    productPriceInput.classList.add("is-valid");
    productCatInput.classList.add("is-valid");
    productDescInput.classList.add("is-valid");
    return true;
  } else if (
    regex.Name.test(productNameInput.value) == false &&
    regex.Cate.test(productCatInput.value) == false &&
    regex.Price.test(productPriceInput.value) == false &&
    regex.Desc.test(productDescInput.value) == false
  ) {
    productDescInput.classList.add("is-invalid");
    productCatInput.classList.add("is-invalid");
    productNameInput.classList.add("is-invalid");
    productPriceInput.classList.add("is-invalid");
    return false;
  } else if (regex.Name.test(productNameInput.value) == false) {
    productNameInput.classList.add("is-invalid");
    return false;
  } else if (regex.Price.test(productPriceInput.value) == false) {
    productPriceInput.classList.add("is-invalid");
    return false;
  } else if (regex.Cate.test(productCatInput.value) == false) {
    productCatInput.classList.add("is-invalid");
    return false;
  } else if (regex.Desc.test(productDescInput.value) == false) {
    productDescInput.classList.add("is-invalid");
    return false;
  }
}
function remove() {
  productNameInput.classList.remove("is-valid", "is-invalid");
  productPriceInput.classList.remove("is-valid", "is-invalid");
  productDescInput.classList.remove("is-valid", "is-invalid");
  productCatInput.classList.remove("is-valid", "is-invalid");
}
