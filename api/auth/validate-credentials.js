module.exports = {
    isValidRegistration,
    isValidLogin
};
  
function isValidRegistration(user) {
    if (user.username 
        && user.password
        && user.role
        && user.email
        && typeof user.username === "string"
        && typeof user.password === "string"
        && typeof user.role === "string"
        && typeof user.email === "string") {
            if (user.role === "diner") {
                return "diner"
            } else if (user.role === "operator") {
                return "operator"
            } else {
                return false
            }
    } else {
        return false
    }
}

function isValidLogin(user) {
    if (user.username 
        && user.password
        && user.role
        && user.email
        && typeof user.username === "string"
        && typeof user.password === "string"
        && typeof user.role === "string"
        && typeof user.email === "string") {
            if (user.role === "diner") {
                return "diner"
            } else if (user.role === "operator") {
                return "operator"
            } else {
                return false
            }
    } else {
        return false
    }
}


// if (user.username 
//     && user.password
//     && user.role
//     && typeof user.username === "string"
//     && typeof user.password === "string"
//     && typeof user.role === "string") {
//         if (user.role === "diner") {
//             if (user.currentLocation
//                 && user.favoriteTrucks
//                 && typeof user.currentLocation === "string"
//                 && typeof user.favoriteTrucks === "object") {
//                     return "diner"
//                 } else {
//                     return false
//                 }
//         } else if (user.role === "operator") {
//             if (user.trucksOwned
//                 && typeof user.trucksOwned === "object") {
//                     return "operator"
//                 } else {
//                     return false
//                 }
//         } else {
//             return false
//         }
// } else {
//     return false
// }