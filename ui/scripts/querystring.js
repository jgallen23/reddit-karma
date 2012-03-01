function parseQueryString(uri) {
  var urlQueryString = {};
  uri = uri || window.location.search;

  var e,
    a = /\+/g,  // Regex for replacing addition symbol with a space
    r = /([^?&;=]+)=?([^?&;]*)/g,
    d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
    q = uri.substring(1);

  while (e = r.exec(q)) urlQueryString[d(e[1])] = d(e[2]);

  return urlQueryString;
}
