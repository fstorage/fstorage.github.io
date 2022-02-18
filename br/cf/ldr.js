(async function (cfg) {
    function request(method, url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    async function getCountryCode(defaultCode = 'US') {
        try {
            var geo = JSON.parse(await request('GET', 'https://ip.nf/me.json'));
            return geo && geo.country_code || defaultCode;
        } catch (e) {
            return defaultCode;
        }
        return defaultCode;
    }

    function getLangCode(countryCode = 'US') {
        switch (countryCode) {
            case 'IN': return 'hi'; break;
            case 'BD': return 'bn'; break;
            default: return 'en'; break;
        }
    }

    function getLangName(langCode = 'en') {
        switch (langCode) {
            case 'hi': return 'Hindi'; break;
            case 'bn': return 'Bengali'; break;
            default: return ''; break;
        }
    }

    var countryCode = await getCountryCode();
    var langCode = getLangCode(countryCode);
    var langName = getLangName(langCode);

    cfg.content = cfg.content.replace(/\{lang_code\}/g, langCode);
    cfg.content = cfg.content.replace(/\{lang_name\}/g, langName);
    cfg.url = cfg.url.replace(/\{lang_code\}/g, langCode);
    cfg.url = cfg.url.replace(/\{lang_name\}/g, langName);
    cfg.url = cfg.url.replace(/\{domain\}/g, window.location.host);

    var wrp = document.createElement('div');
    wrp.style.width = '100%';
    wrp.style.height = '30%';
    wrp.style.maxHeight = '150px';
    wrp.style.cursor = 'pointer';
    wrp.style.margin = '0px auto';
    wrp.style.position = 'fixed';
    wrp.style.bottom = '0px';
    wrp.style.left = '50%';
    wrp.style.transform = 'translate(-50%, 0%) matrix(1, 0, 0, 1, 0, 0)';
    wrp.style.zIndex = '999999';

    var cls = document.createElement('div');
    cls.style.width = '20px';
    cls.style.height = '20px';
    cls.style.cursor = 'pointer';
    cls.style.backgroundColor = '#ffffff';
    cls.style.backgroundImage = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIG9wYWNpdHk9IjAuOCIgZmlsbD0iIzQwNDA0MCIgZD0iTTAuMDU1LDB2MjRoMjRWMEgwLjA1NXogTTE2LjUyNSwxOC4xNzFMMTIsMTMuNjQ2bC00LjUyNiw0LjUyNGwtMS42NDUtMS42NDZMMTAuMzU0LDEyTDUuODI5LDcuNDc1TDcuNDc0LDUuODNMMTIsMTAuMzU0bDQuNTI1LTQuNTI1bDEuNjQ2LDEuNjQ2TDEzLjY0NSwxMmw0LjUyNiw0LjUyNUwxNi41MjUsMTguMTcxeiIvPjwvc3ZnPg==)';
    cls.style.backgroundSize = '100% 100%';
    cls.style.position = 'absolute';
    cls.style.top = '0px';
    cls.style.right = '0px';
    cls.style.zIndex = '999999';
    cls.addEventListener('click', function () {
        wrp.remove();
    });

    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('allowfullscreen', 'true');
    ifrm.setAttribute('allowtransparency', 'true');
    ifrm.setAttribute('frameborder', '0');
    ifrm.setAttribute('hidefocus', 'true');
    ifrm.setAttribute('marginheight', '0');
    ifrm.setAttribute('marginwidth', '0');
    ifrm.setAttribute('mozallowfullscreen', 'true');
    ifrm.setAttribute('msallowfullscreen', 'true');
    ifrm.setAttribute('oallowfullscreen', 'true');
    ifrm.setAttribute('scrolling', 'no');
    ifrm.setAttribute('tabindex', '-1');
    ifrm.setAttribute('webkitallowfullscreen', 'true');
    ifrm.setAttribute('title', 'iframe');
    ifrm.style.width = '100%';
    ifrm.style.height = '100%';
    ifrm.style.border = '0px';
    ifrm.style.margin = '0px auto';
    ifrm.style.position = 'absolute';
    ifrm.style.bottom = '0px';
    ifrm.style.left = '0px';
    cls.style.backgroundColor = '#ffffff';

    var cntr = document.createElement('div');
    cntr.style.width = '100%';
    cntr.style.height = '100%';
    cntr.style.cursor = 'pointer';
    cntr.style.position = 'absolute';
    cntr.style.top = '0px';
    cntr.style.left = '0px';
    cntr.insertAdjacentHTML('afterbegin', cfg.content);
    cntr.addEventListener('click', function () {
        window.open(cfg.url, '_blank');
    });
    
    document.body.appendChild(wrp);
    wrp.appendChild(cls);
    wrp.appendChild(ifrm);
    ifrm.contentWindow.document.open();
    ifrm.contentWindow.document.close();
    ifrm.contentWindow.document.body.appendChild(cntr);
})({
    'content': '<style>@-webkit-keyframes bgmove {50% {background-position: top;}} @keyframes bgmove {50% {background-position:top;}}@-webkit-keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}} @-webkit-keyframes heartbeat{from{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{-webkit-transform:scale(.91);transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{-webkit-transform:scale(.98);transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{-webkit-transform:scale(.87);transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes heartbeat{from{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{-webkit-transform:scale(.91);transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{-webkit-transform:scale(.98);transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{-webkit-transform:scale(.87);transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}</style><div style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;width:100%;height:100%;position:absolute;left:0;top:0;background: linear-gradient(to top,#10101080 0%,#5865f2 90%), url(\'https://fstorage.github.io/br/cf/bg.jpg\') center bottom;background-size: cover;display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center;text-align: center;-webkit-animation: bgmove 10s ease-out infinite alternate both;animation: bgmove 10s ease-out infinite alternate both;"><div style="color: #ffffff;font-size: 24px;font-weight: bold;-webkit-animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) both;animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) both">Free Watch & Download <br>{lang_name} Dubbed Movies</div><div style="background: #20af0e;color: #ffffff;border-radius: 2px;padding: 10px 15px;margin-top: 20px;-webkit-animation:heartbeat 1.5s ease-in-out infinite both;animation:heartbeat 1.5s ease-in-out infinite both">PRESS HERE</div></div>',
    'url': /(android)/i.test(navigator.userAgent)
        ? 'https://fstorage.github.io/lp/gstore/com.saicord/?lng={lang_code}&utm_source=mcl&utm_medium=banner&utm_campaign=catfish_{lang_code}_{domain}'
        : 'https://saicord.com/{lang_code}/?utm_source=mcl&utm_medium=banner&utm_campaign=catfish_{lang_code}_{domain}'
});
