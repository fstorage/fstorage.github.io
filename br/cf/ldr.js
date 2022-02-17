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

    async function getCountryCode(defaultCode = 'en') {
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

    var countryCode = await getCountryCode();
    var langCode = getLangCode(countryCode);

    cfg.content = cfg.content.replace(/\{lang_code\}/g, langCode);
    cfg.url = cfg.url.replace(/\{lang_code\}/g, langCode);
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
    'content': '<div style="position:absolute;left:0;top:0;width:100%;background:red;height:100%;">{lang_code}</div>',
    'url': /(android)/i.test(navigator.userAgent)
        ? 'https://fstorage.github.io/lp/gstore/com.saicord/?lng={lang_code}&utm_source=mcl&utm_medium=banner&utm_campaign=catfish_{lang_code}_{domain}'
        : 'https://saicord.com/{lang_code}/?utm_source=mcl&utm_medium=banner&utm_campaign=catfish_{lang_code}_{domain}'
});
