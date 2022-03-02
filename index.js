const variety = require("./models/variety.js");
const specie = require("./models/specie.js");

variety.findAll().then(console.log);
// specie.findAll().then(console.table);

// variety.findOne(1).then(console.table);
// specie.findOne(1).then(console.table);

// const newCultivar = {
//   cultivar: "test",
//   bitterness: 2,
//   juiciness: 3,
//   species_id: 2,
// };

// variety.insert(newCultivar).then(console.table);
// variety.destroy(32);

// const newSpecie = {
//   scientific_name: "test",
//   common_name: "bob",
//   family: "orange",
// };

// specie.insert(newSpecie);

// specie.destroy(16);

// variety.findOne(1).then(console.table);
// const updateCultivar = {
//   cultivar: "Osbeck",
//   bitterness: 4,
//   juiciness: 5,
//   species_id: 1,
// };
// variety.update(1, updateCultivar).then(() => {
//   variety.findOne(1).then(console.table);
// });

// specie.findOne(1).then(console.table);
// const updateSpecie = {
//   scientific_name: "Citrus sinensis L.",
//   common_name: "orange douce",
//   family: "orange",
// };
// specie.update(1, updateSpecie).then(() => {
//   specie.findOne(1).then(console.table);
// });

// variety.findByMinJuiciness(3).then(console.table);
// variety.findByMaxJuiciness(2).then(console.table);
// variety.findByMinBitterness(3).then(console.table);
//variety.findByMaxBitterness(2).then(console.table);

// specie.findByFamily("citr").then(console.table);
// variety.findBySpecies("citr").then(console.table);

// const criteria = {
//   juiciness: { max: 2 },
//   bitterness: { min: 4 },
// };

// variety.findBetween(criteria).then(console.table);
