function urlSearchParams(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

Fancybox.bind("[data-fancybox]", {
    'infinite': false,
    'closeButton': 'outside',
    Thumbs: false,
    Toolbar: {
        display: [
            "close",
        ],
    },
});

var screens = new Carousel(document.querySelector(".screens"), {
    //'preload': true,
    'infinite': false,
    'center': false,
    'dragFree': true
});

document.querySelectorAll('.block > .title').forEach(function(title) {
    title.addEventListener('click', function() {
        window.scrollTo({
            top: this.offsetTop - 5,
            behavior: "smooth"
        });
    })
})