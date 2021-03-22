
function preLoadUsers() {

    var userArray = [{
        user: "luis",
        password: "123",
        role: "client"
    }]

    localStorage.setItem("lUserArray", JSON.stringify(userArray))
}

function roomsBooked() {

    var roomsBookedArray = {
        room0: [],
        room1: [],
        room2: [],
        room3: [],
        room4: []
    }

    localStorage.setItem("lRoomsBookedArray", JSON.stringify(roomsBookedArray))
}

function preLoadRooms() {

    var roomsArray = [{
        name: "room12",
        capacity: 3,
        balcon: "yes"
    },
    {
        name: "room23",
        capacity: 5,
        balcon: "yes"
    },
    {
        name: "room34",
        capacity: 5,
        balcon: "no"
    }, {
        name: "room45",
        capacity: 1,
        balcon: "yes"
    }, {
        name: "room56",
        capacity: 1,
        balcon: "no"
    }]

    localStorage.setItem("lRoomsArray", JSON.stringify(roomsArray))
}

preLoadUsers()
preLoadRooms()
roomsBooked()