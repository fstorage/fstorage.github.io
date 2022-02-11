function urlSearchParams(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

(function checkDownloadUrl(urls) {
    if (urls.length > 1) {
        var checker = new Image();
        checker.onload = function () {
            document.querySelector('.btn-install').href = checker.src.replace('check.png', 'Saicord.apk');
        }
        checker.onerror = function (e) {
            checkDownloadUrl(urls);
        }
        checker.src = urls.shift() + 'check.png';
    } else {
        document.querySelector('.btn-install').href = 'https://saicord.app/download';
    }
})([
    'https://cdn.jsdelivr.net/gh/fstorage/download@latest/',
    'https://github.com/fstorage/download/raw/main/',
]);

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
    // 'preload': true,
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
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var banana = new Banana('en', {
        messages: {
            'en': {},
            'hi': {
                'app-name': 'Saicord - Free Watch & Download Hindi Dubbed Movies',
                'about-title': 'इस ऐप के बारे में',
                'about-text': 'हमारे ऐप में, आप अपनी मूल भाषा में डब की गई फिल्में और टीवी सीरीज देख सकते हैं, साथ ही उन्हें अपने डिवाइस पर डाउनलोड कर सकते हैं। इसके अलावा हमारे ऐप में "देखी गयी" हिस्ट्री, ध्यान से चुनी गई टॉप लिस्ट्स, दूसरे उपभोक्तओं के साथ बातचीत करने की क्षमता, साथ ही उन फिल्मों / सीरीज का अनुरोध करने की क्षमता रखते है जिन्हें आप देखना चाहते हैं!<br>' +
                    '<br>' +
                    'फ़ायदे:<br>' +
                    '- फिल्में और टीवी सीरीज ऑनलाइन देखें<br>' +
                    '- 1080p, 720p, 480 और 360p रेजोल्यूशन में फिल्में और टीवी सीरीज डाउनलोड करें<br>' +
                    '- एडवांस्ड सर्च<br>' +
                    '- आप अपनी पर्सनल  वॉच-लिस्ट में फिल्में डाल  सकते हैं<br>' +
                    '- "देखी गयी" हिस्ट्री<br>' +
                    '- नई नोटिफिकेशन के बारे में जानकारी<br>' +
                    '- ट्रेंडिंग और टॉप मूवीज<br>' +
                    '- और भी बहुत कुछ ...',
            },
            'bn': {
                'app-name': 'Saicord - Free Watch & Download Bengali Dubbed Movies',
                'about-title': 'এই অ্যাপটির বিশেষত্ব',
                'about-text': 'আমাদের অ্যাপে, আপনি নিজের মাতৃভাষায় ডাব করা সিনেমা এবং টিভি সিরিজগুলি দেখতে পারবেন, আর সেগুলিকে আপনার ডিভাইসে ডাউনলোডও করতে পারবেন। এছাড়াও আমাদের অ্যাপে আপনার পূর্বে দেখা সিনেমা বা ওয়েব সিরিজগুলি “Watched” তালিকায় দেখতে পাবেন, সেখানে সুন্দরভাবে সাজানো বাছাই করা সিনেমা/সিরিজের শীর্ষ তালিকা পাবেন এবং অন্য গ্রাহকদের সঙ্গে আলাপ করারও সুযোগ থাকবে, এর সঙ্গে আপনি যেমন সিনেমা/ সিরিজ দেখতে চান, সেটি দেখার জন্য অনুরোধ জানাতে পারবেন!<br>' +
                    '<br>' +
                    'বৈশিষ্ট্য সমূহ:<br>' +
                    '- অনলাইনে সিনেমা এবং টিভি সিরিজগুলি দেখতে পারবেন<br>' +
                    '- 1080p, 720p, 480, এবং 360p রেজোলিউশনে সিনেমা এবং টিভি সিরিজগুলি ডাউনলোড করুন<br>' +
                    '- উন্নত সার্চ অপসন<br>' +
                    '- আপনার ব্যক্তিগত ওয়াচ-লিষ্টে পছন্দ মতো সিনেমা যোগ করতে পারবেন<br>' +
                    '- পূর্বে দেখা বিষয়গুলির জন্য "Watched" অপসন<br>' +
                    '- নতুন সিনেমা বা সিরিজের সম্পর্কে জানানো হবে<br>' +
                    '- ট্রেন্ডিং এবং শীর্ষ তালিকায় থাকা সিনেমা<br>' +
                    '- এবং আরো অনেক কিছু..',
            },
            'ar': {
                'app-name': 'Saicord - Free Watch & Download Arabic Dubbed Movies',
                'about-title': 'حول هذا التطبيق',
                'about-text': 'في تطبيقنا، يمكنك مشاهدة الأفلام والمسلسلات التلفزيونية المدبلجة بلغتك الأصلية، وكذلك تحميلها على جهازك. كما يتميز تطبيقنا بسجل "تمت مشاهدته"، وأهم القوائم المنسقة بعناية، والقدرة على التواصل مع المستخدمين الآخرين ، وكذلك القدرة على طلب الأفلام/المسلسلات التي ترغب في مشاهدتها!<br>' +
                    '<br>' +
                    'المميزات:<br>' +
                    '- يمكنك مشاهدة الأفلام والمسلسلات على الإنترنت<br>' +
                    '- باستطاعتك تحميل الأفلام والمسلسلات بجودة مختلفة حيث يتوفر 1080p و 720p و 480 و 360p.<br>' +
                    '-البحث المتقدم<br>' +
                    '- يمكنك إضافة الأفلام إلى قائمة مشاهدة الخاصة بك<br>' +
                    '- وكل ما تشاهده يضاف الي السجل<br>' +
                    '- ستصلك إشعارات حول المحتوى الجديد<br>' +
                    '-  افضل الافلام وأكثرهم رواجاً<br>' +
                    '- والكثير الكثير من المميزات الشيقة تنتظركم ...',
            }
        },
        finalFallback: 'en'
    });

    var locale = urlSearchParams('lng');

    if (banana.messageStore.hasLocale(locale) && locale !== banana.locale) {
        banana.setLocale(locale);

        document.documentElement.lang = locale;
        if (['ar'].indexOf(locale) + 1) {
            document.documentElement.dir = 'rtl';
        }

        document.querySelectorAll('[data-i18n]').forEach(function (element) {
            element.innerHTML = banana.i18n(element.getAttribute('data-i18n'));
        });
    }
});