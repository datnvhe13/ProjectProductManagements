$(function () {
  //
  loadComponent();
  setTimeout(() => {
    generateProduct();
  }, 200);
});
// function to load components
function loadComponent(params) {
  $(".MenuSection").load("./Menu.html");
  $(".BannerSection").load("./Banner.html");
  $(".ProductSection").load("./Products.html");
  $(".FooterSection").load("./Footer.html");
}

//  Function generate products
function generateProduct(params) {
  // Template string
  for (let index = 0; index < 10; index++) {
    $(".ProductList").append(`
    <!-- product 1 -->
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <!-- image -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <img src="../Asset/Product/ImgMobile1.PNG" alt="" style="width: 160px;
                height: 190px">
            </div>
        </div>
        <!-- title -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h4 style="font-weight: bold;">Samsung Galaxy S22 Ultra 5G</h4>
            </div>
        </div>
        <!-- manufacturer -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <p>Hãng sản xuất : Apple</p>
            </div>
        </div>
        <!-- star image -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ul style="list-style: none;
                display: flex;
                padding: 0 2px;">
                    <li>
                        <i class="fa fa-star" style="color: orange;"></i>
                    </li>
                    <li>
                        <i class="fa fa-star" style="color: orange;"></i>
                    </li>
                    <li>
                        <i class="fa fa-star" style="color: orange;"></i>
                    </li>
                    <li>
                        <i class="fa fa-star" style="color: orange;"></i>
                    </li>
                    <li>
                        <i class="fa fa-star"></i>
                    </li>
                </ul>
            </div>
        </div>

        <!-- price and cart -->

        <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <p>25.000.000vnđ</p>
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
}
