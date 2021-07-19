//// Header Start
const navBtn = document.querySelector(".header__hamburger");
const navMenu = document.querySelector(".header__navbar");
const header = document.querySelector(".header");
const main = document.querySelector(".main");

// toggle button for mobiel menu
navBtn.addEventListener("click", () => {
  toggleActive();
  ariaLabel();
});

// close mobile menu if resized to large screen
window.onresize = () => {
  if (window.document.body.clientWidth > 768) {
    removeActive();
    ariaLabel();
  }
};

// window.addEventListener("resize", reportWindowSize);
// function reportWindowSize() {
//   console.log(window.document.body.clientWidth);
// }

// close mobile menu on scroll down
window.onscroll = e => {
  if (window.pageYOffset > 500) {
    removeActive();
    ariaLabel();
  }
};

// remove mobile menu by clicking on main section
main.addEventListener("click", () => {
  if (checkActive()) {
    removeActive();
    ariaLabel();
  }
});

// add aria label for screen readers
const ariaLabel = () => {
  navBtn.classList.contains("active")
    ? navBtn.setAttribute("aria-expanded", "true")
    : navBtn.setAttribute("aria-expanded", "false");
};

// toggle active class
const toggleActive = () => {
  navBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
  header.classList.toggle("active");
  // main.classList.toggle("active");
};

// check for active class
const checkActive = () => {
  return (
    navBtn.classList.contains("active") &&
    navMenu.classList.contains("active") &&
    header.classList.contains("active")
    // main.classList.contains("active")
  );
};

// remove active class
const removeActive = () => {
  if (checkActive()) toggleActive();
};

//// Header End
////
//// Modal Start

// darken the whole document

const screen = document.querySelector(".screen");
const modals = document.querySelector(".modal__select");
const successMsg = document.querySelector(".success");

const darkenScreen = () => {
  screen.style.height = `${window.document.body.clientHeight}px`;
};

// lighten the whol screen
const lightenScreen = () => {
  screen.style.height = "0px";
};

// scroll to top (almost)
const scrollToPosition = position => {
  window.scroll({
    top: position,
    left: 0,
    behavior: "smooth",
  });
};

// open modal menu
const selectRewardBtn = document.querySelectorAll(".pledge__one__cta button");
const backProjectBtn = document.querySelector("#back-project-btn");
const radioBamboo = document.querySelector("#pledge-select-bamboo");
const radioBlack = document.querySelector("#pledge-select-black");

selectRewardBtn.forEach(element => {
  element.addEventListener("click", function(e) {
    if (e.target.id === "bambooPledgeBtn" || e.target.id === "blackPledgeBtn") {
      // console.log(modals);
      removeActive();
      darkenScreen();
      modals.classList.toggle("hidden");
    }
    if (e.target.id === "bambooPledgeBtn") {
      scrollToPosition(200);
      radioBamboo.checked = true;
      closeMods();
      document
        .querySelector("#pledge-select-bamboo-mod")
        .classList.toggle("hidden");
    }
    if (e.target.id === "blackPledgeBtn") {
      scrollToPosition(200);
      radioBlack.checked = true;
      closeMods();
      document
        .querySelector("#pledge-select-black-mod")
        .classList.toggle("hidden");
    }
  });
});

backProjectBtn.addEventListener("click", () => {
  removeActive();
  darkenScreen();
  modals.classList.toggle("hidden");
  closeMods();
  scrollToPosition(100);
  radioBtn.forEach(el => (el.checked = false));
});

// select modal depending on button pressed

// close modal menu
const closeModalBtn = document.querySelector("#close-modal");

closeModalBtn.addEventListener("click", () => {
  lightenScreen();
  modals.classList.toggle("hidden");
});

// select modal pledge

const radioBtn = document.querySelectorAll(
  ".modal__select__pledge__title__radio"
);
const pledgeSet = document.querySelectorAll(".modal__select__pledge__enter");
const pledges = document.querySelectorAll(".modal__select__pledge");

// open amend a pledge mod in modals when clicked
const openMod = target => {
  const thisMod = document.querySelector(`#${target}-mod`);
  thisMod.classList.toggle("hidden");
};

