$(function () {
  //
  loadComponent();
  //
  loadProductToTable();
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
function loadProductToTable() {
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
var listProduct = [];

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
                                <button type="button" class="btn btn-warning"
                                 data-toggle="modal" data-target="#myUpdateModal"
                                 onClick="handleEditProduct(${listProduct[index].id})">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onClick="handleDeleteProduct(${listProduct[index].id})">Delete</button>
                            </td>
                        </tr> 

    `);
  }
}

// function delete product
function handleDeleteProduct(idProductDelete) {
  // alert a box to confirm yes or no delete
  var confirmDelete = confirm("Bạn muốn xóa sản phẩm này ?");

  if (confirmDelete) {
    // delete
    listProduct.splice(idProductDelete);
    // re-save listProduct on localStorage
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    // re-load product on table
    loadProducttoTable();
  }
}

// function update product
function handleEditProduct(idProductUpdate) {
  // fill data into textfield of update modal
  fillData(idProductUpdate);
}

// function to fill data into textfield of update modal
function fillData(idProduct) {
  listProduct = [];
  // get data from localStorage
  var listProductLocal = JSON.parse(localStorage.getItem("listProduct"));
  // save to listProduct[] to use
  listProduct = listProductLocal;
  console.log(listProduct);
  // loop to find data of product want to update
  for (let index = 0; index < listProduct.length; index++) {
    if (listProduct[index].id == idProduct) {
      // set value for textfield of update modal
      $("#Id_Update").val(idProduct);
      $("#Name_Update").val(listProduct[index].name);
      $("#Price_Update").val(listProduct[index].price);
      $("#Info_Update").val(listProduct[index].infor);
      $("#Detail_Update").val(listProduct[index].detail);
      $("#Star_Update").val(listProduct[index].ratingStar);
      // $("#Image_Update").val(listProduct[index].imageName);
      $("#Manufacturer_Update").val(listProduct[index].manufacturerId);
      $("#Category_Update").val(listProduct[index].categoryId);
    }
  }
}

// function reset data on textfield of update form
function handleResetUpdateForm() {
  $("#Id_Update").val("");
  $("#Name_Update").val("");
  $("#Price_Update").val("");
  $("#Info_Update").val("");
  $("#Detail_Update").val("");
  $("#Star_Update").val("");
  $("#Manufacturer_Update").val(0);
  $("#Category_Update").val(0);
}

// function to update product
function handleUpdateProduct() {
  // get information from update modal
  var u_Id = $("#Id_Update").val();
  var u_Name = $("#Name_Update").val();
  var u_Price = $("#Price_Update").val();
  var u_Info = $("#Info_Update").val();
  var u_Detail = $("#Detail_Update").val();
  var u_Star = $("#Star_Update").val();
  var u_Image = getImageName($("#Image_Update").val());
  var u_Manufacturer = $("#Manufacturer_Update").val();
  var u_Category = $("#Category_Update").val();

  for (let index = 0; index < listProduct.length; index++) {
    if (listProduct[index].id == u_Id) {
      listProduct[index].name = u_Name;
      listProduct[index].price = u_Price;
      listProduct[index].infor = u_Info;
      listProduct[index].detail = u_Detail;
      listProduct[index].ratingStar = u_Star;
      listProduct[index].imageName = u_Image;
      listProduct[index].manufacturerId = u_Manufacturer;
      listProduct[index].categoryId = u_Category;

      // save to localStorage
      localStorage.setItem("listProduct", JSON.stringify(listProduct));
      
      // close modal
      $("#myUpdateModal").modal("hide");
      $(".modal-backdrop").remove();
      // re-load table
      loadProductToTable();

    }
  }
}
