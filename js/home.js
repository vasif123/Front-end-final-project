scrollToCountNumber();

scrollToElement(".features-sub-menu", '#cloud-services');
scrollToElement(".our-team", '#our-team');
scrollToElement(".pricing-plans", '#pricing-plans');
scrollToElement(".latests-blog", '#blog-posts');

//for coun number when element scroltop
function scrollToCountNumber() {
    let scroll = 0; //for count one time
    $(window).scroll(function () {
        let height = $(window).scrollTop();
        if (height > $(".parallax-context").offset().top - $(window).height() + $(".parallax-context").height()) {
            if (scroll === 0) {
                CalculateNumber(".project-complate", 10);
                CalculateNumber(".happy-customer", 5);
                CalculateNumber(".experienced-context", 79);
                CalculateNumber(".ongoing-project", 21);
                scroll = 1;
            }
        }
    })
}

//for calculate number when page load
function CalculateNumber(className, milliSeconds) {
    $(className).each(function () {
        let that = $(this);
        let temp = $(this).text();
        let i = 0;

        that.text(0);
        let interval = setInterval(function () {
            that.text(++i);
            if (i === +temp) clearInterval(interval);
        }, milliSeconds);
    });
}

//for scroll to element
function scrollToElement(clickElement, scrolToElement) {
    $(clickElement).click(function (e) {
        e.preventDefault();

        $(window).scrollTop($(scrolToElement).offset().top - 50);
    })
}

//for redirect social pages
$("[class*='fa-facebook']").click(function (e) {
    e.preventDefault();
    window.open('https://www.facebook.com/heydarovnamiq/', '_blank');
})
$("[class*='fa-twitter']").click(function (e) {
    e.preventDefault();
    window.open("https://twitter.com/heydarov_namik", '_blank');
})
$("[class*='fa-linkedin']").click(function (e) {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/namik-heydarov-887157221/", '_blank');
})
$("[class*='fa-google']").click(function (e) {
    e.preventDefault();
    window.open("https://myaccount.google.com/", '_blank');
})
$("[class*='fa-github']").click(function (e) {
    e.preventDefault();
    window.open("https://github.com/namikah", '_blank');
})

