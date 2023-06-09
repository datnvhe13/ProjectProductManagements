$(function () {
  //
  loadComponent();
  setTimeout(() => {
    loadProduct();
  }, 200);
});
// function to load components
function loadComponent(params) {
  $(".MenuSection").load("./Menu.html");
  $(".BannerSection").load("./Banner.html");
  $(".ProductSection").load("./Products.html");
  $(".FooterSection").load("./Footer.html");
}

// declare listProduct
var listProduct = [];
// function call API to get data from localStorage, then generate product to table
function loadProduct() {
  // username and pass to login auth
  var uName = "admin";
  var passWrd = "123456";
  // use Ajax to Call API to get listProduct
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/products",
    // method 1 :
    headers: {
      Authorization: "Basic " + btoa(uName + ":" + passWrd),
    },
    success: function (response, status) {
      //
      listProduct = response.content;
      //
      for (let index = 0; index < listProduct.length; index++) {
        $(".ProductList").append(`
              <!-- product from localStorage -->
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                  <!-- image -->
                  <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <img src="../Asset/Product/${
                            listProduct[index].imageName
                          }" alt="" style="width: 160px;
                          height: 190px">
                      </div>
                  </div>
                  <!-- title -->
                  <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <h4 style="font-weight: bold;">${
                            listProduct[index].name
                          }</h4>
                      </div>
                  </div>
                  <!-- manufacturer -->
                  <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <p>Hãng sản xuất : ${
                            listProduct[index].manufacturerName
                          }</p>
                      </div>
                  </div>
                  <!-- star image -->
                  <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <ul style="list-style: none;
                          display: flex;
                          padding: 0 2px;">
                              ${showStar(listProduct[index].ratingStar)}
                          </ul>
                      </div>
                  </div>
          
                  <!-- price and cart -->
          
                  <div class="row">
                      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                          <p>${listProduct[index].price}</p>
                      </div>
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                          <a href="#">
                              <i class="fa fa-shopping-cart" style="color: red;font-size: 25px;"></i>
                          </a>
                      </div>
                  </div>
              </div>
              </div>
              `);
      }
    },

    error: function (xhr, ajaxOptions, throwError) {
      //Error block
      console.log("Error !");
    },
  });
  //
}

// function to display number of star
function showStar(numberOfStars) {
  // declare a string to save html code
  let totalStars = "";
  // display active stars
  for (let index = 0; index < numberOfStars; index++) {
    totalStars += `
          <li>
              <i class="fa fa-star" style="color: orange;"></i>
          </li>
          `;
  }
  // display unactive stars
  for (let index = 0; index < 5 - numberOfStars; index++) {
    totalStars += `
          <li>
              <i class="fa fa-star"></i>
          </li>
          `;
  }

  return totalStars;
}
