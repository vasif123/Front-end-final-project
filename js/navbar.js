navbarScrollEffect();

let userPics = "./assets/images/anonymous.png";
try { userPics = JSON.parse(localStorage.getItem("active-user")).image; } catch { };

if (localStorage.getItem("login") === "true") {
    $(".login-menu").empty();
    $(".login-menu").append(`
    <li class="d-flex justify-content-end align-items-center">
        <div class="d-flex flex-column justify-content-end align-items-end">
            <span style="display: block;" class="user">${JSON.parse(localStorage.getItem("active-user")).username}</span>
            <a style="padding: 0 15px;" class="sign-out">sign out</a>
        </div>
        <div class="d-flex flex-column justify-content-between align-items-start">
            <img src="${userPics}" alt="profile-image" class="img-fluid profile-image-top-right">
            <input id="upload-btn-navbar" type="file" style="display: none;"/>
        </div>
    </li>
    <li class="nav-item nav-item-last d-flex justify-content-end align-items-center" data-id="0">
        <a class="nav-link active basket-button-effect" aria-current="page" href="#">
            <i class="fas fa-shopping-cart basket-icon"></i>
        </a>
        <ul class="my-cart-list"></ul>
    </li>`);
    $(".profile-image-top-right").attr("src", JSON.parse(localStorage.getItem("active-user")).image)
}

//change profile pisctures with local storage
$(".profile-image-top-right").click(function (e) {
    $("#upload-btn-navbar").click();
})
$("#upload-btn-navbar").change(function (e) {
    const { files } = e.target;

    for (const file of files) {
        let fileReader = new FileReader();
        fileReader.onloadend = function (e) {

            let users;
            let username;
            try { username = JSON.parse(localStorage.getItem("active-user")).username; } catch { }
            try { users = JSON.parse(localStorage.getItem("Users")); } catch { users = [] }
            if (!users) users = [];

            for (let i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    let newObj = users[i];
                    newObj.image = e.target.result;
                    users[i] = newObj;

                    localStorage.setItem("Users", JSON.stringify(users));
                }
            }
            let user = JSON.parse(localStorage.getItem("active-user"));
            user.image = e.target.result;
            localStorage.setItem("active-user", JSON.stringify(user));

            $(".profile-image-top-right").attr("src", e.target.result);
        };
        fileReader.readAsDataURL(file);
    }
})


$(".sign-out").click(function (e) {
    localStorage.setItem("login", "false");
    localStorage.removeItem("active-user");
    $("body").append(`<div id="enlarge"><span></span></div>`);

    $('#loading-effect').css("display", "block").animate({
        opacity: 1
    }, 500, "linear", function () {
        $('#loading-effect span').css("transform", "rotate(360deg)");
    });

    setTimeout(() => {
        $('#loading-effect').remove();
        window.location.href = "";
    }, 1000);
})

//for responsive menu open
$(".menu-icon").click(function (e) {
    e.preventDefault();
    $(".menu-responsive").slideToggle(500);

})

//for sub menu open for responsive menu
$(".drop-menu").click(function (e) {
    e.preventDefault();
    $("ul .sub-menu").not($(this).next()).slideUp(500);
    $(this).next(".sub-menu").slideToggle(500);
})


let baskets;
let username;
try { username = JSON.parse(localStorage.getItem("active-user")).username; } catch { }
try { baskets = JSON.parse(localStorage.getItem(username)); } catch { baskets = [] }
if (!baskets) baskets = [];

RefreshList(baskets);

$(".pricing-btn").click(function (e) {
    e.preventDefault();

    try { username = JSON.parse(localStorage.getItem("active-user")).username; } catch { }
    try { baskets = JSON.parse(localStorage.getItem(username)); } catch { baskets = [] }
    if (!baskets) baskets = [];

    let obj = {
        plan: $(this).prev().prev().prev().prev().text(),
        info: $(this).prev().text(),
        price: $(this).prev().prev().text()
    }

    let counter = 0;
    baskets.forEach(element => {
        if (element.plan === obj.plan)
            counter++;
    });
    if (counter > 0) return;

    baskets.push(obj);
    localStorage.setItem(username, JSON.stringify(baskets));

    RefreshList(baskets);
})

