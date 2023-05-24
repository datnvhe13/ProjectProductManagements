$(function () {
  //
  loadComponent();
  //
  loadProduct();
  //
  generateManufacturer();
  //
  generateCategory();
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

  // create a object
  var productNew = {
    // id: p_Id,
    name: p_Name,
    price: p_Price,
    info: p_Info,
    detail: p_Detail,
    ratingStar: p_Star,
    imageName: p_Image,
    manufacturerId: p_Manufacturer,
    categoryId: p_Category,
  };

  console.log(productNew);

  // username and password to login
  var userName = "admin";
  var passWord = "123456";
  // Call API
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/api/v1/products",
    headers: {
      Authorization: "Basic " + btoa(userName + ":" + passWord),
    },
    data: JSON.stringify(productNew),
    contentType: "application/json;charset=UTF-8",
    // dataType: "dataType",
    success: function (response) {
      // close form add new
      $("#close").click();
      $(".modal-backdrop").remove();

      loadProduct();
      location.reload();
      alert("Add new successfully !");
    },
  });
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

// declare global variable
let listProduct = [];
// function load data  to table
function loadProduct() {
  // username and pass
  var username = "admin";
  var passWord = "123456";
  // call API to get products
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/products",
    headers: {
      Authorization: "Basic " + btoa(username + ":" + passWord),
    },
    success: function (response) {
      // response is result
      listProduct = response.content;
      // load to table
      for (let index = 0; index < listProduct.length; index++) {
        $("#tbProductTable").append(`
    <tr>
                            <td>${listProduct[index].id}</td>
                            <td>${listProduct[index].name}</td>
                            <td>${listProduct[index].price}</td>
                            <td>${listProduct[index].info}</td>
                            <td>${listProduct[index].detail}</td>
                            <td>${listProduct[index].ratingStar}</td>
                            <td>${listProduct[index].imageName}</td>
                            <td>${listProduct[index].manufacturerName}</td>
                            <td>${listProduct[index].categoryName}</td>
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
    },
  });
}

// function delete product
function handleDeleteProduct(idProductDelete) {
  // alert a box to confirm yes or no delete
  var confirmDelete = confirm("Bạn muốn xóa sản phẩm này ?");
  // userName and password to login authentication
  var userName = "admin";
  var passWord = "123456";
  // condition
  if (confirmDelete) {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:8080/api/v1/products/${idProductDelete}`,
      headers: {
        Authorization: "Basic " + btoa(userName + ":" + passWord),
      },
      success: function (response) {
        //re-load product on table
        loadProduct();
        location.reload();
        alert("Delete successfully !");
      },
    });
  }
}

// function update product
function handleEditProduct(idProductUpdate) {
  // fill data into textfield of update modal
  fillDataToModalUpdate(idProductUpdate);
}

// function to fill data into textfield of update modal
function fillDataToModalUpdate(idProduct) {
  // declare variable
  var index = listProduct.findIndex((product) => product.id == idProduct);
  // manufacturerId
  var manufacturerId = listManufacture.find(
    (manufact) => manufact.name == listProduct[index].manufacturerName
  ).id;
  // category id
  var categoryid = listCategory.find(
    (category) => category.name == listProduct[index].categoryName
  ).id;

  // set value for textfield of update modal
  $("#Id_Update").val(idProduct);
  $("#Name_Update").val(listProduct[index].name);
  $("#Price_Update").val(listProduct[index].price);
  $("#Info_Update").val(listProduct[index].info);
  $("#Detail_Update").val(listProduct[index].detail);
  $("#Star_Update").val(listProduct[index].ratingStar);
  // $("#Image_Update").val(getImageName(listProduct[index].imageName));
  $("#Manufacturer_Update").val(manufacturerId);
  $("#Category_Update").val(categoryid);
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

  // Update
  let productUpdate = {
    name: u_Name,
    price: u_Price,
    info: u_Info,
    detail: u_Detail,
    ratingStar: u_Star,
    imageName: u_Image,
    manufacturerId: u_Manufacturer,
    categoryId: u_Category,
  };
  // username and password to login authentication
  var userName = "admin";
  var passWord = "123456";
  // call API
  $.ajax({
    type: "PUT",
    url: `http://localhost:8080/api/v1/products/${u_Id}`,
    headers: {
      Authorization: "Basic " + btoa(userName + ":" + passWord),
    },
    data: JSON.stringify(productUpdate),
    contentType: "application/json;charset=UTF-8",
    success: function (response) {
      // close modal
      $("#myUpdateModal").modal("hide");
      $(".modal-backdrop").remove();
      // re-load table
      loadProduct();
      alert("Update successfully !");
      location.reload();
    },
  });

  // find index of product in list product
  // var indexUpdate = listProduct.findIndex((product) => product.id == u_Id);
  // console.log("indexUpdate : ", indexUpdate);

  // listProduct[index].name = u_Name;
  // listProduct[index].price = u_Price;
  // listProduct[index].infor = u_Info;
  // listProduct[index].detail = u_Detail;
  // listProduct[index].ratingStar = u_Star;
  // listProduct[index].imageName = u_Image;
  // listProduct[index].manufacturerId = u_Manufacturer;
  // listProduct[index].categoryId = u_Category;

  // save to localStorage
  // localStorage.setItem("listProduct", JSON.stringify(listProduct));

  // close modal
  // $("#myUpdateModal").modal("hide");
  // $(".modal-backdrop").remove();
  // re-load table
  // loadProduct();
  // alert("Update successfully !");
  // location.reload();
  //   }
  // }
}

// function to search by name product
function handleToSearch() {
  // get search value
  var searchValue = $("#inputSearch").val();
  //  listProduct
  let listProduct = [];
  // get data  to use
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
    } else if (searchValue == "") {
      loadProduct();
    }
  }
}

// declare variable global
var listManufacture = [];
// fuction call API to generate Manufacturer
function generateManufacturer() {
  // username and password
  var userName = "admin";
  var passWord = "123456";
  // Call API
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/manufacturers",
    headers: {
      Authorization: "Basic " + btoa(userName + ":" + passWord),
    },
    success: function (response) {
      listManufacture = response;
      // loop
      for (let index = 0; index < listManufacture.length; index++) {
        // add new modal
        $("#Manufacturer").append(`
        <option value="${listManufacture[index].id}">${listManufacture[index].name}</option>
        `);
        // update modal
        $("#Manufacturer_Update").append(`
        <option value="${listManufacture[index].id}">${listManufacture[index].name}</option>
        `);
      }
    },
  });
}

// declare variable global
var listCategory = [];
// fuction call API to generate Category
function generateCategory() {
  // username and password
  var userName = "admin";
  var passWord = "123456";
  // Call API
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/categorys",
    headers: {
      Authorization: "Basic " + btoa(userName + ":" + passWord),
    },
    success: function (response) {
      listCategory = response;
      // loop
      for (let index = 0; index < listCategory.length; index++) {
        // category - add new modal
        $("#Category").append(`
        <option value="${listCategory[index].id}">${listCategory[index].name}</option>
        `);
        // category - update modal
        $("#Category_Update").append(`
        <option value="${listCategory[index].id}">${listCategory[index].name}</option>
        `);
      }
    },
  });
}
