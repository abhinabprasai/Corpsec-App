/* forms.js — the two completable forms beyond Gabriella's advisor:
   • Incorporation funnel  → window.openIncorporation(jurisdiction)
   • Talk-to-sales contact → window.openContact(source)
   Both reuse window.CSModal (from gabriella.js) and the .gq-* form styling.
   No backend: submit resolves to a local success state. Also wires every
   [data-cta] button on the page to the right flow. */
(function () {
  "use strict";
  if (!window.CSModal) return;
  /* i18n bridge: read a translated "vanilla" string with an English fallback. */
  function L(key, fallback) { var I = window.__I18N; var v = I && I.t ? I.t(key) : ""; return v || fallback; }
  var reduce = (window.__PERF && window.__PERF.reduce) ||
    (window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches);

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim()); }

  var CHECK = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg>';
  var MARK = '<svg viewBox="0 0 43 43" width="22" height="22" fill="none" aria-hidden="true"><path fill="#533afd" fill-rule="evenodd" d="m0 43 43-9.119V0L0 9.226V43Z"/></svg>';

  /* ============================================================
     INCORPORATION FUNNEL
     ============================================================ */
  /* JURIS + ACTIVITIES values stay English: they are logic values (matched on the
     gabriella → incorporation handoff and echoed in the review/success states).
     `jurLabel`/`actLabel` provide the translated DISPLAY text per item key. */
  var JURIS = ["Singapore", "United Kingdom", "Delaware, USA", "Estonia", "Ireland",
    "Dubai, UAE", "Hong Kong", "Netherlands", "Texas, USA", "Cyprus", "Other / not sure yet"];
  var ACTIVITIES = ["SaaS / software", "E-commerce", "Consulting / services", "Holding company",
    "Trading", "Crypto / Web3", "Fintech", "Agency / creative", "Other"];
  function jurLabel(j) { return L('forms.juris.' + j, j); }
  function actLabel(a) { return L('forms.activities.' + a, a); }
  /* v is the logic value; label/price/desc are display-only and translated at build time. */
  function buildPackages() { return [
    { v: "launch", label: L('forms.packages.launch.label', "Launch"), price: L('forms.packages.launch.price', "from £120/mo"), desc: L('forms.packages.launch.desc', "First entity, fully banked.") },
    { v: "growth", label: L('forms.packages.growth.label', "Growth"), price: L('forms.packages.growth.price', "from £240/mo"), desc: L('forms.packages.growth.desc', "Entity + accounting + tax filing.") },
    { v: "scale", label: L('forms.packages.scale.label', "Scale"), price: L('forms.packages.scale.price', "Custom"), desc: L('forms.packages.scale.desc', "A portfolio across jurisdictions.") }
  ]; }

  function openIncorporation(jurisdiction) {
    var state = { jurisdiction: jurisdiction || "", pkg: "", name: "", activity: "", fullname: "", email: "" };
    var idx = 0;
    var STEPS = ["jurisdiction", "pkg", "company", "you", "review"];
    var PACKAGES = buildPackages();   // read translations at open time (supports runtime language swap)

    var wrap = el("div", "gq");
    wrap.innerHTML =
      '<div class="gq-head"><span class="gq-avatar gq-avatar--mark">' + MARK + '</span>' +
        '<div class="gq-id"><b>' + L('forms.incorp.title', 'Start your company') + '</b><small>' + L('forms.incorp.subtitle', 'Formation in 48h on average') + '</small></div>' +
        '<div class="gq-count" id="fmCount"></div></div>' +
      '<div class="gq-progress"><i id="fmProg"></i></div>' +
      '<div class="gq-stage" id="fmStage"></div>';
    var stage = wrap.querySelector("#fmStage");
    var prog = wrap.querySelector("#fmProg");
    var count = wrap.querySelector("#fmCount");

    function progress() { prog.style.width = Math.round((idx / STEPS.length) * 100) + "%"; count.textContent = (idx + 1) + " / " + STEPS.length; }

    function stepHTML(id) {
      if (id === "jurisdiction") {
        return q(L('forms.incorp.jurisdiction.q', "Where are you incorporating?"), L('forms.incorp.jurisdiction.help', "You can change this anytime — or let Gabriella choose for you.")) +
          '<div class="gq-field"><select class="gq-select" id="fmJur" data-autofocus><option value="" disabled' + (state.jurisdiction ? "" : " selected") + '>' + L('forms.incorp.jurisdiction.placeholder', 'Select a jurisdiction') + '</option>' +
          JURIS.map(function (j) { return '<option value="' + esc(j) + '"' + (state.jurisdiction === j ? " selected" : "") + '>' + jurLabel(j) + "</option>"; }).join("") + "</select></div>" +
          nav(false, true);
      }
      if (id === "pkg") {
        return q(L('forms.incorp.pkg.q', "Choose your plan"), L('forms.incorp.pkg.help', "Every plan includes formation, a registered agent and the dashboard.")) +
          '<div class="gq-opts gq-opts--pkg">' + PACKAGES.map(function (p) {
            return '<button class="gq-opt gq-opt--pkg' + (state.pkg === p.v ? " is-sel" : "") + '" type="button" data-v="' + p.v + '">' +
              '<span class="gq-opt__label">' + p.label + '<small>' + p.desc + "</small></span>" +
              '<span class="gq-opt__price">' + p.price + "</span>" +
              '<span class="gq-opt__check">' + CHECK + "</span></button>";
          }).join("") + "</div>" + nav(true, false);
      }
      if (id === "company") {
        return q(L('forms.incorp.company.q', "Your company"), L('forms.incorp.company.help', "A couple of basics to prepare your filing.")) +
          '<div class="gq-field"><label class="gq-flabel">' + L('forms.incorp.company.nameLabel', 'Proposed company name') + '</label>' +
          '<input class="gq-input2" id="fmName" type="text" placeholder="' + L('forms.incorp.company.namePlaceholder', 'e.g. Northwind Labs') + '" data-autofocus value="' + esc(state.name) + '"></div>' +
          '<div class="gq-field"><label class="gq-flabel">' + L('forms.incorp.company.activityLabel', 'Business activity') + '</label>' +
          '<select class="gq-select" id="fmAct"><option value="" disabled' + (state.activity ? "" : " selected") + '>' + L('forms.incorp.company.activityPlaceholder', 'Select an activity') + '</option>' +
          ACTIVITIES.map(function (a) { return '<option value="' + esc(a) + '"' + (state.activity === a ? " selected" : "") + '>' + actLabel(a) + "</option>"; }).join("") + "</select></div>" +
          nav(true, true);
      }
      if (id === "you") {
        return q(L('forms.incorp.you.q', "Where should we send your filing pack?"), L('forms.incorp.you.help', "We never share your details. One specialist, one thread.")) +
          '<div class="gq-field"><label class="gq-flabel">' + L('forms.incorp.you.nameLabel', 'Full name') + '</label>' +
          '<input class="gq-input2" id="fmFull" type="text" placeholder="' + L('forms.incorp.you.namePlaceholder', 'Your name') + '" data-autofocus value="' + esc(state.fullname) + '"></div>' +
          '<div class="gq-field"><label class="gq-flabel">' + L('forms.incorp.you.emailLabel', 'Work email') + '</label>' +
          '<input class="gq-input2" id="fmEmail" type="email" inputmode="email" placeholder="' + L('forms.email.placeholder', 'you@company.com') + '" value="' + esc(state.email) + '">' +
          '<p class="gq-err" id="fmErr" hidden>' + L('forms.email.error', 'Please enter a valid email.') + '</p></div>' + nav(true, true);
      }
      // review
      return q(L('forms.incorp.review.q', "Review &amp; submit"), "") +
        '<ul class="fm-review">' +
          row(L('forms.incorp.review.jurisdiction', "Jurisdiction"), jurLabel(state.jurisdiction)) +
          row(L('forms.incorp.review.plan', "Plan"), pkgLabel(state.pkg)) +
          row(L('forms.incorp.review.company', "Company"), state.name) +
          row(L('forms.incorp.review.activity', "Activity"), actLabel(state.activity)) +
          row(L('forms.incorp.review.contact', "Contact"), state.fullname + " · " + state.email) +
        "</ul>" +
        '<div class="gq-nav"><button class="gq-back" type="button">' + L('forms.nav.back', '← Back') + '</button>' +
        '<button class="btn btn-primary gq-next" type="button">' + L('forms.incorp.review.submit', 'Submit application') + '</button></div>';
    }

    function q(t, h) { return '<div class="gq-step"><h3 class="gq-q">' + t + "</h3>" + (h ? '<p class="gq-help">' + h + "</p>" : ""); }
    function nav(back, contDisabled) {
      return '<div class="gq-nav">' + (back ? '<button class="gq-back" type="button">' + L('forms.nav.back', '← Back') + '</button>' : "<span></span>") +
        '<button class="btn btn-primary gq-next" type="button"' + (contDisabled ? " disabled" : "") + ">" + L('forms.nav.continue', 'Continue') + "</button></div></div>";
    }
    function row(k, v) { return '<li><span>' + k + "</span><b>" + esc(v || "—") + "</b></li>"; }
    function pkgLabel(v) { for (var i = 0; i < PACKAGES.length; i++) if (PACKAGES[i].v === v) return PACKAGES[i].label + " (" + PACKAGES[i].price + ")"; return "—"; }
    function esc(s) { return (s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

    function render(dir) {
      progress();
      var html = stepHTML(STEPS[idx]);
      if (reduce) { stage.innerHTML = html; bind(); return; }
      stage.style.transition = "opacity .16s ease, transform .22s ease";
      stage.style.opacity = "0"; stage.style.transform = "translateX(" + (-dir * 16) + "px)";
      setTimeout(function () {
        stage.innerHTML = html;
        stage.style.transition = "none"; stage.style.transform = "translateX(" + (dir * 18) + "px)";
        void stage.offsetWidth;
        stage.style.transition = "opacity .3s ease, transform .5s cubic-bezier(.34,1.42,.52,1)";
        stage.style.opacity = "1"; stage.style.transform = "translateX(0)";
        bind();
      }, 150);
    }
    function next() { if (idx < STEPS.length - 1) { idx++; render(1); } }
    function back() { if (idx > 0) { idx--; render(-1); } }

    function bind() {
      var id = STEPS[idx];
      var step = stage.querySelector(".gq-step");
      var nextBtn = step.querySelector(".gq-next");
      var backBtn = step.querySelector(".gq-back");
      if (backBtn) backBtn.addEventListener("click", back);

      if (id === "jurisdiction") {
        var s = step.querySelector("#fmJur");
        nextBtn.disabled = !state.jurisdiction;
        s.addEventListener("change", function () { state.jurisdiction = s.value; nextBtn.disabled = !s.value; });
        nextBtn.addEventListener("click", next);
      } else if (id === "pkg") {
        step.querySelectorAll(".gq-opt").forEach(function (b) {
          b.addEventListener("click", function () {
            step.querySelectorAll(".gq-opt").forEach(function (x) { x.classList.remove("is-sel"); });
            b.classList.add("is-sel"); state.pkg = b.getAttribute("data-v"); setTimeout(next, 260);
          });
        });
      } else if (id === "company") {
        var nm = step.querySelector("#fmName"), ac = step.querySelector("#fmAct");
        var chk = function () { nextBtn.disabled = !(nm.value.trim() && ac.value); };
        nm.addEventListener("input", function () { state.name = nm.value; chk(); });
        ac.addEventListener("change", function () { state.activity = ac.value; chk(); });
        chk(); nextBtn.addEventListener("click", next);
      } else if (id === "you") {
        var fn = step.querySelector("#fmFull"), em = step.querySelector("#fmEmail"), err = step.querySelector("#fmErr");
        var chk2 = function () { nextBtn.disabled = !(fn.value.trim() && validEmail(em.value)); err.hidden = true; };
        fn.addEventListener("input", function () { state.fullname = fn.value; chk2(); });
        em.addEventListener("input", function () { state.email = em.value; chk2(); });
        chk2();
        nextBtn.addEventListener("click", function () { if (!validEmail(em.value)) { err.hidden = false; return; } next(); });
      } else { // review
        nextBtn.addEventListener("click", submit);
      }
    }

    function submit() {
      stage.style.transition = "opacity .2s ease"; stage.style.opacity = "0";
      prog.style.width = "100%"; count.textContent = L('forms.count.done', 'Done');
      setTimeout(function () {
        var body = L('forms.incorp.success.body', 'A CorpSec specialist will confirm your {{jurisdiction}} setup and email {{email}} within one business day with your filing pack and a fixed, all-in quote.')
          .replace('{{jurisdiction}}', esc(jurLabel(state.jurisdiction)))
          .replace('{{email}}', '<b>' + esc(state.email) + '</b>');
        stage.innerHTML =
          '<div class="fm-success"><span class="gq-tick">' + CHECK + "</span>" +
            "<h3>" + L('forms.incorp.success.title', 'Application received.') + "</h3>" +
            "<p>" + body + "</p>" +
            '<div class="fm-success__next"><span>' + CHECK + " " + L('forms.incorp.success.step1', 'Name &amp; structure check') + "</span><span>" + CHECK + " " + L('forms.incorp.success.step2', 'Filing prepared by a licensed local partner') + "</span><span>" + CHECK + " " + L('forms.incorp.success.step3', 'Banking introductions lined up') + "</span></div>" +
            '<button class="btn btn-primary btn-lg" id="fmDone">' + L('forms.backToSite', 'Back to site') + '</button></div>';
        stage.style.opacity = "1";
        stage.querySelector("#fmDone").addEventListener("click", function () { window.CSModal.close(); });
      }, 220);
    }

    window.CSModal.open(wrap, {});
    render(1);
  }
  window.openIncorporation = openIncorporation;

  /* ============================================================
     CONTACT / TALK TO SALES (single step)
     ============================================================ */
  function openContact(source) {
    var wrap = el("div", "gq");
    wrap.innerHTML =
      '<div class="gq-head"><span class="gq-avatar gq-avatar--mark">' + MARK + "</span>" +
        '<div class="gq-id"><b>' + L('forms.contact.title', 'Talk to sales') + '</b><small>' + L('forms.contact.subtitle', 'One specialist, replies within a business day') + '</small></div></div>' +
      '<form class="gq-step" id="ctForm" novalidate>' +
        '<div class="gq-field gq-field--row">' +
          '<div><label class="gq-flabel">' + L('forms.contact.nameLabel', 'Full name') + '</label><input class="gq-input2" id="ctName" type="text" placeholder="' + L('forms.contact.namePlaceholder', 'Your name') + '" data-autofocus></div>' +
          '<div><label class="gq-flabel">' + L('forms.contact.companyLabel', 'Company') + '</label><input class="gq-input2" id="ctCo" type="text" placeholder="' + L('forms.contact.companyPlaceholder', 'Company (optional)') + '"></div>' +
        "</div>" +
        '<div class="gq-field"><label class="gq-flabel">' + L('forms.contact.emailLabel', 'Work email') + ' <span class="gq-req">*</span></label>' +
          '<input class="gq-input2" id="ctEmail" type="email" inputmode="email" placeholder="' + L('forms.email.placeholder', 'you@company.com') + '">' +
          '<p class="gq-err" id="ctErr" hidden>' + L('forms.email.error', 'Please enter a valid email.') + '</p></div>' +
        '<div class="gq-field"><label class="gq-flabel">' + L('forms.contact.needLabel', 'What do you need?') + '</label>' +
          '<textarea class="gq-input2 gq-textarea" id="ctMsg" rows="3" placeholder="' + L('forms.contact.needPlaceholder', "Jurisdictions you're weighing, entity count, timeline…") + '"></textarea></div>' +
        '<input type="hidden" id="ctSource" value="' + (source || "contact") + '">' +
        '<div class="gq-nav gq-nav--end"><button class="btn btn-primary gq-next" type="submit">' + L('forms.contact.send', 'Send message') + '</button></div>' +
      "</form>";

    var form = wrap.querySelector("#ctForm");
    var email = wrap.querySelector("#ctEmail");
    var err = wrap.querySelector("#ctErr");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validEmail(email.value)) { err.hidden = false; email.focus(); return; }
      var name = wrap.querySelector("#ctName").value.trim();
      var sentTitle = L('forms.contact.success.sentBase', 'Message sent') +
        (name ? L('forms.contact.success.sentName', ', {{name}}').replace('{{name}}', esc2(name.split(" ")[0])) : "") +
        L('forms.contact.success.sentEnd', '.');
      var sentBody = L('forms.contact.success.body', 'Thanks for reaching out. A CorpSec specialist will reply to {{email}} within one business day. Prefer to talk now? Use the chat pill in the corner.')
        .replace('{{email}}', '<b>' + esc2(email.value.trim()) + '</b>');
      wrap.innerHTML =
        '<div class="fm-success"><span class="gq-tick">' + CHECK + "</span>" +
          "<h3>" + sentTitle + "</h3>" +
          "<p>" + sentBody + "</p>" +
          '<button class="btn btn-primary btn-lg" id="ctDone">' + L('forms.backToSite', 'Back to site') + '</button></div>';
      wrap.querySelector("#ctDone").addEventListener("click", function () { window.CSModal.close(); });
    });
    function esc2(s) { return (s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

    window.CSModal.open(wrap, {});
  }
  window.openContact = openContact;

  /* ============================================================
     Wire CTAs (declarative via data-cta)
     ============================================================ */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-cta]");
    if (!t) return;
    var kind = t.getAttribute("data-cta");
    if (kind === "incorp") { e.preventDefault(); openIncorporation(t.getAttribute("data-jur") || ""); }
    else if (kind === "contact") { e.preventDefault(); openContact(t.getAttribute("data-source") || "cta"); }
    else if (kind === "gabriella") { e.preventDefault(); if (window.openGabriella) window.openGabriella(""); }
  });

  /* FAQ accordion: smooth height animation on native <details> */
  (function () {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (d) {
      var a = d.querySelector(".faq-a");
      var sum = d.querySelector("summary");
      if (!a || !sum) return;
      sum.addEventListener("click", function (e) {
        if (reduce) return;                 // let native toggle handle it
        e.preventDefault();
        if (d.open) {
          a.style.height = a.scrollHeight + "px";
          requestAnimationFrame(function () { a.style.height = "0px"; });
          a.addEventListener("transitionend", function h() { d.open = false; a.style.height = ""; a.removeEventListener("transitionend", h); }, { once: true });
        } else {
          d.open = true;
          a.style.height = "0px";
          requestAnimationFrame(function () { a.style.height = a.scrollHeight + "px"; });
          a.addEventListener("transitionend", function h() { a.style.height = "auto"; a.removeEventListener("transitionend", h); }, { once: true });
        }
      });
    });
  })();

  /* footer newsletter (no backend → local success) */
  var fsub = document.getElementById("footSub");
  if (fsub) fsub.addEventListener("submit", function (e) {
    e.preventDefault();
    var inp = document.getElementById("footSubInput");
    var note = document.getElementById("footSubNote");
    if (!validEmail(inp.value)) { note.textContent = L('forms.email.error', "Please enter a valid email."); note.classList.remove("ok"); return; }
    note.textContent = L('forms.newsletter.success', "✓ You're subscribed — see you next month."); note.classList.add("ok");
    inp.value = "";
  });
})();
