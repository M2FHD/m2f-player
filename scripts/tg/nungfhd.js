(function () {
  'use strict';
  if (window.__tgInviteLoaded) return;
  window.__tgInviteLoaded = true;

  var defaults = {
    telegramUrl: 'https://t.me/nungfhd',    
    title: 'เข้ากลุ่มดูหนังฟรี',                
    subtitle: 'ดูหนังออนไลน์ HD บน Telegram',   
    imageUrl: '',         
    delayMs: 1500,       
    hideHours: 24,       
    hideAfterClick: true, 
    storageKey: 'nungfhdInviteHiddenUntil'
  };
  var cfg = Object.assign({}, defaults, window.TelegramInviteConfig || {});

  
  var DEFAULT_ICON = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20128%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22tgw-bg%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%233BBDF8%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231B8AC4%22%2F%3E%3C%2FlinearGradient%3E%3Cmask%20id%3D%22tgw-holes%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22120.5%22%20cy%3D%2264%22%20r%3D%223.2%22%2F%3E%3Ccircle%20cx%3D%22109.7%22%20cy%3D%2297.2%22%20r%3D%223.2%22%2F%3E%3Ccircle%20cx%3D%2281.5%22%20cy%3D%22117.7%22%20r%3D%223.2%22%2F%3E%3Ccircle%20cx%3D%2246.5%22%20cy%3D%22117.7%22%20r%3D%223.2%22%2F%3E%3Ccircle%20cx%3D%2218.3%22%20cy%3D%2297.2%22%20r%3D%223.2%22%2F%3E%3Ccircle%20cx%3D%227.5%22%20cy%3D%2264%22%20r%3D%223.2%22%2F%3E%3Ccircle%20cx%3D%2218.3%22%20cy%3D%2230.8%22%20r%3D%223.2%22%2F%3E%3Ccircle%20cx%3D%2246.5%22%20cy%3D%2210.3%22%20r%3D%223.2%22%2F%3E%3Ccircle%20cx%3D%2281.5%22%20cy%3D%2210.3%22%20r%3D%223.2%22%2F%3E%3Ccircle%20cx%3D%22109.7%22%20cy%3D%2230.8%22%20r%3D%223.2%22%2F%3E%3C%2Fmask%3E%3C%2Fdefs%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2264%22%20r%3D%2264%22%20fill%3D%22%23FFFFFF%22%20mask%3D%22url(%23tgw-holes)%22%2F%3E%3Cg%20transform%3D%22translate(-2.39%20-11.72)%20scale(6)%22%3E%3Cpath%20fill%3D%22url(%23tgw-bg)%22%20d%3D%22M16.906%207.224c.1-.002.321.023.465.14a.506.506%200%200%201%20.171.325c.016.093.036.306.02.472-.18%201.898-.962%206.502-1.36%208.627-.168.9-.499%201.201-.82%201.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184%203.247-2.977%203.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793%201.14-5.061%203.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663%203.498-1.524%205.83-2.529%206.998-3.014%203.332-1.386%204.025-1.627%204.476-1.635z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";
  var IMG = cfg.imageUrl || DEFAULT_ICON;

  function esc(s) {
    var map = { '&': '\u0026amp;', '<': '\u0026lt;', '>': '\u0026gt;', '"': '\u0026quot;', "'": '\u0026#39;' };
    return String(s).replace(/[&<>"']/g, function (c) { return map[c]; });
  }

  function getHiddenUntil() {
    try { return Number(localStorage.getItem(cfg.storageKey)) || 0; } catch (e) { return 0; }
  }
  function setHidden() {
    try { localStorage.setItem(cfg.storageKey, String(Date.now() + cfg.hideHours * 36e5)); } catch (e) {}
  }

  var CSS = `
    .tgw-root{position:fixed;right:16px;bottom:calc(28px + env(safe-area-inset-bottom,0px));z-index:2147483000;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans Thai","Sukhumvit Set",sans-serif;opacity:0;transform:translateY(14px) scale(.96);transition:opacity .35s ease,transform .35s ease;pointer-events:none;-webkit-user-select:none;user-select:none}
    .tgw-root.tgw-show{opacity:1;transform:none;pointer-events:auto}
    .tgw-card{position:relative;display:flex;align-items:center;gap:10px;padding:8px 18px 8px 8px;border-radius:999px;background:linear-gradient(135deg,#2AABEE,#1D8FCB);color:#fff;text-decoration:none;box-shadow:0 6px 20px rgba(23,106,153,.35);transition:transform .2s ease,box-shadow .2s ease;-webkit-tap-highlight-color:transparent}
    .tgw-card:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(23,106,153,.45)}
    .tgw-card:active{transform:scale(.97)}
    .tgw-logo{width:40px;height:40px;border-radius:50%;background:#fff;flex:none;display:block}
    .tgw-ping{position:absolute;left:8px;top:8px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.35);animation:tgw-ping 2.6s ease-out infinite;pointer-events:none}
    @keyframes tgw-ping{0%{transform:scale(1);opacity:.5}70%,100%{transform:scale(1.8);opacity:0}}
    .tgw-txt{display:flex;flex-direction:column;text-align:left;line-height:1.3}
    .tgw-title{font-size:14px;font-weight:700;letter-spacing:.2px}
    .tgw-sub{font-size:11px;opacity:.85}
    .tgw-close{position:absolute;top:-8px;right:-4px;width:24px;height:24px;border:0;border-radius:50%;background:#fff;color:#6B7A86;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;padding:0}
    .tgw-close:hover{color:#333}
    @media (max-width:480px){
      .tgw-root{right:12px;bottom:calc(24px + env(safe-area-inset-bottom,0px))}
      .tgw-card{padding:6px 14px 6px 6px;gap:8px}
      .tgw-logo{width:34px;height:34px}
      .tgw-ping{left:6px;top:6px;width:34px;height:34px}
      .tgw-title{font-size:13px}
      .tgw-sub{display:none}
      .tgw-close{width:26px;height:26px;top:-9px;right:-5px}
    }
    @media (prefers-reduced-motion:reduce){.tgw-ping{animation:none;opacity:0}.tgw-root{transition:none}.tgw-card{transition:none}}
  `;

  var HTML =
    '<div class="tgw-root">' +
      '<a class="tgw-card" href="' + esc(cfg.telegramUrl) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="tgw-ping"></span>' +
        '<img class="tgw-logo" src="' + esc(IMG) + '" alt="" draggable="false">' +
        '<span class="tgw-txt">' +
          '<span class="tgw-title">' + esc(cfg.title) + '</span>' +
          '<span class="tgw-sub">' + esc(cfg.subtitle) + '</span>' +
        '</span>' +
      '</a>' +
      '<button class="tgw-close" type="button" aria-label="ปิด ซ่อนไป 24 ชั่วโมง">' +
        '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
      '</button>' +
    '</div>';

  var host, rootEl, removed = false;

  function mount() {
    host = document.createElement('div');
    host.id = 'tg-invite-widget';
    if (host.attachShadow) {
      var shadow = host.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<style>' + CSS + '</style>' + HTML;
      rootEl = shadow.querySelector('.tgw-root');
    } else {
      var st = document.createElement('style');
      st.textContent = CSS;
      document.head.appendChild(st);
      host.innerHTML = HTML;
      rootEl = host.querySelector('.tgw-root');
    }
    document.body.appendChild(host);
    rootEl.querySelector('.tgw-close').addEventListener('click', dismiss);
    rootEl.querySelector('.tgw-card').addEventListener('click', function () {
      if (cfg.hideAfterClick) { setHidden(); setTimeout(remove, 300); }
    });
    setTimeout(function () { if (!removed) rootEl.classList.add('tgw-show'); }, cfg.delayMs);
  }

  function dismiss() { setHidden(); remove(); }
  function remove() {
    if (removed) return;
    removed = true;
    rootEl.classList.remove('tgw-show');
    setTimeout(function () { if (host.parentNode) host.parentNode.removeChild(host); }, 400);
  }

  function init() {
    if (getHiddenUntil() > Date.now()) return; 
    mount();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.TelegramInvite = {
    hide: function () { setHidden(); if (rootEl) remove(); },
    reset: function () { try { localStorage.removeItem(cfg.storageKey); } catch (e) {} }
  };
})();
