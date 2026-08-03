(function () {
  var MESSAGE_TYPE = "womopreneur-embed:resize";
  var SELECTOR = "[data-womopreneur-embed]";

  function getScriptOrigin() {
    var script = document.currentScript;
    if (!script) {
      var scripts = document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src && scripts[i].src.indexOf("embed.js") !== -1) {
          script = scripts[i];
          break;
        }
      }
    }
    if (!script || !script.src) return "";
    var a = document.createElement("a");
    a.href = script.src;
    return a.protocol + "//" + a.host;
  }

  var ORIGIN = getScriptOrigin();

  function createEmbed(container) {
    var path = container.getAttribute("data-path") || "/";
    var minHeight = parseInt(container.getAttribute("data-min-height") || "600", 10);

    var iframe = document.createElement("iframe");
    iframe.src = ORIGIN + path;
    iframe.title = "Womopreneur Directory";
    iframe.loading = "lazy";
    iframe.style.width = "100%";
    iframe.style.display = "block";
    iframe.style.border = "0";
    iframe.style.minHeight = minHeight + "px";
    iframe.style.height = minHeight + "px";

    container.appendChild(iframe);

    window.addEventListener("message", function (event) {
      if (!event.data || event.data.type !== MESSAGE_TYPE) return;
      if (event.source !== iframe.contentWindow) return;
      var height = Math.max(minHeight, event.data.height || 0);
      iframe.style.height = height + "px";
    });
  }

  function init() {
    var containers = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      if (container.getAttribute("data-womopreneur-embedded")) continue;
      container.setAttribute("data-womopreneur-embedded", "true");
      createEmbed(container);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
