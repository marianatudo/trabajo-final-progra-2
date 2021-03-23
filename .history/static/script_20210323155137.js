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

function registerNewUser() {
    var reg_user = document.getElementById("user_reg").value;
    var reg_password = document.getElementById("passw_reg").value;
    var reg_role = "client";

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

    hideDivById("clientMenu")
}

function loginMenu() {
    var radios = document.getElementsByName('loginMenu');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
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

function checkLogin() {
    var user = document.getElementById("user").value;
    var password = document.getElementById("passw").value;

    var userArray = JSON.parse(localStorage.getItem("lUserArray"));

    if (user !== null && user !== "") {
        if (password !== null && password !== "") {
            var canLogin = checkLoginInfo(user, password, userArray);
            if (canLogin === true) {
                var role = getUserRole(user, password, userArray)
                createSessionUser(user, password, role)
                if (role === "admin") {
                    //aqui va lo del admin
                }
                else {
                    hideDivById("clientMenu")
                }
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


//--------------------------------------------------------------------------------------------------------------------
function checkSession() {
    checkForValidLoginSession()
    w3.includeHTML()
}

function checkForValidLoginSession() {

    if (sessionStorage.getItem("loggedUser") == null) {
        hideDivById("logIn");
    } else {
        setUserNameOnDashboard()
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
    hideDivById("loginMenu");
}


//----------------------------------------------------------------------------------------------------------------------------------

function displayRooms(capacity) {

    hideDivById('rooms');
    checkSession();

    var roomsArray = JSON.parse(localStorage.getItem("lRoomsArray"));

    for (var i = 0, length = roomsArray.length; i < length; i++) {

        var element = document.getElementById("room" + i);
        if (element) {
            element.parentNode.removeChild(element);
        }

        if (roomsArray[i].capacity == capacity) {
            var para = document.createElement("li");
            room = roomsArray[i].name
            var node = document.createTextNode(room);
            para.appendChild(node);
            var element = document.getElementById("li1").appendChild(para);

            var button = document.createElement("button");
            button.innerHTML = "Book room"
            button.setAttribute("id", "room" + i)
            para.setAttribute("id", "room" + i)
            button.setAttribute("onclick", "bookingRoom(id)")
            element.appendChild(button)
        }
    }

    document.getElementById("roomBooking").addEventListener("click", function () {
        displayRooms(capacity)
    });
}

function bookingRoom(id) {
    hideDivById("dateBooking")
    var i = 0
    document.getElementById("bookRoomButton").addEventListener("click", function () {
        if (i == 0) {

            bookingDates(id)
            i++
        }
    });
}

function bookingDates(Id) {

    var time1 = new Date(document.getElementById("checkIn").value);
    var time2 = new Date(document.getElementById("checkOut").value);

    roomArray = JSON.parse(localStorage.getItem("lRoomsBookedArray"));

    if (roomArray[Id].length >= 1) {

        time1 = JSON.stringify(time1)
        time2 = JSON.stringify(time2)

        var a = false

        var i
        for (i = 0; i < roomArray[Id].length; i++) {

            var checkIn = JSON.stringify(roomArray[Id][i].checkIn)
            var checkOut = JSON.stringify(roomArray[Id][i].checkOut)

            if (time1 <= checkIn && time2 >= checkOut) {
                a = true
            } else if (time1 <= checkOut && time2 >= checkIn) {
                a = true
            }
        }

        if (a == false) {
            registerBooking(Id, time1, time2)
            alert("la reserva se realizo con exito")
        } else {
            alert("Ya hay reservacion para ese dia")
        }
    }

    else {
        if (time2 > time1) {
            registerBooking(Id, time1, time2)
            alert("La reserva se realizo con exito")
        }
        else {
            alert("no puede hacer checkIn despues del checkOut")
        }
    }
}

function registerBooking(Id, date1, date2) {
    if (localStorage.getItem("lRoomsBookedArray") !== null) {
        var roomArray = [];

        roomArray = JSON.parse(localStorage.getItem("lRoomsBookedArray"));
    }

    var name = loadUserName()

    var arraynew = {
        nombre: name,
        checkIn: date1,
        checkOut: date2
    };

    roomArray[Id].push(arraynew);

    localStorage.setItem("lRoomsBookedArray", JSON.stringify(roomArray));
}

function loadUserName() {
    var name
    if (sessionStorage.getItem("loggedUser") !== null) {
        name = JSON.parse(sessionStorage.getItem("loggedUser"));

        return name.user
    }
}
//-------------------------------------------------------------------------------------------------------------------------

function roomCapacity() {
    var radios = document.getElementsByName('checkCapacity');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            displayRooms(radios[i].value)
        }
    }
}

function clientMenu() {
    hideDivById('clientMenu');
    checkSession();
}

function allReservations() {

    roomArray = JSON.parse(localStorage.getItem("lRoomsBookedArray"));

    //i = (roomArray["room" + 0][0].checkIn)

    var i = 0

    while (i < 5) {
        if (roomArray["room" + i].length > 0) {

            hideDivById("myReservations")
            alert("hola")

            var e = roomArray["room" + i].length
            alert(e)

            for (var a = 0, length = roomArray["room" + i].length; i < length; i++) {
                alert(a)
            }
        }
        i++
    }

}



w3.includeHTML()