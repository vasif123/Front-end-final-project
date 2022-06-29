if (localStorage.getItem("login") === "true") {
    $(".user-login-enter").empty();
    $(".user-login-enter").append(`<p>You are already registered</p>`);
}

$(".login-button").click(function (e) {
    e.preventDefault();

    let obj = {
        username: $(".register-username").val().toLowerCase(),
        password: $(".register-password").val(),
        image: ""
    }

    users = readLocalStorage();
    if (!users) {
        alert("Username not found");
        return;
    }

    if (!isUserExist(users, obj)) {
        alert("Username not found");
        return;
    }

    users.forEach(element => {
        if (element.username.toLowerCase() === obj.username.toLowerCase() && element.password === obj.password) {
            obj.image = element.image;
        }
    });

    writeLocalStorage("active-user", JSON.stringify(obj));
    writeLocalStorage("login", "true");

    window.location.href = "./index.html";
})

$(".user-login-enter .register").click(function (e) {
    e.preventDefault();
    window.location.href = "./register.html";
})

function readLocalStorage() {
    return JSON.parse(localStorage.getItem("Users"));
}
function writeLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function isUserExist(users, obj) {
    let counter = 0;
    users.forEach(element => {
        if (element.username === obj.username && element.password === obj.password) {
            counter++;
        }
    });
    if (counter > 0) return true;
    else return false;
}