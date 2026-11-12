(function () {
  var path = String(location.pathname || "").replace(/\\/g, "/");
  var target = path.indexOf("/dist/") !== -1
    ? "../../../lessons/recombinant/index.html"
    : "../../lessons/recombinant/index.html";
  location.replace(target);
})();
