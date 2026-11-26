/* ProDigitalGrow — shared site script */
(function () {
  /* ===== EDIT THESE CONTACT DETAILS (placeholders) ===== */
  var CONFIG = {
    whatsapp: "918460669760",          // country code + number, no "+" or spaces
    email: "hello@prodigitalgrow.com"
  };
  /* ====================================================== */

  // Analytics events (Google Tag Manager dataLayer + Meta Pixel)
  function track(name, fbEvent) {
    try {
      (window.dataLayer = window.dataLayer || []).push({ event: name, page_path: location.pathname });
      if (window.fbq && fbEvent) window.fbq("track", fbEvent);
    } catch (e) {}
  }

  // WhatsApp links
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var msg = a.getAttribute("data-wa") || "Hi ProDigitalGrow, I'd like to discuss my marketing.";
    a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", function () { track("whatsapp_click", "Contact"); });
  });
  document.querySelectorAll("[data-email]").forEach(function (a) {
    a.href = "mailto:" + CONFIG.email;
    if (!a.textContent.trim()) a.textContent = CONFIG.email;
  });

  // Mobile menu
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".menu");
  var MENU_SVG = burger ? burger.innerHTML : "";
  var CLOSE_SVG = '<svg class="svg-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
      burger.innerHTML = open ? CLOSE_SVG : MENU_SVG;
      document.body.classList.toggle("menu-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", false);
        burger.innerHTML = MENU_SVG;
        document.body.classList.remove("menu-open");
        document.body.style.overflow = "";
      });
    });
  }

  // Reveal on scroll
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

  // Lead forms -> send details to WhatsApp (works without a backend).
  // To use your own backend / Contact Form 7, replace this handler or set a form "action".
  document.querySelectorAll("form.lead-form").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      if (form.getAttribute("action")) return; // real backend configured
      ev.preventDefault();
      if (!form.reportValidity()) return;
      var lines = ["New enquiry — " + (form.dataset.source || document.title)];
      form.querySelectorAll("input,select,textarea").forEach(function (f) {
        if (!f.name || !f.value) return;
        var label = form.querySelector('label[for="' + f.id + '"]');
        lines.push((label ? label.textContent.replace("*", "").trim() : f.name) + ": " + f.value);
      });
      var url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(lines.join("\n"));
      // Open WhatsApp straight away (inside the click, so browsers don't block it)
      track("generate_lead", "Lead");
      var win = window.open(url, "_blank", "noopener");
      var ok = form.querySelector(".form-ok");
      if (ok) {
        ok.innerHTML = win
          ? 'Thanks! WhatsApp has opened with your details. Press send and we\'ll reply shortly. <a href="' + url + '" target="_blank" rel="noopener" style="text-decoration:underline">Didn\'t open? Tap here.</a>'
          : 'Thanks! <a href="' + url + '" target="_blank" rel="noopener" style="text-decoration:underline">Tap here to send your details on WhatsApp</a> and we\'ll reply shortly.';
        ok.style.display = "block";
      }
      form.reset();
    });
  });

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