// close all amend pledges mod
const closeMods = () => {
  document.querySelector("#pledge-select-no-mod").classList.add("hidden");
  document.querySelector("#pledge-select-bamboo-mod").classList.add("hidden");
  document.querySelector("#pledge-select-black-mod").classList.add("hidden");
};

radioBtn.forEach(el => {
  el.addEventListener("click", e => {
    // console.log(e.target.id);
    closeMods();
    openMod(e.target.id);
  });
});

// update stats fake database and forms

const data = {
  moneyMax: 100000,
  moneyPledged: 89914,
  totalBackers: 5007,
  daysLeft: 56,
};

const barCompleted = document.querySelector(".stats__bar__completed");
const moneyPledged = document.querySelector("#moneyPledged");
const totalBackers = document.querySelector("#totalBackers");

const updateBarAndStats = () => {
  const money = data.moneyPledged.toLocaleString();
  barCompleted.style.width = `${data.moneyPledged / 1000}%`;
  moneyPledged.innerHTML = `\$${money}<span class="stats__nums__title__sub">of $100,000 backed</span>`;
  totalBackers.innerHTML = `${data.totalBackers.toLocaleString()}<span class="stats__nums__title__sub">total backers</span>`;
};

const pledgeBtnNo = document.querySelector("#pledge-btn-no");
const pledgeBtnBamboo = document.querySelector("#pledge-btn-bamboo");
const pledgeBtnBlack = document.querySelector("#pledge-btn-black");

const inputBamboo = document.querySelector("#pledge-input-bamboo");
const inputBlack = document.querySelector("#pledge-input-black");

pledgeBtnNo.addEventListener("click", e => {
  e.preventDefault();
  data.totalBackers += 1;
  tidyUp();
});

pledgeBtnBamboo.addEventListener("click", e => {
  e.preventDefault();
  data.totalBackers += 1;
  updateBambooLeft();
  if (data.moneyPledged + parseInt(inputBamboo.value) >= 100000) {
    data.moneyPledged = 100000;
  } else {
    data.moneyPledged += parseInt(inputBamboo.value);
  }
  tidyUp();
});

pledgeBtnBlack.addEventListener("click", e => {
  e.preventDefault();
  data.totalBackers += 1;
  updateBlackLeft();
  if (data.moneyPledged + parseInt(inputBlack.value) >= 100000) {
    data.moneyPledged = 100000;
  } else {
    data.moneyPledged += parseInt(inputBlack.value);
  }
  tidyUp();
});

// add

// tidy up after clicking on pledge button continue before showing success message
const tidyUp = () => {
  updateBarAndStats();
  closeMods();
  radioBtn.forEach(el => (el.checked = false));
  modals.classList.toggle("hidden");
  successMsg.classList.toggle("hidden");
  scrollToPosition(100);
};

// success message
const successBtn = document.querySelector("#success-btn");
successBtn.addEventListener("click", () => {
  successMsg.classList.toggle("hidden");
  lightenScreen();
});

// update left numbers
const bambooLeftTop = document.querySelector(".bamboo-left-top");
const bambooLeftDesktop = document.querySelector(".bamboo-left-desktop");
const bambooLeftMobile = document.querySelector(".bamboo-left-mobile");
const blackLeftTop = document.querySelector(".black-left-top");
const blackLeftDesktop = document.querySelector(".black-left-desktop");
const blackLeftMobile = document.querySelector(".black-left-mobile");

const updateBambooLeft = () => {
  const left = parseInt(bambooLeftTop.innerText) - 1;
  bambooLeftTop.innerHTML = `${left} <span class="pledge__one__cta__left__sub">left</span>`;
  bambooLeftDesktop.innerHTML = `${left} <span class="modal__select__pledge__left__desktop__sub">left</span>`;
  bambooLeftMobile.innerHTML = `${left} <span class="modal__select__pledge__left__mobile__sub">left</span>`;
};

const updateBlackLeft = () => {
  const left = parseInt(blackLeftTop.innerText) - 1;
  blackLeftTop.innerHTML = `${left} <span class="pledge__one__cta__left__sub">left</span>`;
  blackLeftDesktop.innerHTML = `${left} <span class="modal__select__pledge__left__desktop__sub">left</span>`;
  blackLeftMobile.innerHTML = `${left} <span class="modal__select__pledge__left__mobile__sub">left</span>`;
};

//// Modal Ends
