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

    $.get("https://raw.githubusercontent.com/cowley05/Paintball/master/src/content/content.json?cb=" + new Date().getTime(), function (data) {
        let json = JSON.parse(data);
        loadSpecialOffersBanner(json.bannerSpecialOffers);
        loadSpecialOfferDetails(json.specialOfferDetails);
        loadPrices(json.prices);
    });

    function loadSpecialOffersBanner(offers) {
        offers.forEach(function (offer) {
            let item = document.getElementById(offer.id);
            item.getElementsByTagName("h1")[0].innerHTML = offer.heading;
            item.getElementsByTagName("p")[0].innerHTML = offer.text;
        });
    }

    function loadSpecialOfferDetails(offers) {
        offers.forEach(function (offerData) {
            let offerDiv = createElementWithClass('div', 'row featurette');

            let offerDivInner = createElementWithClass('div', 'col-md-12');
            offerDiv.appendChild(offerDivInner);

            let offerH2 = createElementWithClass('h2', 'featurette-heading');
            let headingText = document.createTextNode(offerData.heading);
            offerH2.appendChild(headingText);
            offerDivInner.appendChild(offerH2);

            let offerP = createElementWithClass('p', 'lead');
            let pText = document.createTextNode(offerData.text);
            offerP.appendChild(pText);
            offerDivInner.appendChild(offerP);

            let offerDetailsDiv = document.getElementById('offer-details');
            offerDetailsDiv.appendChild(offerDiv);

            function createElementWithClass(tagName, className) {
                let element = document.createElement(tagName);
                element.className = className;
                return element;
            }
        });

    }

    function loadPrices(priceData) {
        function setHeader(priceTable, header) {
            let type = priceTable.getElementsByClassName('type')[0];
            let tag = type.getElementsByTagName('p')[0];
            tag.innerText = header;
        }

        function setPriceText(priceTable, html) {
            let plan = priceTable.getElementsByClassName('plan')[0];
            let header = plan.getElementsByClassName('header')[0];
            header.innerHTML = html;
        }

        priceData.forEach(function (priceData) {
            let priceTable = document.getElementById(priceData.id);
            setHeader(priceTable, priceData.header);
            setPriceText(priceTable, priceData.price);
        });
    }
}
