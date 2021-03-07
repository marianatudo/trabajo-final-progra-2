
function preLoadUsers() {

    var userArray = []

    localStorage.setItem("lUserArray", JSON.stringify(userArray))
}


function preLoadRooms() {

    var roomsArray = [{
        name: "room12",
        capacity: "2 people",
        status: "available"
    },
    {
        name: "room23",
        capacity: "4 people",
        status: "not available"
    }]

    localStorage.setItem("lRoomsArray", JSON.stringify(roomsArray))
}

preLoadUsers()
preLoadRooms()