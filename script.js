const hamburgerBtn = document.querySelector(".header__hamburger");
const toggleBg = document.querySelector(".header__toggle-bg");
const toggleNav = document.querySelector(".header__toggle-box");

hamburgerBtn.addEventListener("click", () => {
  console.log("i went off");
  if (hamburgerBtn.classList.contains("header__hamburger--active")) {
    hamburgerBtn.classList.remove("header__hamburger--active");

    toggleBg.classList.remove("fade-in");
    toggleBg.classList.add("fade-out");

    toggleNav.classList.remove("fade-in");
    toggleNav.classList.add("fade-out");
  } else {
    hamburgerBtn.classList.add("header__hamburger--active");

    toggleBg.classList.remove("fade-out");
    toggleBg.classList.add("fade-in");

    toggleNav.classList.remove("fade-out");
    toggleNav.classList.add("fade-in");
  }
});
