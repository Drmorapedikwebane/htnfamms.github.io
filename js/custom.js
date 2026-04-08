// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});



/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}







// ================= CART SYSTEM =================

// Add to cart (SMART VERSION)
function addToCart(name, price, img) {

   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   // ✅ Check if item already exists
   let existingItem = cart.find(item => item.name === name);

   if (existingItem) {
      existingItem.qty += 1;
   } else {
      cart.push({
         name: name,
         price: price,
         img: img,
         qty: 1
      });
   }

   localStorage.setItem("cart", JSON.stringify(cart));

   updateCartCount();

   alert("✅ Added to cart");
}


// Update cart count (badge)
function updateCartCount() {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   // ✅ Count total quantity (better than just length)
   let totalQty = 0;

   cart.forEach(item => {
      totalQty += item.qty;
   });

   let cartCountElement = document.getElementById("cart-count");

   if (cartCountElement) {
      cartCountElement.innerText = totalQty;
   }
}


// Optional: update quantity safely (used in cart page)
function changeQty(index, action) {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   if (action === "increase") {
      cart[index].qty += 1;
   } else if (action === "decrease") {
      if (cart[index].qty > 1) {
         cart[index].qty -= 1;
      }
   }

   localStorage.setItem("cart", JSON.stringify(cart));
   location.reload();
}


// Remove item (global use)
function removeItem(index) {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   cart.splice(index, 1);

   localStorage.setItem("cart", JSON.stringify(cart));
   location.reload();
}


// Run on page load
document.addEventListener("DOMContentLoaded", function () {
   updateCartCount();
});





// After payment success, send email notification
// REMOVE or COMMENT THIS ENTIRE BLOCK:
/*
fetch('https://formspree.io/f/xeozkqnw', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: fullname,
    email: email,
    phone: phone,
    orderTotal: total,
    items: cart.map(item => `${item.name} x${item.qty}`).join(', ')
  })
});
*/
