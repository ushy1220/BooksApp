const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

// JEST TO FUNKCJA POMOCNICZA, KTÓRA MA ZA ZADANIE GENEROWAĆ ELEMENTY DOM NA PODSTAWIE KODU HTML