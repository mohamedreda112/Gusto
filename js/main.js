window.addEventListener(`scroll`, reveal);
function reveal() {
  let reveals = document.querySelectorAll(`.reveal`);
  for (let i = 0; i < reveals.length; i++) {
    let windowheight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 100;

    if (revealTop < windowheight - revealPoint) {
      reveals[i].classList.add(`showme`);
    } else {
      reveals[i].classList.remove(`showme`);
    }
  }
}
let mainLinks = document.querySelectorAll(".links li a");
let navLinks = document.querySelector(".nav-links");
let btn = document.querySelector(".btn");

mainLinks.forEach((mainLink) => {
  mainLink.addEventListener("click", function () {
    document.querySelector(".active")?.classList.remove("active");
    this.classList.add("active");
    navLinks.classList.remove("open");
    btn.classList.remove("change");
  });
});

btn.addEventListener("click", function () {
  btn.classList.contains("change")
    ? btn.classList.remove("change")
    : btn.classList.add("change");
  navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("open");
});

document.addEventListener("click", function (e) {
  if (!navLinks.contains(e.target) && !btn.contains(e.target)) {
    navLinks.classList.remove("open");
    btn.classList.remove("change");
  }
});

let fristCardWidth;
let quantity = document.querySelector(".quantity");
let total = document.querySelector(".total");
let cartBtn = document.getElementById("cart");
let cartDiv = document.querySelector(".cart");
let mainDivCart = document.querySelector(".cards");
let ulCards = document.createElement("ul");
let cart = document.querySelector(".listcards");
let btns = mainDivCart.querySelectorAll(".btn");
let isCartOpen = false;
cartBtn.addEventListener("click", () => {
  if (isCartOpen) {
    cartDiv.classList.add("show");
    isCartOpen = false;
  } else {
    cartDiv.classList.remove("show");
    isCartOpen = true;
  }
});

let products = [
  {
    id: 0,
    name: "chicken Grill",
    image: "../IMGS/food-0.jpg",
    price: 25,
  },
  {
    id: 1,
    name: "Shrimp",
    image: "../IMGS/food-1.jpg",
    price: 35,
  },
  {
    id: 2,
    name: "Chicken pieces",
    image: "../IMGS/food-2.jpg",
    price: 30,
  },
  {
    id: 3,
    name: "Small burger",
    image: "../IMGS/food-3.jpg",
    price: 12,
  },
  {
    id: 4,
    name: "Big burger",
    image: "../IMGS/food-4.jpg",
    price: 22,
  },
  {
    id: 5,
    name: "Seafood salad",
    image: "../IMGS/food-5.jpg",
    price: 40,
  },
  {
    id: 6,
    name: "Vegetable salad",
    image: "../IMGS/food-6.jpg",
    price: 20,
  },
  {
    id: 7,
    name: "Eggs with rice",
    image: "../IMGS/food-7.jpg",
    price: 18,
  },
  {
    id: 8,
    name: "Eggs & meat",
    image: "../IMGS/food-8.jpg",
    price: 40,
  },
  {
    id: 9,
    name: "Cheese pizza",
    image: "../IMGS/food-9.jpg",
    price: 28,
  },
];

listCards = [];
function getProducts() {
  products.forEach((value, key) => {
    let liCards = document.createElement("li");
    liCards.className = "card";
    ulCards.appendChild(liCards);
    let cartIcon = document.createElement("i");
    cartIcon.className = "cartIcon  fas fa-cart-shopping";
    cartIcon.setAttribute("onclick", `addToCart(${key})`);
    ulCards.className = "carousel";
    liCards.className = "card";
    liCards.innerHTML = `
    <div class= "image"><img src="IMGS/${value.image}"/></div>
    <div class= "info">
    <div class="price">$${value.price}</div>
    <div class="sub-info">
    <div class="title">${value.name}</div>
    <div class="icon"</div>
    </div>
    `;
    let iconContainer = liCards.querySelector(".icon");
    iconContainer.appendChild(cartIcon);
    mainDivCart.appendChild(ulCards);
    if (!fristCardWidth) {
      fristCardWidth = liCards.offsetWidth;
    }
  });
}
getProducts();
function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = products[key];
    listCards[key].quantity = 1;
  }
  reloadCard();
}

function reloadCard() {
  // listCards.innerHTML = ""; // The issue in your code lies in the reloadCard() function. When you call listCards.innerHTML = "";, you are trying to clear the content of listCards
  cart.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, index) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let liCarts = document.createElement("li");
      liCarts.innerHTML = `
      <div><img src="IMGS/${value.image}"/></div>
      <div>${value.name}</div>
      <div>$${value.price}</div>
      <div>${value.quantity}</div>
      <div class="clear">X</div>
      `;
      cart.appendChild(liCarts);
      let ClearDiv = liCarts.querySelector(".clear");
      ClearDiv.addEventListener("click", () => {
        clearFood(index);
      });
    }
  });
  total.innerHTML = "$" + totalPrice;
  quantity.innerHTML = count;
}
function clearFood(index) {
  listCards.splice(index, 1);
  reloadCard();
}
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    ulCards.scrollLeft += btn.id === "left" ? -fristCardWidth : fristCardWidth;
  });
});

let isDragging = false,
  startX,
  StartSCrollLeft;
const dragStart = (e) => {
  isDragging = true;
  startX = e.pageX;
  StartSCrollLeft = ulCards.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  ulCards.scrollLeft = StartSCrollLeft - (e.pageX - startX);
  ulCards.classList.add("dragging");
};
const dragStop = () => {
  isDragging = false;
  ulCards.classList.remove("dragging");
};

ulCards.addEventListener("mousemove", dragging);
ulCards.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
let info = {
  data: [
    {
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In corrupti ad accusamus delectus earum porro pariatur, odio repudiandae animi?",
    },
    {
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In corrupti ad accusamus delectus earum porro pariatur, odio repudiandae animi?",
    },
    {
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In corrupti ad accusamus delectus earum porro pariatur, odio repudiandae animi?",
    },
    {
      info: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. In corrupti ad accusamus delectus earum porro pariatur, odio repudiandae animi? ",
    },
  ],
};
let teamCards = document.querySelectorAll(".team .cards .card");
let wrapperInfo = document.querySelector(".team .wrapper-info");
teamCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    let chefImg = card.querySelector("img").src;
    let chefName = card.querySelector("h3").textContent;
    let chefInfo = info.data[index].info;
    let htmlContent = `
<div class="sub-info">
<img src="${chefImg}"alt="">
<div class="text-info">
<h3>${chefName}</h3>
<p>${chefInfo}</p>
</div>
</div>
    `;
    wrapperInfo.innerHTML = htmlContent;
  });
});

let year = document.getElementById("year");
let currentYear = new Date().getFullYear();
year.innerHTML = currentYear;
