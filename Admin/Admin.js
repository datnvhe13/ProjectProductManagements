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
}


// function handle create new product
function handleCreateNewProduct(params) {
  console.log("hello");
  // get data from user
  // var p_Id = $("#Id").val();
  // console.log(p_Id);
  // var p_Name = $("#Name").val();
  // console.log(p_Name);
  // var p_Price = $("#Price").val();
  // console.log(p_Price);
  // var p_Info = $("#Info").val();
  // console.log(p_Info);
  // var p_Detail = $("#Detail").val();
  // console.log(p_Detail);
  // var p_Star = $("#Star").val();
  // console.log(p_Star);
  // var p_Image = $("#Image").val();
  // console.log(p_Image);
  // var p_Manufacturer = $("#Manufacturer").val();
  // console.log(p_Manufacturer);
  // var p_Category = $("#Category").val();
  // console.log(p_Category);

  // create a object
  // var productNew = {
  //   id: p_Id,
  //   name: p_Name,
  //   price: p_Price,
  //   infor: p_Info,
  //   detail: p_Detail,
  //   ratingStar: p_Star,
  //   imageName: p_Image,
  //   manufacturerId: p_Manufacturer,
  //   categoryId: p_Category
  // }

  // console.log(productNew);


  // save to list to use



  // Save to localStorage

   
}































