const body = document.querySelector("body");
const hamburgerBtn = document.querySelector(".header__hamburger");
const toggleBg = document.querySelector(".header__toggle-bg");
const toggleNav = document.querySelector(".header__toggle-box");

hamburgerBtn.addEventListener("click", () => {
  if (hamburgerBtn.classList.contains("header__hamburger--active")) {
    hamburgerBtn.classList.remove("header__hamburger--active");

    body.classList.remove("no-scroll");

    toggleBg.classList.remove("fade-in");
    toggleBg.classList.add("fade-out");

    toggleNav.classList.remove("fade-in");
    toggleNav.classList.add("fade-out");
  } else {
    hamburgerBtn.classList.add("header__hamburger--active");

    body.classList.add("no-scroll");

    toggleBg.classList.remove("fade-out");
    toggleBg.classList.add("fade-in");

    toggleNav.classList.remove("fade-out");
    toggleNav.classList.add("fade-in");
  }
});

const form = document.querySelector(".footer__form");
const submitBtn = document.querySelector(".footer__form .btn");
const input = document.querySelector(".form__input input");

function validate(email) {
  const format =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(format);
}

submitBtn.addEventListener("click", () => {
  if (!input.value || !validate(input.value)) {
    form.classList.remove("success");
    form.classList.add("error");
  } else {
    form.classList.remove("error");
    form.classList.add("success");
    input.value = "";
    setTimeout(() => {
      form.classList.remove("success");
    }, 3000);
  }
});

let container = document.querySelector(".testimonials__cards");
let cards = Array.from(document.querySelectorAll(".testimonials__cards .card"));
let mobileTogle = Array.from(
  document.querySelectorAll(".testimonials__display-bar span")
);

class Testimonials {
  constructor(cards, selector, container) {
    this.active = 0;
    this.initialContainer = [];
    this.cards = cards;
    this.delay = 6500;
    this.selector = selector;
  }

  //card animations mobile
  exitRight(card) {
    card.addEventListener("animationend", function animationEnd() {
      card.classList.remove("card--active");
      card.classList.remove("exit-right");
      card.removeEventListener("animationend", animationEnd);
    });
    card.classList.add("exit-right");
  }

  exitLeft(card) {
    card.addEventListener("animationend", function animationEnd() {
      card.classList.remove("card--active");
      card.classList.remove("exit-left");
      card.removeEventListener("animationend", animationEnd);
    });
    card.classList.add("exit-left");
  }

  enterRight(card) {
    card.addEventListener("animationend", function animationEnd() {
      card.classList.add("card--active");
      card.classList.remove("enter-right");
      card.removeEventListener("animationend", animationEnd);
    });
    card.classList.add("enter-right");
  }

  enterLeft(card) {
    card.addEventListener("animationend", function animationEnd() {
      card.classList.add("card--active");
      card.classList.remove("enter-left");
      card.removeEventListener("animationend", animationEnd);
    });
    card.classList.add("enter-left");
  }

  //card change
  handleToggleClick(id) {
    //disable if active
    if (id === this.active) return;

    if (id > this.active) {
      // //set target to enter right. set active to exit left
      this.enterRight(this.cards[id]);
      this.exitLeft(this.cards[this.active]);
    } else {
      //set target to enter left. set active to exit right
      this.enterLeft(this.cards[id]);
      this.exitRight(this.cards[this.active]);
    }
    this.active = id;
    this.selector.forEach((span, index) => this.setActiveBubble(span, index));
  }

  handleInterval() {
    //only active on screens below 1024px
    if (window.innerWidth >= 1024) return;
    console.log(window.innerWidth);
    let current = this.active;
    this.active = this.active >= 3 ? 0 : this.active + 1;

    this.enterRight(this.cards[this.active]);
    this.exitLeft(this.cards[current]);

    this.selector.forEach((span, index) => this.setActiveBubble(span, index));
  }

  setActiveBubble(span, index) {
    if (index === this.active) {
      span.classList.add("dot--active");
    } else {
      span.classList.remove("dot--active");
    }
  }

  setActiveCard() {
    this.cards[this.active].classList.add("card--active");
    this.selector[this.active].classList.add("dot--active");
  }

  updateContainer(element) {
    let temp = element.cloneNode(true);
    element.parentNode.appendChild(temp);
    element.remove();
  }
}

let testimonialController = new Testimonials(cards, mobileTogle);

testimonialController.setActiveCard();

mobileTogle.forEach((toggler) => {
  toggler.addEventListener("click", () => {
    testimonialController.handleToggleClick(parseInt(toggler.id));
  });
});

window.setInterval(() => {
  testimonialController.handleInterval();
}, 15000);
