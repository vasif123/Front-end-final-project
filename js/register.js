
let users = [];
let profilePics = 'data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgARgBGAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t8Ck4ozRmgBeKOKM1taF4P1XxEN9pbHyc486Q7U/Pv+GaAMXg0YFdxJ8INZSPcs9m7f3A7A/qtcrq+h3+hXHk31s8DnoTyrfQjg0AUeKOKTNGaADiijNFAC4owKKKAOl8BeF18Ta0EmB+xwDzJsfxei/j/IGvc4oY4IkjiRY40G1UUYAHoBXnnwaCCw1JhjzDKgP0wcfzNei7vagBcVR1nRbXXtPks7uMPG44PdD2I9DV7PtSbvagD5x1jS5NF1S5spuZIXK5Hcdj+Iwap4rsfiuqDxa5XG5oULfXp/LFcdQAYFFFFABiiiigDr/hp4lj0DWmiuXCWt2AjOeisPuk+3JH417Z1rwHwx4OvvFMxFuoitlOHuHHyr7D1Pt/KvatA0Y6Fpsdp9rmuwnR5iOPYeg9uaANTFQXt5BptpLc3MgihjXczN2FS1zHjXwfL4qt1Ed/JA0fKwtzEx9SBzn35+lAHj/iLWH1/Wru+YFRK/yqf4VHCj8gKzauato93od69reQmGVeeejD1B7iqVAC4ooooAMVseFfDsvibWYrNCUj+/LIP4UHU/Xt+NY9ex/CXR1s9Ae+Zf3t25wf8AYU4A/PcaAOwsNPg0yzitbaMRQRDaqj/PWrGKWigBMUmKdRQBheLfC0HijTGgcBLhAWhm7o3+B714Jc2slncSwTIY5YmKOp6gg819L968g+LujrZ61BfRrhbtPmx/fXAJ/Ij8qAODxRRRQAYr6F8KwLb+GtLRegtoyfqVBP6miigDWxSEUUUAAGRQBRRQAYrhPjBbq/h21l/iS5AB9irZ/kKKKAPIKKKKAP/Z';
let profilePicsName = "pic selected";

//choose for add profile picture
$(".upload-icon").click(function (e) {
    $(".upload-btn").click();
})

$(".register-button").click(function (e) {
    e.preventDefault();

    if (!checkInputIsTrue()) return;

    let obj = {
        name: $(".register-name").val(),
        surname: $(".register-surname").val(),
        username: $(".register-username").val().toLowerCase(),
        password: $(".register-password").val(),
        image: profilePics
    }

    users = readLocalStorage();
    if (!users) users = [];

    if (isUserExist(users, obj)) {
        alert("Username already exist");
        return;
    }

    users.push(obj);

    writeLocalStorage(users);

    window.location.href = "./login.html";
})

$(".user-register-enter .log-in").click(function (e) {
    e.preventDefault();
    window.location.href = "./login.html";
})

function readLocalStorage() {
    return JSON.parse(localStorage.getItem("Users"));
}
function writeLocalStorage(users) {
    localStorage.setItem("Users", JSON.stringify(users));
}

//copy base64 to variable: 'profilpics'
$(".upload-btn").change(function (e) {
    const { files } = e.target;

    for (const file of files) {
        let fileReader = new FileReader();
        fileReader.onloadend = function (e) {
            const { result } = e.target;
            profilePics = result;
            profilePicsName = file.name;
            $(".upload-icon .upload-icon-span").text(profilePicsName + " selected");
        };
        fileReader.readAsDataURL(file);
    }
})

function isUserExist(users, obj) {
    let counter = 0;
    users.forEach(element => {
        if (element.username.toLowerCase() === obj.username.toLowerCase()) {
            counter++;
        }
    });
    if (counter > 0) return true;
    else return false;
}
function checkInputIsTrue() {
    if ($(".register-name").val() === "") {
        $(".register-name").css("border-color", "rgb(255, 0, 0)");
    }
    else $(".register-name").css("border-color", "#ced4da");
    if ($(".register-surname").val() === "") {
        $(".register-surname").css("border-color", "rgb(255, 0, 0)");
    }
    else $(".register-surname").css("border-color", "#ced4da");
    if ($(".register-username").val() === "") {
        $(".register-username").css("border-color", "rgb(255, 0, 0)");
    }
    else $(".register-username").css("border-color", "#ced4da");
    if ($(".register-password").val() === "") {
        $(".register-password").css("border-color", "rgb(255, 0, 0)");
    }
    else $(".register-password").css("border-color", "#ced4da");
    
    if ($(".register-name").css("border-color") === "rgb(255, 0, 0)" ||
        $(".register-surname").css("border-color") === "rgb(255, 0, 0)" ||
        $(".register-username").css("border-color") === "rgb(255, 0, 0)" ||
        $(".register-password").css("border-color") === "rgb(255, 0, 0)")
        return false;
    else return true;
}