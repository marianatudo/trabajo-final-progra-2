function hideDivById(divId) {
    hideAllDivW3Includes()
    var element = document.getElementById(divId)
    if (element.style.display === "none") {
        element.style.display = "block";
    }
}

function hideAllDivW3Includes() {
    var elementArray = document.getElementsByName("pages")
    for (var element of elementArray) {
        element.style.display = "none"
    }
}

function login() {
    var radios = document.getElementsByName('register');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            //alert(radios[i].value);
            element = radios[i].value;
            if (element === "logIn") {
                hideDivById("logIn");
            }
            else {
                hideDivById("createAccount");
            }
            break;
        }
    }
}

function goBack() {
    window.history.back();
}






/*
login functionality begin
------------------------------------------------------------------------------------------------------------------------------------
*/
function checkLogin() {

    var user = document.getElementById("user").value;
    var password = document.getElementById("passw").value;

    var userArray = JSON.parse(localStorage.getItem("wUserArray"));

    if (user !== null && user !== "") {
        if (password !== null && password !== "") {
            var canLogin = checkLoginInfo(user, password, userArray);
            if (canLogin === true) {
                hideDivById("rooms")
            } else {
                alert("user or password are not correct");
            }

        } else {
            alert("password must not be empty");
        }
    } else {
        alert("user must not be empty");
    }

}

function checkLoginInfo(user, password, userArray) {
    if (userArray !== null && userArray.length > 0) {
        for (var i = 0; i < userArray.length; i++) {
            if (userArray[i].user === user && userArray[i].password === password) {
                return true;
            }
        }
    }
    return false;
}

/*
login functionality end
-----------------------------------------------------------------------------------------------------------------------------------
*/


/*
register functionality begin
*/

function registerNewUser() {
    var reg_user = document.getElementById("user_reg").value;
    var reg_password = document.getElementById("passw_reg").value;

    //alert(reg_user);
    var userArray = [];

    if (localStorage.getItem("wUserArray") !== null) {
        userArray = JSON.parse(localStorage.getItem("wUserArray"));
    }

    var current_reg = {
        user: reg_user,
        password: reg_password
    };

    userArray.push(current_reg);

    localStorage.setItem("wUserArray", JSON.stringify(userArray));

    //window.location.href = "http://localhost:5000/login"
    //window.location.href = "http://heroku:5000/login";
}

/*
register functionality end
-------------------------------------------------------------------------------------------------------------------------------------
*/


/*
dashboard functionality begin
-------------------------------------------------------------------------------------------------------------------------------------
*/



if (window.location.href.includes("dashboard")) {
    //un if general para el dashboard y asi podemos poner todos los metodos que necesitemos
    checkForValidLoginSession()
    setUserNameOnDashboard()
    w3.includeHTML()
}

function checkForValidLoginSession() {
    /*
    tengo que ir a buscar el elemento wUserArray, si no esta vacio
    entonces dejo pasar al dashboard si no es el caso entonces debo redirigir
    hacia el login
    */

    if (localStorage.getItem("wUserArray") == null) {
        window.location.href = "http://localhost:5000/login"
        //window.location.href = "http://heroku:5000/login";
    }
    else {
        if (localStorage.length == 0) {
            window.location.href = "http://localhost:5000/login"
            //window.location.href = "http://heroku:5000/login";
        }
    }
}

function setUserNameOnDashboard() {
    var userArray = JSON.parse(localStorage.getItem("wUserArray"))
    var currentUser = userArray[0].user

    var userSpan = document.getElementById("user")
    userSpan.innerText = "Hello, " + currentUser
}

function logout() {
    localStorage.removeItem("wUserArray")
    window.location.href = "http://localhost:5000/"
    //window.location.href = "http://heroku:5000/";
}

/*
************* dashboard functionality end
*/










w3.includeHTML()
