
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
        status: "available"
    },
    {
        name: "room34",
        capacity: "6 people",
        status: "available"
    }]

    localStorage.setItem("lRoomsArray", JSON.stringify(roomsArray))
}

function roomsBooked() {

    var roomsBookedArray = []

    localStorage.setItem("lRoomsBookedArray", JSON.stringify(roomsBookedArray))
}


preLoadUsers()
preLoadRooms()
roomsBooked()