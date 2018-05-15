// TODO: Remove thead
const cheerio = require('cheerio');
const axios = require('axios');

const url =
  'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_spacecraft_in_the_Culture_series&prop=text&format=json&formatversion=2';

const fetch = url =>
  new Promise((resolve, reject) => {
    return axios.get(url).then(response => resolve(response.data));
  });

function getShips(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then(html => {
      const $ = cheerio.load(html.parse.text);
      const ships = $('.wikitable.sortable')
        .toArray()
        .map(table => {
          return $(table)
            .find('tr')
            .toArray()
            .map(row => {
              const cells = $('td', row);

              return {
                civ: $(cells[0]).text(),
                type: $(cells[1]).text(),
                name: $(cells[2]).text(),
                class: $(cells[3]).text(),
                note: $(cells[4]).text(),
              };
            });
        });
      resolve(ships);
    });
  });
}

Promise.resolve(getShips(url)).then(ships => {
  console.log(ships);
});

// module.exports = getShips;
