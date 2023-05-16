

function handleLogin() {
    // get username, pass from login form
    var log_email = $("#email").val();
    var log_pass = $("#pwd").val();

    // get account from localStorage
    var account = JSON.parse(localStorage.getItem("account"));
    // check 
    if((account.email == log_email) && (account.pass == log_pass) ){
        alert("Login successfully !");
        window.open('home.html', '_self');
    }else {
        alert("Please re-check information !");
    }




}





























