const cultivar = require("./requests/cultivar.js");
const specie = require("./requests/specie.js");

cultivar.findAll().then(console.table);
specie.findAll().then(console.table);
