/*service worker registration */
function loadServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("./serviceWorker.js")
        .then((res) => console.log("service worker registered"))
        .catch((err) => console.log("service worker not registered", err));
    });
  }
}
const test = () => {
window.onload = () => {
  /* Loading serviceWorker */
  //loadServiceWorker();
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
};
