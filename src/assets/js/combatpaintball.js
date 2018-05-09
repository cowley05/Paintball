//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('.page-scroll a').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    loadContent();
});

function loadContent() {
    // $('.github-content').each(function () {
    //     let contentFile = $(this).data("content-file");
    //     $(this).load("https://raw.githubusercontent.com/cowley05/Paintball/master/src/content/" + contentFile + ".html?cb=" + new Date().getTime())
    // })

    $.get("https://raw.githubusercontent.com/cowley05/Paintball/master/src/content/content.json", function (data) {
        let json = JSON.parse(data);
        loadSpecialOffersBanner(json.bannerSpecialOffers);
    });

    function loadSpecialOffersBanner(offers) {
        offers.forEach(function (offer) {
            let item = document.getElementById(offer.id);
            item.getElementsByTagName("h1")[0].innerHTML = offer.heading;
            item.getElementsByTagName("p")[0].innerHTML = offer.text;
            console.log(offer.text);
        });
    }
}
