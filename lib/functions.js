////////////////////////////////////////////////////
// Global

// url parsed to toLowerCase
function urlParsed(url) {
  const urlParsed = url.toLowerCase().replace(/\s+/g, "-");

  return urlParsed;
}

function getBackUrl(urlParsed) {
  let url = urlParsed.replace(/-/g, " ");

  return `${url.charAt(0).toUpperCase()}${url.slice(1).toLowerCase()}`;
}

let functions = { urlParsed, getBackUrl };

module.exports = functions;
