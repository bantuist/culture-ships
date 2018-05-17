// TODO: Remove thead
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url =
  'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_spacecraft_in_the_Culture_series&prop=text&format=json&formatversion=2';

function getShips(url) {
  return axios.get(url).then(response => {
    const $ = cheerio.load(response.data.parse.text);
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

    return ships;
  });
}

getShips(url).then(ships => {
  console.log(ships);
  // fs.writeFile('src/ships.json', JSON.stringify(ships), err => {
  //   if (err) throw err;
  //   console.log('Ships written to file.');
  // });
});

module.exports = getShips;
