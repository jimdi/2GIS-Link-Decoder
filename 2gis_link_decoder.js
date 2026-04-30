// ==UserScript==
// @name         2GIS Link Decoder
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Decodes 2gis tracking links to direct URLs
// @author       Jim_Di
// @license MIT
// @match        https://2gis.ru/*
// @match        https://2gis.kz/*
// @match        https://2gis.kg/*
// @match        https://2gis.am/*
// @match        https://2gis.ae/*
// @match        https://2gis.uz/*
// @match        https://2gis.by/*
// @match        https://2gis.az/*
// @match        https://2gis.ge/*
// @match        https://2gis.tj/*
// @grant        none
// @run-at       document-end
// @downloadURL https://update.greasyfork.org/scripts/574531/2GIS%20Link%20Decoder.user.js
// @updateURL https://update.greasyfork.org/scripts/574531/2GIS%20Link%20Decoder.meta.js
// ==/UserScript==

(function() {
    'use strict';

    function decodeLink(href) {
        try {
            const b64 = href.split('/').pop();
            const decoded = atob(decodeURIComponent(b64));
            const url = decoded.split('\n')[0].trim();
            return /^[a-z]+:\/\//i.test(url) || ['viber:','tel:','whatsapp:','tg:'].some(p => url.startsWith(p)) ? url : null;
        } catch (e) {
            console.warn('Decode failed:', href, e);
            return null;
        }
    }

    function process() {
        document.querySelectorAll('a[href^="https://link.2gis."]').forEach(a => {
            const url = decodeLink(a.href);
            if (url) {
                a.href = url;
                if (a.target === '_blank') a.rel = 'noopener';
            }
        });
    }

    process();
    new MutationObserver(process).observe(document.body, { childList: true, subtree: true });
})();
