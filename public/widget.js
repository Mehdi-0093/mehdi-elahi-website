/**
 * Mehdi Elahi Research Assistant — Embeddable Chat Widget
 * Usage: <script src="https://mehdi-elahi-website.vercel.app/widget.js"></script>
 *
 * Optional attributes on the <script> tag:
 *   data-api   Override the API base URL (default: script src origin)
 *   data-theme "light" | "dark" (default: "light")
 */
(function () {
  "use strict";

  // ── Config ──────────────────────────────────────────────────────────────────
  var scripts = document.getElementsByTagName("script");
  var thisScript = scripts[scripts.length - 1];
  var scriptSrc = thisScript.src || "";
  var origin = scriptSrc
    ? new URL(scriptSrc).origin
    : "https://mehdi-elahi-website.vercel.app";
  var API_URL = (thisScript.getAttribute("data-api") || origin) + "/api/chat";

  // ── Session ID ──────────────────────────────────────────────────────────────
  var SESSION_KEY = "mehdi_chat_widget_session";
  function getSessionId() {
    var id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = "w-" + Date.now() + "-" + Math.random().toString(36).slice(2);
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  }

  // ── State ───────────────────────────────────────────────────────────────────
  var isOpen = false;
  var isLoading = false;
  var history = []; // [{role, content}]
  var sessionId = getSessionId();

  // ── Styles ──────────────────────────────────────────────────────────────────
  var CLAY = "#d97757";
  var DARK = "#141413";
  var IVORY = "#faf9f5";
  var BORDER = "#e3dacc";
  var MUTED = "#787670";

  var css = [
    "#__mehdi_widget__ *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:0}",
    "#__mehdi_trigger__{position:fixed;bottom:20px;right:20px;z-index:99999;width:56px;height:56px;border-radius:50%;background:" + DARK + ";color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,.25);transition:background .2s,transform .15s}",
    "#__mehdi_trigger__:hover{background:" + CLAY + ";transform:scale(1.05)}",
    "#__mehdi_panel__{position:fixed;bottom:88px;right:20px;z-index:99998;width:360px;max-width:calc(100vw - 40px);height:500px;border-radius:12px;border:1px solid " + BORDER + ";background:" + IVORY + ";display:flex;flex-direction:column;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.18);transition:opacity .25s,transform .25s}",
    "#__mehdi_panel__.hidden{opacity:0;transform:translateY(12px);pointer-events:none}",
    "#__mehdi_header__{background:" + DARK + ";padding:12px 16px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}",
    "#__mehdi_header__ .logo{width:28px;height:28px;border-radius:4px;background:" + CLAY + ";display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700}",
    "#__mehdi_header__ .info{margin-left:10px}",
    "#__mehdi_header__ .title{font-size:12px;font-weight:600;color:#fff}",
    "#__mehdi_header__ .subtitle{font-size:10px;color:" + MUTED + "}",
    "#__mehdi_header__ .close-btn{background:none;border:none;cursor:pointer;color:" + MUTED + ";padding:4px;border-radius:4px;display:flex;align-items:center}",
    "#__mehdi_header__ .close-btn:hover{color:#fff;background:rgba(255,255,255,.1)}",
    "#__mehdi_messages__{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px}",
    "#__mehdi_empty__{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:24px}",
    "#__mehdi_empty__ .em-logo{width:44px;height:44px;border-radius:8px;background:" + CLAY + ";display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:700;margin-bottom:12px}",
    "#__mehdi_empty__ h3{font-size:14px;font-weight:600;color:" + DARK + "}",
    "#__mehdi_empty__ p{font-size:12px;color:" + MUTED + ";margin-top:4px}",
    ".mw-suggestions{display:flex;flex-direction:column;gap:6px;margin-top:14px;width:100%}",
    ".mw-suggestions button{background:#fff;border:1px solid " + BORDER + ";border-radius:7px;padding:7px 12px;font-size:12px;color:#3d3d3a;text-align:left;cursor:pointer;transition:border-color .15s,color .15s}",
    ".mw-suggestions button:hover{border-color:" + CLAY + ";color:" + CLAY + "}",
    ".mw-msg-user{display:flex;justify-content:flex-end}",
    ".mw-msg-user .mw-bubble{background:" + CLAY + ";color:#fff;border-radius:8px;padding:8px 12px;font-size:13px;max-width:80%;line-height:1.45}",
    ".mw-msg-ai{display:flex;justify-content:flex-start}",
    ".mw-msg-ai .mw-bubble{background:#fff;border:1px solid " + BORDER + ";border-radius:8px;padding:8px 12px;font-size:13px;max-width:90%;line-height:1.55;color:" + DARK + ";white-space:pre-wrap}",
    ".mw-cursor{display:inline-block;width:2px;height:14px;background:" + CLAY + ";animation:blink .7s infinite}",
    "@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}",
    ".mw-dots span{display:inline-block;width:6px;height:6px;border-radius:50%;background:#b0aea5;animation:dot-bounce .9s infinite}",
    ".mw-dots span:nth-child(2){animation-delay:.15s}.mw-dots span:nth-child(3){animation-delay:.3s}",
    "@keyframes dot-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "#__mehdi_input_area__{flex-shrink:0;border-top:1px solid #e8e6dc;padding:10px}",
    "#__mehdi_input_row__{display:flex;align-items:flex-end;gap:8px;border:1px solid " + BORDER + ";border-radius:8px;background:#fff;padding:6px 8px}",
    "#__mehdi_textarea__{flex:1;border:none;outline:none;font-size:13px;color:" + DARK + ";resize:none;background:transparent;max-height:100px;line-height:1.4}",
    "#__mehdi_textarea__::placeholder{color:#b0aea5}",
    "#__mehdi_send__{width:30px;height:30px;border-radius:4px;background:" + CLAY + ";color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .15s}",
    "#__mehdi_send__:disabled{opacity:.4;cursor:default}",
    "#__mehdi_footer__{text-align:center;font-size:10px;color:#b0aea5;margin-top:6px}",
  ].join("\n");

  // ── DOM builders ─────────────────────────────────────────────────────────────
  function injectStyles() {
    var s = document.createElement("style");
    s.id = "__mehdi_widget_styles__";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function svgClose() {
    return '<svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M2 2l10 10M12 2L2 12"/></svg>';
  }

  function svgChat() {
    return '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2C6 2 2 5.6 2 10c0 1.8.6 3.5 1.7 4.8L2 20l5.5-1.6C8.8 19 9.9 19.2 11 19.2c5 0 9-3.6 9-8.6S16 2 11 2z"/><circle cx="7.5" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="10" r="1" fill="currentColor" stroke="none"/></svg>';
  }

  function svgSend() {
    return '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 7h12M7 1l6 6-6 6"/></svg>';
  }

  function createPanel() {
    var panel = document.createElement("div");
    panel.id = "__mehdi_panel__";
    panel.className = "hidden";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Research assistant chat");
    panel.setAttribute("aria-modal", "true");

    panel.innerHTML = [
      '<div id="__mehdi_header__">',
      '  <div style="display:flex;align-items:center">',
      '    <div class="logo">ME</div>',
      '    <div class="info"><div class="title">Research Assistant</div><div class="subtitle">Mehdi Elahi · PhD Researcher</div></div>',
      '  </div>',
      '  <button class="close-btn" aria-label="Close chat" id="__mehdi_close__">' + svgClose() + "</button>",
      "</div>",
      '<div id="__mehdi_messages__">',
      '  <div id="__mehdi_empty__">',
      '    <div class="em-logo">ME</div>',
      '    <h3>Research Assistant</h3>',
      '    <p>Ask me about Dr. Elahi\'s research</p>',
      '    <div class="mw-suggestions">',
      '      <button data-q="What is SentinelEdge?">What is SentinelEdge?</button>',
      '      <button data-q="Explain DriverHammer.">Explain DriverHammer.</button>',
      '      <button data-q="What are your hardware security contributions?">Hardware security contributions?</button>',
      '    </div>',
      "  </div>",
      "</div>",
      '<div id="__mehdi_input_area__">',
      '  <div id="__mehdi_input_row__">',
      '    <textarea id="__mehdi_textarea__" rows="1" placeholder="Ask about my research…"></textarea>',
      '    <button id="__mehdi_send__" disabled>' + svgSend() + "</button>",
      "  </div>",
      '  <div id="__mehdi_footer__">Powered by RAG · Answers grounded in published research</div>',
      "</div>",
    ].join("");

    return panel;
  }

  function createTrigger() {
    var btn = document.createElement("button");
    btn.id = "__mehdi_trigger__";
    btn.setAttribute("aria-label", "Open research assistant");
    btn.innerHTML = svgChat();
    return btn;
  }

  // ── Message rendering ────────────────────────────────────────────────────────
  function appendUserBubble(text) {
    hideEmpty();
    var div = document.createElement("div");
    div.className = "mw-msg-user";
    div.innerHTML = '<div class="mw-bubble">' + escHtml(text) + "</div>";
    msgs().appendChild(div);
    scrollBottom();
    return div;
  }

  function appendAiBubble() {
    var div = document.createElement("div");
    div.className = "mw-msg-ai";
    div.innerHTML = '<div class="mw-bubble"><span class="mw-dots"><span></span><span></span><span></span></span></div>';
    msgs().appendChild(div);
    scrollBottom();
    return div.querySelector(".mw-bubble");
  }

  function hideEmpty() {
    var el = document.getElementById("__mehdi_empty__");
    if (el) el.style.display = "none";
  }

  function msgs() {
    return document.getElementById("__mehdi_messages__");
  }

  function scrollBottom() {
    var m = msgs();
    if (m) m.scrollTop = m.scrollHeight;
  }

  function escHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ── Send message ─────────────────────────────────────────────────────────────
  function sendMessage(text) {
    if (!text.trim() || isLoading) return;
    isLoading = true;

    var ta = document.getElementById("__mehdi_textarea__");
    var sendBtn = document.getElementById("__mehdi_send__");
    if (ta) { ta.value = ""; ta.style.height = "auto"; }
    if (sendBtn) sendBtn.disabled = true;

    appendUserBubble(text);
    var bubble = appendAiBubble();
    var accContent = "";
    var started = false;

    var histCopy = history.slice(-12).map(function (m) { return { role: m.role, content: m.content }; });
    history.push({ role: "user", content: text });

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        sessionId: sessionId,
        history: histCopy,
        pageUrl: window.location.href,
      }),
    })
      .then(function (res) {
        if (!res.ok || !res.body) throw new Error("HTTP " + res.status);
        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var buf = "";

        function read() {
          reader.read().then(function (chunk) {
            if (chunk.done) {
              finalize();
              return;
            }
            buf += decoder.decode(chunk.value, { stream: true });
            var lines = buf.split("\n");
            buf = lines.pop() || "";
            for (var i = 0; i < lines.length; i++) {
              var line = lines[i];
              if (!line.startsWith("data: ")) continue;
              var raw = line.slice(6).trim();
              if (raw === "[DONE]") continue;
              try {
                var ev = JSON.parse(raw);
                if (ev.type === "delta" && ev.content) {
                  if (!started) {
                    bubble.innerHTML = "";
                    started = true;
                  }
                  accContent += ev.content;
                  bubble.textContent = accContent;
                  bubble.innerHTML += '<span class="mw-cursor"></span>';
                  scrollBottom();
                } else if (ev.type === "done") {
                  bubble.textContent = accContent;
                  scrollBottom();
                } else if (ev.type === "error") {
                  bubble.textContent = ev.error || "Something went wrong.";
                }
              } catch (e) { /* skip */ }
            }
            read();
          });
        }
        read();

        function finalize() {
          history.push({ role: "assistant", content: accContent });
          isLoading = false;
          if (sendBtn) sendBtn.disabled = false;
        }
      })
      .catch(function (err) {
        bubble.textContent = "Sorry, something went wrong. Please try again.";
        isLoading = false;
        if (sendBtn) sendBtn.disabled = false;
      });
  }

  // ── Toggle ──────────────────────────────────────────────────────────────────
  function openPanel() {
    isOpen = true;
    var panel = document.getElementById("__mehdi_panel__");
    var trigger = document.getElementById("__mehdi_trigger__");
    if (panel) panel.classList.remove("hidden");
    if (trigger) { trigger.innerHTML = svgClose(); trigger.setAttribute("aria-label", "Close research assistant"); }
    setTimeout(function () { var ta = document.getElementById("__mehdi_textarea__"); if (ta) ta.focus(); }, 100);
  }

  function closePanel() {
    isOpen = false;
    var panel = document.getElementById("__mehdi_panel__");
    var trigger = document.getElementById("__mehdi_trigger__");
    if (panel) panel.classList.add("hidden");
    if (trigger) { trigger.innerHTML = svgChat(); trigger.setAttribute("aria-label", "Open research assistant"); }
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    if (document.getElementById("__mehdi_panel__")) return;

    injectStyles();

    var panel = createPanel();
    var trigger = createTrigger();
    document.body.appendChild(panel);
    document.body.appendChild(trigger);

    // Wire trigger
    trigger.addEventListener("click", function () { isOpen ? closePanel() : openPanel(); });
    document.getElementById("__mehdi_close__").addEventListener("click", closePanel);

    // Suggestion buttons
    panel.querySelectorAll(".mw-suggestions button").forEach(function (btn) {
      btn.addEventListener("click", function () { sendMessage(btn.getAttribute("data-q")); });
    });

    // Textarea
    var ta = document.getElementById("__mehdi_textarea__");
    var sendBtn = document.getElementById("__mehdi_send__");

    ta.addEventListener("input", function () {
      sendBtn.disabled = !ta.value.trim();
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 100) + "px";
    });

    ta.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(ta.value.trim());
      }
    });

    sendBtn.addEventListener("click", function () { sendMessage(ta.value.trim()); });

    // Keyboard close
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) closePanel();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
