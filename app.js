// Бритва и латунь — меню, анимации появления, демо-форма
(function () {
  "use strict";

  // ---- бургер-меню ----
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        burger.classList.remove("open");
      }
    });
  }

  // ---- появление блоков при прокрутке ----
  var animated = document.querySelectorAll(".reveal, .stagger");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    animated.forEach(function (el) { el.classList.add("on"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("on");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    animated.forEach(function (el) { io.observe(el); });
  }

  // ---- демо-форма ----
  var form = document.getElementById("booking-form");
  if (form) {
    var ok = document.getElementById("form-ok");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var phone = form.elements.phone.value.replace(/\D/g, "");
      if (name.length < 2) { form.elements.name.focus(); return; }
      if (phone.length < 10) { form.elements.phone.focus(); return; }
      if (ok) {
        ok.classList.add("show");
        ok.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      form.reset();
    });
  }
})();
