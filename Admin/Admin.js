$(function () {
  //
  loadComponent();
  //
  loadProducttoTable();
  //
});

// function to load components
function loadComponent(params) {
  $(".MenuSection").load("./Menu.html");
  $(".SidebarSection").load("./Sidebar.html");
  // $(".ContentProduct").load("./ContentProduct.html");
}

// function to process when click on "menu item Product"
function handleShowProduct(params) {
  $(".ContentProduct").load("./ContentProduct.html");
}

// function to process when click on "menu item manufacturer"
function handleShowManufacturer(params) {
  $(".ContentProduct").load("./ContentManufacturer.html");
}

// function to process when click on "menu item account"
function handleShowAccount(params) {
  $(".ContentProduct").load("./ContentAccount.html");
}

// function to process when click on "menu item category"
function handleShowCategory(params) {
  $(".ContentProduct").load("./ContentCategory.html");
}

// function to set timout for modal
// $("#modal-id").modal("show").on("shown", function () {
//     window.setTimeout(function () {
//         $("#modal-id").modal("hide");
//     }, 5000);
// });

// function to load data to table
function loadProducttoTable(params) {
  // reset table before load data
  $("#tbProductTable").empty();
  // create product by loop
  for (let index = 0; index < 6; index++) {
    $("#tbProductTable").append(`
        <tr>
                                <td>1</td>
                                <td>Samsung Galaxy S22 Ultra 5G</td>
                                <td>30.090.000đ</td>
                                <td>6.9 inches, Chip Media Tek Helio G85 (12nm) mạnh mẽ, Ram 4G, Pin
                                    7000 mAh</td>
                                <td>ProductDetail1</td>
                                <td>2</td>
                                <td>ImgMobile5.png</td>
                                <td>APPLE</td>
                                <td>TABLET</td>
                                <td>
                                    <button type="button" class="btn btn-warning">Edit</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger">Delete</button>
                                </td>
                            </tr> 

        `);
  }
  // load data from local Storage to table
  loadProduct();
}
// declare listProduct[]
listProduct = [];

// function handle create new product
function handleCreateNewProduct() {
  // get data from user
  var p_Id = $("#Id").val();
  var p_Name = $("#Name").val();
  var p_Price = $("#Price").val();
  var p_Info = $("#Info").val();
  var p_Detail = $("#Detail").val();
  var p_Star = $("#Star").val();
  var p_Image = getImageName($("#Image").val());
  var p_Manufacturer = $("#Manufacturer").val();
  var p_Category = $("#Category").val();

  // create a object
  var productNew = {
    id: p_Id,
    name: p_Name,
    price: p_Price,
    infor: p_Info,
    detail: p_Detail,
    ratingStar: p_Star,
    imageName: p_Image,
    manufacturerId: p_Manufacturer,
    categoryId: p_Category,
  };

  // save to list to use
  listProduct.push(productNew);
  console.log(listProduct);

  // Save to localStorage
  localStorage.setItem("listProduct", JSON.stringify(listProduct));

  // reload list product in table
  loadProduct();

  // close form add new
  $("#close").click();
  $(".modal-backdrop").remove();
}

// function to reset form add new product
function handleResetForm() {
  $("#Id").val("");
  $("#Name").val("");
  $("#Price").val("");
  $("#Info").val("");
  $("#Detail").val("");
  $("#Star").val("");
  $("#Image").val("");
  $("#Manufacturer").val(0);
  $("#Category").val(0);
}

// function to getImageName
function getImageName(pathImage) {
  // transfer path to array
  var itemArray = pathImage.split("\\");
  // get last element
  var imageName = itemArray[itemArray.length - 1];
  return imageName;
}

// function load data from loacalStorage to table
function loadProduct() {
  //  listProduct
  let listProduct = [];
  // get data from localStorage to use
  // check data in localStorage
  if (localStorage && localStorage.getItem("listProduct")) {
    var listProductLocalStorage = JSON.parse(
      localStorage.getItem("listProduct")
    );
    // save data from loacalStorage to use
    listProduct = listProductLocalStorage;
  }

  // addnew
  for (let index = 0; index < listProduct.length; index++) {
    $("#tbProductTable").append(`
    <tr>
                            <td>${listProduct[index].id}</td>
                            <td>${listProduct[index].name}</td>
                            <td>${listProduct[index].price}</td>
                            <td>${listProduct[index].infor}</td>
                            <td>${listProduct[index].detail}</td>
                            <td>${listProduct[index].ratingStar}</td>
                            <td>${listProduct[index].imageName}</td>
                            <td>${listProduct[index].manufacturerId}</td>
                            <td>${listProduct[index].categoryId}</td>
                            <td>
                                <button type="button" class="btn btn-warning">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger">Delete</button>
                            </td>
                        </tr> 

    `);
  }
}
