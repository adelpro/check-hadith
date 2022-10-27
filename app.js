function createScript(e) {
  let t = `https://dorar.net/dorar_api.json?skey=${e}&callback=hadithFetch2`,
    a = document.createElement("script");
  a.setAttribute("src", t), a.setAttribute("id", "jsonp");
  let n = document.getElementById("jsonp"),
    r = document.getElementsByTagName("head")[0];
  n ? r.replaceChild(a, n) : r.appendChild(a);
}
const hadithFetch2 = async (data) => {
  let dorar = document.getElementById("dorar");
  let loader = document.getElementById("loader");
  const t = await data?.ahadith?.result;
  if (t && dorar && loader) {
    loader.className = "loader-hide";
    dorar.innerHTML = t;
  } else {
    dorar.innerHTML = "";
    loader.className = "center";
  }
};
/* Query search */
const searchQ = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get("search");
  if (search?.length > 0) {
    createScript(search);
    hadithFetch2();
  }
};
window.onload = () => {
  /* focus cursor on search input on load */
  let input = document.getElementById("skey");
  let bsearch = document.getElementById("bsearch");
  let navTrigger = document.getElementById("navigation-button");
  let body = document.getElementsByTagName("body")[0];
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
  /* Lateral menu open on click */
  function toggleNavigation(event) {
    event.preventDefault();
    body.classList.toggle("nav-open");
    navTrigger.toggleAttribute("aria-expanded");
  }
  navTrigger.addEventListener("click", toggleNavigation);

  /* Append Dorar script on <head> on bsearch click event*/
  bsearch.addEventListener("click", (e) => {
    e.preventDefault();
    createScript(input.value);
    hadithFetch2();
  });
  /* Executing search query */
  searchQ();
};
