

function handleLogin() {
    // get username, pass from login form
    var log_email = $("#email").val();
    var log_pass = $("#pwd").val();

    // get account from localStorage
    var account = JSON.parse(localStorage.getItem("account"));
    // check 
    if((account.email == log_email) && (account.pass == log_pass) ){
        alert("Login successfully !");
        // window.open('HomePage.html', '_self');
        window.location.href = "http://127.0.0.1:5500/Home/HomePage.html";
    }else {
        alert("Please re-check information !");
    }

}





























