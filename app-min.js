function createScript(e) {
  let t = `https://dorar.net/dorar_api.json?skey=${e}&callback=hadithFetch2`,
    a = document.createElement("script");
  a.setAttribute("src", t), a.setAttribute("id", "jsonp");
  let n = document.getElementById("jsonp"),
    r = document.getElementsByTagName("head")[0];
  n ? r.replaceChild(a, n) : r.appendChild(a);
}
const hadithFetch2 = async (e) => {
    let t = document.getElementById("dorar"),
      a = document.getElementById("loader"),
      n = await e?.ahadith?.result;
    n && t && a
      ? ((a.className = "loader-hide"), (t.innerHTML = n))
      : ((t.innerHTML = ""), (a.className = "center"));
  },
  searchQ = () => {
    let e = window.location.search,
      t = new URLSearchParams(e),
      a = t.get("search");
    a?.length > 0 && (createScript(a), hadithFetch2());
  };
window.onload = () => {
  let e = document.getElementById("skey"),
    t = document.getElementById("bsearch"),
    a = document.getElementById("navigation-button"),
    n = document.getElementsByTagName("body")[0];
  function r(e) {
    e.preventDefault(),
      n.classList.toggle("nav-open"),
      a.toggleAttribute("aria-expanded");
  }
  e.focus(),
    e.addEventListener("keypress", function (e) {
      "Enter" === e.key && (e.preventDefault(), t.click());
    }),
    a.addEventListener("click", r),
    t.addEventListener("click", (t) => {
      t.preventDefault(), createScript(e.value), hadithFetch2();
    }),
    searchQ();
};
