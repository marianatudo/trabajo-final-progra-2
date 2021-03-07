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


/*
************* login functionality begin
*/
function checkLogin() {

    var user = document.getElementById("user").value;
    var password = document.getElementById("passw").value;

    var userArray = JSON.parse(localStorage.getItem("lUserArray"));

    if (user !== null && user !== "") {
        if (password !== null && password !== "") {
            var canLogin = checkLoginInfo(user, password, userArray);
            if (canLogin === true) {
                //need a method to get the role and send it into createSessionUser below
                var role = getUserRole(user, password, userArray)
                createSessionUser(user, password, role)
                displayRooms();
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

function getUserRole(pUser, pPassword, pUserArray) {
    var role = ""
    if (pUserArray !== null && pUserArray.length > 0) {
        var length = pUserArray.length
        for (var i = 0; i < length; i++) {
            if (pUserArray[i].user === pUser && pUserArray[i].password === pPassword) {
                role = pUserArray[i].role
                break
            }
        }
    }
    return role
}

function createSessionUser(user, password, role) {
    var logged_user = {
        user: user,
        password: password,
        role: role
    };

    sessionStorage.setItem("loggedUser", JSON.stringify(logged_user));
}







function registerNewUser() {
    var reg_user = document.getElementById("user_reg").value;
    var reg_password = document.getElementById("passw_reg").value;
    var reg_role = "client";

    //alert(reg_user);
    var userArray = [];

    if (localStorage.getItem("lUserArray") !== null) {
        userArray = JSON.parse(localStorage.getItem("lUserArray"));
    }

    var current_reg = {
        user: reg_user,
        password: reg_password,
        role: reg_role
    };

    userArray.push(current_reg);

    localStorage.setItem("lUserArray", JSON.stringify(userArray));

    displayRooms();
}





function checkSession() {
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

    if (sessionStorage.getItem("loggedUser") == null) {
        hideDivById("logIn");
    }
}

function setUserNameOnDashboard() {
    var sessionUserArray = JSON.parse(sessionStorage.getItem("loggedUser"))
    var currentUser = sessionUserArray.user
    var currentRole = sessionUserArray.role

    var userSpan = document.getElementById("sessionUser")
    userSpan.innerText = "Hello, " + currentRole + " " + currentUser
}

function logout() {
    sessionStorage.removeItem("loggedUser")
    hideDivById("register");
}




/*
************* dashboard functionality end
*/

function displayRooms() {

    hideDivById('rooms');
    checkSession();

    var roomsArray = JSON.parse(localStorage.getItem("lRoomsArray"));
    for (var i = 0, length = roomsArray.length; i < length; i++) {
        var para = document.createElement("li");
        node = roomsArray[i].name + ": " + roomsArray[i].status;
        var node = document.createTextNode(node);
        para.appendChild(node);
        var element = document.getElementById("li1");
        element.appendChild(para);
    }
}







w3.includeHTML()

