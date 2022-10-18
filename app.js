/*service worker registration */
function loadServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./serviceWorker.js");
    });
  }
}
/* api call by adding script Dorar to the <head> */
function createScript(key) {
  const apiURL = `https://dorar.net/dorar_api.json?skey=${key}&callback=hadithFetch2`;
  let scriptElement = document.createElement("script");
  scriptElement.setAttribute("src", apiURL);
  scriptElement.setAttribute("id", "jsonp");
  const oldScriptElement = document.getElementById("jsonp");
  const head = document.getElementsByTagName("head")[0];

  if (!oldScriptElement) {
    //if there is no script element in <head> then create new one
    head.appendChild(scriptElement);
  } else {
    head.replaceChild(scriptElement, oldScriptElement);
  }
}
const hadithFetch2 = async (data) => {
  let dorar = document.getElementById("dorar");
  let loader = document.getElementById("loader");
  const t = await data?.ahadith?.result;
  if (t) {
    loader.className = "loader-hide";
    dorar.innerHTML = t.toString();
  } else {
    dorar.innerHTML = "";
    loader.className = "center";
  }
};
window.onload = () => {
  /* Loading serviceWorker */
  loadServiceWorker();
  /* focus cursor on search input on load */
  const input = document.getElementById("skey");
  const bsearch = document.getElementById("bsearch");
  input.focus();
  /* script to assign "enter" key press to bsearch button */
  // Execute a function when the user presses a key on the keyboard
  input.addEventListener("keypress", function (event) {
    /* If the user presses the "Enter" key on the keyboard */
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      bsearch.click();
    }
  });
  /* lateral menu open on click */
  const navTrigger = document.getElementById("navigation-button");
  const body = document.getElementsByTagName("body")[0];
  navTrigger.addEventListener("click", toggleNavigation);
  function toggleNavigation(event) {
    event.preventDefault();
    body.classList.toggle("nav-open");
  }

  /* append Dorar script on <head> */
  bsearch.addEventListener("click", (e) => {
    e.preventDefault();
    createScript(input.value);
    hadithFetch2();
  });
};
