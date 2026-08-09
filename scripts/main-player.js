/**
 * Embed Player Script
 * สคริปต์สำหรับฝังเครื่องเล่นภาพยนตร์และซีรีส์
 * 
 * วิธีการใช้งาน:
 * <script src="https://cdn.jsdelivr.net/gh/M2FHD/m2f-player@main/scripts/main-player.js" data-id="550"></script>
 */

(function() {
    'use strict';

    var currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    if (!currentScript) {
        console.error('Embed Player: Cannot find script tag');
        return;
    }

    var hasCustomWidth = currentScript.hasAttribute('data-width') && currentScript.getAttribute('data-width') !== '100%';
    var hasCustomHeight = currentScript.hasAttribute('data-height') && currentScript.getAttribute('data-height') !== '400px';
    var id = currentScript.getAttribute('data-id');
    
    var type = currentScript.getAttribute('data-type');
    if (!type) {
        type = id && id.toString().startsWith('tv') ? 'tv' : 'movie';
    }
    
    var params = {
        id: id,
        type: type,
        season: currentScript.getAttribute('data-season') || '1',
        episode: currentScript.getAttribute('data-episode') || '1',
        theme: currentScript.getAttribute('data-theme') || 'red',
        skin: currentScript.getAttribute('data-skin') || '',
        logo: currentScript.getAttribute('data-logo') || '',
        logoDisplay: currentScript.getAttribute('data-logo-display') || '0',
        width: currentScript.getAttribute('data-width') || '100%',
        height: currentScript.getAttribute('data-height') || '400px',
        maxHeight: currentScript.getAttribute('data-max-height') || '',
        minHeight: currentScript.getAttribute('data-min-height') || '',
        useAspectRatio: !hasCustomWidth && !hasCustomHeight
    };

    if (!params.id) {
        console.error('Embed Player: data-id is required');
        return;
    }

    var timestamp = Math.floor(Date.now() / 1000);
    var secret = 'EeiwOGbavMPyL57gDfTmQScdhYn6s91Zto3WVj0CXNprkJBlzAuq8F4IxHK2UR'; 
    var tokenData = secret + params.id + timestamp;
    
    function md5(string) {
        function rotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        }
        function addUnsigned(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            if (lX4 | lY4) {
                if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            } else return (lResult ^ lX8 ^ lY8);
        }
        function F(x,y,z) { return (x & y) | ((~x) & z); }
        function G(x,y,z) { return (x & z) | (y & (~z)); }
        function H(x,y,z) { return (x ^ y ^ z); }
        function I(x,y,z) { return (y ^ (x | (~z))); }
        function FF(a,b,c,d,x,s,ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        function GG(a,b,c,d,x,s,ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        function HH(a,b,c,d,x,s,ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        function II(a,b,c,d,x,s,ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        function convertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
        }
        function wordToHex(lValue) {
            var wordToHexValue="",wordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                lByte = (lValue>>>(lCount*8)) & 255;
                wordToHexValue_temp = "0" + lByte.toString(16);
                wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length-2,2);
            }
            return wordToHexValue;
        }
        var x=Array();
        var k,AA,BB,CC,DD,a,b,c,d;
        var S11=7, S12=12, S13=17, S14=22;
        var S21=5, S22=9 , S23=14, S24=20;
        var S31=4, S32=11, S33=16, S34=23;
        var S41=6, S42=10, S43=15, S44=21;
        string = unescape(encodeURIComponent(string));
        x = convertToWordArray(string);
        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
        for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x02441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x04881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=addUnsigned(a,AA);
            b=addUnsigned(b,BB);
            c=addUnsigned(c,CC);
            d=addUnsigned(d,DD);
        }
        return (wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d)).toLowerCase();
    }
    
    var token = md5(tokenData);

    var baseUrl = 'https://play.m2fhd.com/embed/video';
    var iframeUrl = baseUrl + '?id=' + encodeURIComponent(params.id) + 
                    '&ts=' + timestamp + 
                    '&token=' + encodeURIComponent(token);

    if (params.type === 'tv') {
        iframeUrl += '&ss=' + encodeURIComponent(params.season);
        iframeUrl += '&ep=' + encodeURIComponent(params.episode);
    }

    if (params.theme && params.theme !== 'red') {
        iframeUrl += '&theme=' + encodeURIComponent(params.theme);
    }

    if (params.skin) {
        iframeUrl += '&skin=' + encodeURIComponent(params.skin);
    }

    if (params.logo) {
        iframeUrl += '&logo=' + encodeURIComponent(params.logo);
        if (params.logoDisplay) {
            iframeUrl += '&lg=' + encodeURIComponent(params.logoDisplay);
        }
    }

    var container = document.createElement('div');
    container.className = 'embed-player-container';
    container.style.width = params.width === '100%' ? '100%' : params.width;
    container.style.maxWidth = '100%';
    
    if (params.maxHeight) {
        container.style.maxHeight = params.maxHeight;
    }
    
    if (params.minHeight) {
        container.style.minHeight = params.minHeight;
    }

    if (params.useAspectRatio) {
        container.style.aspectRatio = '16/9';
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
    }

    var iframe = document.createElement('iframe');
    iframe.src = iframeUrl;
    iframe.style.width = '100%';
    
    if (params.useAspectRatio) {
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.height = '100%';
    } else {
        iframe.style.height = params.height;
        iframe.style.borderRadius = '8px';
        iframe.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    }

    iframe.style.border = 'none';
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');



    container.appendChild(iframe);

    currentScript.parentNode.insertBefore(container, currentScript);
    currentScript.parentNode.removeChild(currentScript);

    console.log('Embed Player: Loaded successfully', {
        id: params.id,
        type: params.type,
        skin: params.skin,
        theme: params.theme,
        url: iframeUrl
    });

    if (!window.m2f) {
        window.m2f = {};
    }

    if (!window.m2f.player) {
        window.m2f.player = {};
    }

    // Load report issue script
    var reportScript = document.createElement('script');
    reportScript.src = 'https://play.m2fhd.com/script/inc/reportIssue.js';
    reportScript.async = true;
    reportScript.onload = function() {
        console.log('[m2f.player] Report issue script loaded');
    };
    reportScript.onerror = function() {
        console.error('[m2f.player] Failed to load report issue script');
    };
    document.head.appendChild(reportScript);

    /**
     * Get player information
     * Communicates with iframe via postMessage to get complete player data
     * Returns data from parent window + iframe (if available)
     */
    window.m2f.player.getInfo = function(callback) {
        console.log('[m2f.player] getInfo called, callback:', !!callback);
        var info = {
            id: params.id,
            type: params.type,
            season: params.season,
            episode: params.episode,
            theme: params.theme,
            skin: params.skin,
            logo: params.logo,
            logoDisplay: params.logoDisplay,
            width: params.width,
            height: params.height
        };
        console.log('[m2f.player] Parent data:', info);

        if (callback && typeof callback === 'function') {
            console.log('[m2f.player] Using async mode');
            if (iframe && iframe.contentWindow) {
                console.log('[m2f.player] iframe exists, sending postMessage');
                var messageId = 'm2f_getInfo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                var timeoutId;
                var responseReceived = false;

                var handleMessage = function(event) {
                    console.log('[m2f.player] Received message:', event.data);
                    if (event.data && event.data.type === 'm2f_player_info' && event.data.id === messageId) {
                        responseReceived = true;
                        clearTimeout(timeoutId);
                        window.removeEventListener('message', handleMessage);

                        var iframeData = event.data.data;
                        console.log('[m2f.player] Received iframe data:', iframeData);
                        for (var key in iframeData) {
                            if (iframeData.hasOwnProperty(key)) {
                                info[key] = iframeData[key];
                            }
                        }

                        console.log('[m2f.player] Final merged info:', info);
                        callback(info);
                    }
                };

                window.addEventListener('message', handleMessage);

                try {
                    console.log('[m2f.player] Sending postMessage to iframe, messageId:', messageId);
                    iframe.contentWindow.postMessage({
                        type: 'm2f_getInfo_request',
                        id: messageId
                    }, '*');
                } catch (e) {
                    console.error('[m2f.player] postMessage error:', e);
                    window.removeEventListener('message', handleMessage);
                    callback(info);
                }

                timeoutId = setTimeout(function() {
                    if (!responseReceived) {
                        console.log('[m2f.player] Timeout - no response from iframe');
                        window.removeEventListener('message', handleMessage);
                        callback(info);
                    }
                }, 2000);
            } else {
                console.log('[m2f.player] iframe not available, returning parent data only');
                callback(info);
            }
        } else {
            console.log('[m2f.player] Using sync mode, returning parent data only');
            return info;
        }
    };

    /**
     * Send control command to iframe
     */
    function sendControlCommand(command, params) {
        if (iframe && iframe.contentWindow) {
            console.log('[m2f.player] Sending control command:', command, params);
            try {
                iframe.contentWindow.postMessage({
                    type: 'm2f_player_control',
                    command: command,
                    params: params
                }, '*');
            } catch (e) {
                console.error('[m2f.player] Control command error:', e);
            }
        } else {
            console.error('[m2f.player] iframe not available');
        }
    }

    /**
     * Change season
     * @param {number} season - Season number
     */
    window.m2f.player.changeSeason = function(season) {
        sendControlCommand('changeSeason', { season: season });
    };

    /**
     * Change episode
     * @param {number} episode - Episode number
     */
    window.m2f.player.changeEpisode = function(episode) {
        sendControlCommand('changeEpisode', { episode: episode });
    };

    /**
     * Play video
     */
    window.m2f.player.play = function() {
        sendControlCommand('play', {});
    };

    /**
     * Pause video
     */
    window.m2f.player.pause = function() {
        sendControlCommand('pause', {});
    };

    /**
     * Stop video
     */
    window.m2f.player.stop = function() {
        sendControlCommand('stop', {});
    };

})();
