$(function () {
  //
  loadComponent();
  //
  loadProduct();
  //
});

// function to load components
function loadComponent() {
  $(".MenuSection").load("./Menu.html");
  $(".SidebarSection").load("./Sidebar.html");
  // $(".ContentProduct").load("./ContentProduct.html");
}

// function to process when click on "menu item Product"
function handleShowProduct() {
  $(".ContentProduct").load("./ContentProduct.html");
}

// function to process when click on "menu item manufacturer"
function handleShowManufacturer() {
  $(".ContentProduct").load("./ContentManufacturer.html");
}

// function to process when click on "menu item account"
function handleShowAccount() {
  $(".ContentProduct").load("./ContentAccount.html");
}

// function to process when click on "menu item category"
function handleShowCategory() {
  $(".ContentProduct").load("./ContentCategory.html");
}

// function to set timout for modal
// $("#modal-id").modal("show").on("shown", function () {
//     window.setTimeout(function () {
//         $("#modal-id").modal("hide");
//     }, 5000);
// });

// declare listProduct[]
// var listProduct = [];

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
  //
  var listProduct = JSON.parse(localStorage.getItem("listProduct"))
    ? JSON.parse(localStorage.getItem("listProduct"))
    : [];
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
  // console.log(listProduct);

  // Save to localStorage
  localStorage.setItem("listProduct", JSON.stringify(listProduct));

  // close form add new
  $("#close").click();
  $(".modal-backdrop").remove();

  //$("#tbProductTable").reload();
  // reload list product in table
  //  loadProduct();
  location.reload();
  
  alert("Add new successfully !");
  // $("./AdminPage.html").reload();
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

// function load data from localStorage to table
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

  // load to table
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
    // listProduct.splice(idProductDelete);
    // re-save listProduct on localStorage
    // localStorage.setItem("listProduct", JSON.stringify(listProduct));
    // re-load product on table
    // loadProduct();

    listProduct = [];
    // get data from localStorage
    var listProductLocal = JSON.parse(localStorage.getItem("listProduct"));
    // save to listProduct[] to use
    listProduct = listProductLocal;
    // check
    // console.log(listProduct.length);
    // loop
    for (let index = 0; index < listProduct.length; index++) {
      if (listProduct[index].id == idProductDelete) {
        // console.log(idProductDelete);
        listProduct.splice(index, 1);
        // re-save listProduct on localStorage
        localStorage.setItem("listProduct", JSON.stringify(listProduct));
        // re-load product on table
        // loadProduct();
        location.reload();
        alert("Delete successfully !");
      }
    }

    // listProduct.splice(idProductDelete);
    // re-save listProduct on localStorage
    // localStorage.setItem("listProduct", JSON.stringify(listProduct));
    // re-load product on table
    // loadProduct();
    //  console.log(listProduct);
  }
}

// function update product
function handleEditProduct(idProductUpdate) {
  // fill data into textfield of update modal
  fillDataToModalUpdate(idProductUpdate);
}

// function to fill data into textfield of update modal
function fillDataToModalUpdate(idProduct) {
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
      // $("#Image_Update").val(getImageName(listProduct[index].imageName));
      // console.log(listProduct[index].imageName);
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
      // loadProduct();
      alert("Update successfully !");
      location.reload();

    }
  }
}

// function to search by name product
function handleToSearch() {
  // get search value
  var searchValue = $("#inputSearch").val();
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
  // clear table
  //  $("#tbProductTable").clear();
  // $("#tbProductTable").remove();
  $("#tbProductTable").empty();
  // load to table
  for (let index = 0; index < listProduct.length; index++) {
    if (listProduct[index].name.includes(searchValue)) {
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
    // case : input is empty
    } else if (searchValue == ""){
      loadProduct();
    }
  }
}
