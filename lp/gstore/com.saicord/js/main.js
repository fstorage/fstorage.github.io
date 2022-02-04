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