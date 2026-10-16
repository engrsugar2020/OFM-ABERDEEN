/* Omega Fire Ministries Aberdeen site scripts */
(function () {
  "use strict";

  var CHURCH = {
    email: "info@ofmaberdeen.co.uk",
    facebook: "https://www.facebook.com/ofmaberdeen",
    address: "360 Clifton Road, Aberdeen AB24 4DX, Scotland",
    maps: "https://www.google.com/maps/search/?api=1&query=360+Clifton+Road+Aberdeen+AB24+4DX",
    youtube: "https://www.youtube.com/results?search_query=OFM+Aberdeen",
    tiktok: "https://www.tiktok.com/@ofm.aberdeen"
  };

  /* Mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = open ? "&times;" : "&#9776;";
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Carousels */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".carousel-track");
    var slides = root.querySelectorAll(".slide");
    var dotsWrap = root.querySelector(".dots");
    var index = 0, timer;
    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Show photo " + (i + 1));
      b.addEventListener("click", function () { go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    var dots = dotsWrap.querySelectorAll("button");
    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, j) { d.classList.toggle("active", j === index); });
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { go(index + 1); }, 5500); }
    root.querySelector(".prev").addEventListener("click", function () { go(index - 1); restart(); });
    root.querySelector(".next").addEventListener("click", function () { go(index + 1); restart(); });
    var startX = null;
    root.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); restart(); }
      startX = null;
    });
    go(0); restart();
  });

  /* Gallery lightbox */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img"), lbCap = lb.querySelector(".lb-cap");
    document.querySelectorAll(".m-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var img = item.querySelector("img");
        lbImg.src = img.src; lbImg.alt = img.alt;
        lbCap.textContent = item.querySelector("h3").textContent;
        lb.classList.add("open");
      });
    });
    function closeLb() { lb.classList.remove("open"); }
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".lb-close")) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  /* Copy buttons */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () { btn.title = "Copied"; btn.style.color = "#e2b340"; setTimeout(function () { btn.style.color = ""; btn.title = "Copy"; }, 1500); };
      if (navigator.clipboard) { navigator.clipboard.writeText(text).then(done, done); } else { done(); }
    });
  });

  /* Contact form: opens the visitor's email app */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var from = form.email.value.trim();
      var msg = form.message.value.trim();
      var subject = "Message or prayer request from " + (name || "a visitor");
      var body = msg + "\n\n" + (name || "") + (from ? "\n" + from : "");
      window.location.href = "mailto:" + CHURCH.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  /* Power House Assistant (answers common questions) */
  var fab = document.querySelector(".chat-fab");
  var panel = document.querySelector(".chat-panel");
  if (fab && panel) {
    var body = panel.querySelector(".chat-body");
    var chatForm = panel.querySelector(".chat-form");
    var input = chatForm.querySelector("input");
    var greeted = false;

    var answers = [
      { k: ["weekly", "activities", "schedule", "programme", "program", "times"], a: "Our weekly activities: Sunday Service 10:00 AM to 11:00 AM; Anointing Service on the 1st Sunday at 8:30 AM; Bible Study on Tuesdays 8:15 PM to 9:15 PM; Solution Hour on Fridays at 10:00 PM (except the last Friday); and Fire Night on the last Friday, 10:00 PM to 1:00 AM. See <a href='activities.html'>Weekly Activities</a>." },
      { k: ["sunday", "service time", "what time", "when is", "service"], a: "Sunday Service at Omega Fire Ministries Aberdeen (Power House) is every Sunday from 10:00 AM to 11:00 AM at 360 Clifton Road, Aberdeen. On the 1st Sunday of the month there is also an Anointing Service at 8:30 AM. We would love for you to join us!" },
      { k: ["anointing", "first sunday", "1st sunday", "8:30", "8.30"], a: "The Anointing Service is held on the 1st Sunday of every month at 8:30 AM at 360 Clifton Road, before Sunday Service at 10:00 AM." },
      { k: ["online", "live", "stream", "youtube", "tiktok", "facebook", "social"], a: "Follow us for live streams and announcements on <a href='" + CHURCH.facebook + "' target='_blank' rel='noopener'>Facebook</a>, <a href='" + CHURCH.youtube + "' target='_blank' rel='noopener'>YouTube</a> and <a href='" + CHURCH.tiktok + "' target='_blank' rel='noopener'>TikTok</a>." },
      { k: ["bible", "tuesday", "study"], a: "Bible Study is every Tuesday from 8:15 PM to 9:15 PM. Bring your Bible, your questions and a hunger for the Word." },
      { k: ["solution", "friday", "hour"], a: "Solution Hour is every Friday at 10:00 PM, except the last Friday of the month, when we hold Fire Night (10:00 PM to 1:00 AM)." },
      { k: ["fire night", "last friday", "night", "vigil"], a: "Fire Night is held on the last Friday of every month, 10:00 PM to 1:00 AM, joining Fire &amp; Miracle Night with Apostle Johnson Suleman." },
      { k: ["where", "address", "location", "direction", "parking", "find"], a: "We meet at 360 Clifton Road, Aberdeen AB24 4DX, Scotland. <a href='" + CHURCH.maps + "' target='_blank' rel='noopener'>Get directions</a>." },
      { k: ["give", "giving", "tithe", "offering", "donat", "seed", "bank", "gift aid", "pay", "account", "sort code"], a: "Thank you for your heart to give! Bank transfer: Royal Bank of Scotland, account name Omega Fire Ministries Aberdeen, sort code 83-30-00, account number 19105201. Use the reference TITHE / OFFERING / SEED + your name. You can also give in person at any service. See the <a href='give.html'>Give page</a> for more." },
      { k: ["pastor", "lead", "hope", "ogom", "suleman", "apostle", "minister"], a: "Our branch is led by Min. Hope Ogom, under the covering of our General Overseer, Apostle Prof. Johnson Suleman, and Rev. Dr. Lizzy Johnson Suleman." },
      { k: ["child", "kid", "family", "famil"], a: "Children and families are fully welcome at every service. Arrive a few minutes early and our welcome team will look after you like family." },
      { k: ["contact", "email", "phone", "call", "reach", "prayer request"], a: "You can email us at <a href='mailto:" + CHURCH.email + "'>" + CHURCH.email + "</a>, message us on <a href='" + CHURCH.facebook + "' target='_blank' rel='noopener'>Facebook</a>, or send a prayer request from the <a href='contact.html'>Contact page</a>." },
      { k: ["charity", "oscr", "registered"], a: "Omega Fire Ministries Aberdeen (Power House) Scotland is a registered Scottish charity, number SC047125 (OSCR)." },
      { k: ["hello", "hi", "hey", "good morning", "good evening"], a: "Hello and welcome to the Power House! Ask me about service times, our location, giving or how to get in touch." }
    ];
    var fallback = "I am not sure about that one. Please email <a href='mailto:" + CHURCH.email + "'>" + CHURCH.email + "</a> and the Power House team will be glad to help.";

    function add(text, who) {
      var m = document.createElement("div");
      m.className = "msg " + who;
      if (who === "bot") { m.innerHTML = text; } else { m.textContent = text; }
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }
    function reply(q) {
      var t = q.toLowerCase(), best = null, score = 0;
      answers.forEach(function (a) {
        var s = 0;
        a.k.forEach(function (k) { if (t.indexOf(k) !== -1) s += k.length; });
        if (s > score) { score = s; best = a; }
      });
      setTimeout(function () { add(best ? best.a : fallback, "bot"); }, 450);
    }
    function ask(q) { add(q, "user"); reply(q); }
    function greet() {
      if (greeted) return; greeted = true;
      add("Welcome to the Power House! How can I help you today?", "bot");
      var chips = document.createElement("div");
      chips.className = "chips";
      ["What time is the Sunday service?", "Where are you located?", "How can I give?", "Weekly activities"].forEach(function (q) {
        var b = document.createElement("button"); b.type = "button"; b.textContent = q;
        b.addEventListener("click", function () { ask(q); });
        chips.appendChild(b);
      });
      body.appendChild(chips);
    }
    function setOpen(open) {
      panel.classList.toggle("open", open);
      fab.classList.toggle("open", open);
      fab.setAttribute("aria-expanded", open ? "true" : "false");
      fab.innerHTML = open ? "&times;" : fab.getAttribute("data-icon");
      if (open) { greet(); setTimeout(function () { input.focus(); }, 50); }
    }
    fab.setAttribute("data-icon", fab.innerHTML);
    fab.addEventListener("click", function () { setOpen(!panel.classList.contains("open")); });
    panel.querySelector(".chat-close").addEventListener("click", function () { setOpen(false); });
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value.trim(); if (!q) return;
      input.value = ""; ask(q);
    });
  }
})();
