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

  //Desktop

  isOnScreen(element) {
    let distance = element.getBoundingClientRect();
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  updateContainer(element) {
    let temp = element.cloneNode(true);
    element.parentNode.appendChild(temp);
    element.remove();
  }

  animateLoop(container) {
    Array.from(container.children).forEach((child) => {
      child.addEventListener("animationend", function animationEnd() {
        console.log("i went off");
        child.classList.remove("move-left");
        // child.classList.removeEventListener("animationend", animationEnd);
      });
      child.classList.add("move-left");
    });
    //   elements.forEach((element) => {
    //     element.classList.add("move-left");
    //   });
    //   let temp = this;
    //   console.log(this);
    //   setTimeout(function () {
    //     console.log(temp);
    //     console.log("i went off");
    //     console.log(elements[0]);
    //     temp.updateContainer(elements[0]);
    //     elements.forEach((element) => {
    //       console.log(element);
    //     });
    //   }, 4800);
    // }
  }
}

let testimonialController = new Testimonials(cards, mobileTogle);

let test = document.querySelector("#test");

test.addEventListener("click", () => {
  cards.forEach((card) => {
    card.classList.toggle("move-left");
  });
});
// testimonialController.animateLoop(container);

testimonialController.setActiveCard();

mobileTogle.forEach((toggler) => {
  toggler.addEventListener("click", () => {
    testimonialController.handleToggleClick(parseInt(toggler.id));
  });
});

window.setInterval(() => {
  testimonialController.handleInterval();
}, 15000);

testimonialController.auto();

// initCards(cards) {
//   //check how many elements in cards array
//   let maxItems = cards.length;
//   //initialize new container
//   let emptyContainer;

//   if (this.initialContainer.length === 0) {
//     this.initialContainer.push([maxItems - 1, true]);
//     emptyContainer = true;
//   }

//   for (let i = 0; i < maxItems; i++) {
//     this.initialContainer.push([i, false]);
//   }

//   this.addCard(this.initialContainer, emptyContainer, cards);
// }

// addCard(initialCards, isEmpty = true, cards) {
//   for (let i = 0; i < initialCards.length - 1; i++) {
//     let newChild = cards[i].cloneNode(true);

//     if (initialCards[i][1]) {
//       cards[0].parentNode.insertBefore(
//         cards[cards.length - 1].cloneNode(true),
//         cards[0]
//       );
//     }

//     if (isEmpty) {
//       isEmpty = false;
//       return;
//     } else if (!initialCards[i][1]) cards[0].parentNode.appendChild(newChild);
//   }
// }

// moveCards(elements) {
//   for (let i = 0; i < elements.length; i++) {
//     console.log(elements[i]);
//     elements[i].classList.toggle("move-left");
//   }
// }

// arrangeCards(elements) {
//   console.log("zero", elements[0]);
//   elements[0].parentNode.appendChild(elements[1].cloneNode(true));
//   elements[0].parentNode.removeChild(elements[0]);
// }

// switchCards(elements) {
//   this.arrangeCards(elements);
//   this.moveCards(elements);
// }

// wait(ms = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// async go(cards, timeWaiting) {
//   await this.wait(timeWaiting / 2);
//   this.moveCards(cards);
//   await this.wait(timeWaiting);
//   this.switchCards(cards);
//   await this.wait(timeWaiting / 2);
// }

// auto() {
//   this.initCards(this.cards);
//   let temp = this;
//   setTimeout(
//     function carousel(cards) {
//       temp.go(cards, temp.delay * 0.9);

//       setTimeout(carousel, temp.delay, temp.cards, temp.delay);
//     },
//     1000,
//     temp.cards,
//     temp.delay
//   );
// }
