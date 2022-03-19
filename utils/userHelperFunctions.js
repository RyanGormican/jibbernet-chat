const users = [];

// join user to chat
function userJoinsRoom(id, username, room) {
    const user = { id, username, room };
    users.push(user);

    return user;
}

// get current user 
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// user leaves chat
function userLeavesRoom(id) {
    const index = users.findIndex(user => user.id === id);
    // if user is not found it returns -1
    // if not 1, then return that user with splice function
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// get room users
function getRoomUsers(room) {
    // filter through users array getting users that are in parameter room
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoinsRoom,
    getCurrentUser,
    userLeavesRoom,
    getRoomUsers,
};