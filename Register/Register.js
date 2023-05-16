function submit() {
  // get value from registerForm.html
  var f_name = $("#fullname").val();
  var f_email = $("#email").val();
  var f_password = $("#pwd").val();
  var f_confirmPassword = $("#re-pwd").val();
  var f_birthday = $("#birthday").val();

  // duplicate email

  // check password and confirm password
  /*
  using loop
  switch case to check 
  */

  if (f_password != f_confirmPassword) {
    alert("Password and Re-password must the same !");
  } else {
    // create a object
    var newAccount = {
      name: f_name,
      email: f_email,
      pass: f_password,
      rePass: f_confirmPassword,
      birthDate: f_birthday,
    };
    // let listAccounts = [];
    // listAccounts.push(newAccount);

    // save to localStorage
    localStorage.setItem("account", JSON.stringify(newAccount));
    // localStorage.setItem("account2", JSON.stringify(newAccount));
    // localStorage.setItem("account3", JSON.stringify(newAccount));
    alert("Register successfully !");
    resetForm();
  }
}

// function reset form
function resetForm() {
  $("#fullname").val("");
  $("#email").val("");
  $("#pwd").val("");
  $("#re-pwd").val("");
  $("#birthday").val("");
}