//create new item to basket
function createNewItem(obj) {
    $(".my-cart-list").append(` <li class="basket-button-effect">
    <h4>${obj.plan}</h4>
    <h6>${obj.info}</h6>
    <h2>${obj.price}</h2>
    <i class="far fa-trash-alt x-close" data-id="${obj.plan}"></i>
  </li>`)
}

//refresh all comments
function RefreshList(baskets) {
    $(".my-cart-list").empty();
    baskets.forEach(element => {
        createNewItem(element);
    });
    $(".nav-item-last").attr("data-id", baskets.length)

    //remove element from basket list top
    $(".x-close").click(function (e) {
        e.preventDefault();
        try { userOfName = JSON.parse(localStorage.getItem("active-user")).username; } catch { }
        try { basketsList = JSON.parse(localStorage.getItem(userOfName)); } catch { baskets = [] }
        if (!basketsList) basketsList = [];

        for (let i = 0; i < basketsList.length; i++) {
            if (basketsList[i].plan === this.getAttribute("data-id")) {
                basketsList.splice(i, 1);
                localStorage.setItem(username, JSON.stringify(basketsList));
            }
        }
        RefreshList(basketsList);
    })

    $(".my-cart-list li").click(function (e) {
        loadingEffect(".basket-button-effect", "./basket.html");
    })
}

function navbarScrollEffect() {
    $(window).scroll(function (e) {
        e.preventDefault();
        if ($(this).scrollTop() < 80) {
            $(".navbar").css("transition", "0.3s all");
            $(".navbar").removeClass("active-scroll");
            $(".navbar").css("transform", "translateY(0)");
            $(".navbar").css("opacity", "1");
            $(".navbar").css("box-shadow", "0 0px 0px 0 rgba(0, 0, 0, 0.00)");
            $(".navbar").css("background-color", "transparent");
        }
        else if ($(this).scrollTop() > 80 && $(this).scrollTop() < 100) {
            $(".navbar").css("transition", "0s");
            $(".navbar").css("transform", "translateY(-100%)");
            $(".navbar").css("opacity", "0");
        }
        else if ($(this).scrollTop() > 100) {
            $(".navbar").css("transition", "1s all");
            $(".navbar").addClass("active-scroll");
            $(".navbar").css("transform", "translateY(0)");
            $(".navbar").css("opacity", "1");
            $(".navbar").css("box-shadow", "0 2px 28px 0 rgba(0, 0, 0, 0.2)");
            $(".navbar").css("background-color", "#fff");
        }
    });
}

loadingEffect(".about-us-button", "./about.html");
loadingEffect(".features-button", "./features.html")
loadingEffect(".faqs-button", "./faqs.html")
loadingEffect(".blog-button", "./blog.html")
loadingEffect(".blog-more-button", "./blogMore.html")
loadingEffect(".contact-button", "./contact.html")
loadingEffect(".home-button", "./index.html")
loadingEffect(".sign-in-button-effect", "./login.html")
loadingEffect(".sign-up-button-effect", "./register.html")
loadingEffect(".basket-button-effect", "./basket.html")
loadingEffect(".services-card-button-effect", "./solution.html")

//loading effect
function loadingEffect(element, location) {
    $("body").append(`<div id="loading-effect"><span></span></div>`);
    $(element).click(function (e) {
        e.preventDefault();
        $("body").append(`<div id="enlarge"><span></span></div>`);

        $('#loading-effect').css("display", "block").animate({
            opacity: 1
        }, 500, "linear", function () {
            $('#loading-effect span').css("transform", "rotate(360deg)");
        });

        setTimeout(() => {
            window.location.href = location;
        }, 1000);
        setTimeout(() => {
            $('#loading-effect').remove();
        }, 2000);

    })
}