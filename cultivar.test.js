const { expect } = require("@jest/globals");
const knex = require("./models/knexClient");

const cultivar = require("./models/cultivar");

let findAllOutput = [
  {
    id: 2,
    cultivar: "Moro",
    specie_id: 1,
    common_name: "orange douce",
    family: "orange",
  },
  {
    id: 3,
    cultivar: "Sanguinello",
    specie_id: 1,
    common_name: "orange douce",
    family: "orange",
  },
  {
    id: 4,
    cultivar: "Hook",
    specie_id: 2,
    common_name: "orange amère",
    family: "orange",
  },
  {
    id: 5,
    cultivar: "Honey",
    specie_id: 3,
    common_name: "pamplemousse",
    family: "pamplemousse",
  },
  {
    id: 6,
    cultivar: "Sweetie",
    specie_id: 3,
    common_name: "pamplemousse",
    family: "pamplemousse",
  },
  {
    id: 7,
    cultivar: "Chandler",
    specie_id: 3,
    common_name: "pamplemousse",
    family: "pamplemousse",
  },
  {
    id: 8,
    cultivar: "Oro blanco",
    specie_id: 4,
    common_name: "pomelo",
    family: "pamplemousse",
  },
  {
    id: 9,
    cultivar: "Rio star",
    specie_id: 4,
    common_name: "pomelo",
    family: "pamplemousse",
  },
  {
    id: 10,
    cultivar: "Seminole",
    specie_id: 5,
    common_name: "tangelo",
    family: "pamplemousse",
  },
  {
    id: 11,
    cultivar: "Bonnie Brae",
    specie_id: 6,
    common_name: "citron jaune",
    family: "citron",
  },
  {
    id: 12,
    cultivar: "Eureka",
    specie_id: 6,
    common_name: "citron jaune",
    family: "citron",
  },
  {
    id: 13,
    cultivar: "Etrog",
    specie_id: 7,
    common_name: "cédrat",
    family: "citron",
  },
  {
    id: 14,
    cultivar: "Sarcodactylis",
    specie_id: 7,
    common_name: "cédrat",
    family: "citron",
  },
  {
    id: 15,
    cultivar: "Westeri",
    specie_id: 8,
    common_name: "combava",
    family: "citron",
  },
  {
    id: 16,
    cultivar: "sur Macrophylla",
    specie_id: 9,
    common_name: "citron vert",
    family: "citron",
  },
  {
    id: 17,
    cultivar: "Bergamia",
    specie_id: 10,
    common_name: "bergamote",
    family: "citron",
  },
  {
    id: 18,
    cultivar: "Algérienne",
    specie_id: 11,
    common_name: "clémentine",
    family: "clémentine",
  },
  {
    id: 19,
    cultivar: "Clémenvilla",
    specie_id: 11,
    common_name: "clémentine",
    family: "clémentine",
  },
  {
    id: 20,
    cultivar: "Clémenule",
    specie_id: 11,
    common_name: "clémentine",
    family: "clémentine",
  },
  {
    id: 21,
    cultivar: "Deliciosa",
    specie_id: 12,
    common_name: "mandarine",
    family: "mandarine",
  },
  {
    id: 22,
    cultivar: "Tachibana",
    specie_id: 12,
    common_name: "mandarine",
    family: "mandarine",
  },
  {
    id: 23,
    cultivar: "Ponkan",
    specie_id: 12,
    common_name: "mandarine",
    family: "mandarine",
  },
  {
    id: 24,
    cultivar: "Tanger",
    specie_id: 13,
    common_name: "tangerine",
    family: "mandarine",
  },
  {
    id: 25,
    cultivar: "Moragne",
    specie_id: 13,
    common_name: "tangerine",
    family: "mandarine",
  },
  {
    id: 26,
    cultivar: "Dancy",
    specie_id: 13,
    common_name: "tangerine",
    family: "mandarine",
  },
  {
    id: 27,
    cultivar: "Marumi",
    specie_id: 14,
    common_name: "kumquat",
    family: "kumquat",
  },
  {
    id: 28,
    cultivar: "Meiwa",
    specie_id: 14,
    common_name: "kumquat",
    family: "kumquat",
  },
  {
    id: 29,
    cultivar: "Swinglei",
    specie_id: 14,
    common_name: "kumquat",
    family: "kumquat",
  },
  {
    id: 30,
    cultivar: "Eustis",
    specie_id: 15,
    common_name: "limequat",
    family: "kumquat",
  },
  {
    id: 31,
    cultivar: "Margarita",
    specie_id: 15,
    common_name: "limequat",
    family: "kumquat",
  },
  {
    id: 1,
    cultivar: "Osbeck",
    specie_id: 1,
    common_name: "orange douce",
    family: "orange",
  },
];
test("findAll test", () => {
  return expect(cultivar.findAll()).resolves.toEqual(findAllOutput);
});

const findOneOutput = [
  {
    id: 1,
    cultivar: "Osbeck",
    bitterness: 4,
    juiciness: 5,
    species_id: 1,
  },
];
test("findOne test", () => {
  return expect(cultivar.findOne(1)).resolves.toEqual(findOneOutput);
});

test("insert test", async () => {
  const nbLine = findAllOutput.length;
  await cultivar.insert({
    cultivar: "test",
    bitterness: 2,
    juiciness: 3,
    species_id: 2,
  });
  findAllOutput = await cultivar.findAll();
  const nbLineAfter = findAllOutput.length;
  expect(nbLineAfter).toBe(nbLine + 1);
});

test("destroy test", async () => {
  const nbLine = findAllOutput.length;
  const {
    rows: [{ id }],
  } = await knex.raw("SELECT id FROM variety ORDER BY id DESC LIMIT 1");
  await cultivar.destroy(id);
  findAllOutput = await cultivar.findAll();
  const nbLineAfter = findAllOutput.length;
  expect(nbLineAfter).toBe(nbLine - 1);
});

test("update test", async () => {
  const beforeUpdate = await cultivar.findOne(1);

  cultivar.update({ cultivar: "Osbeck" }).then(async () => {
    const afterUpdate = await cultivar.findOne(1);
    expect(beforeUpdate).not.toEqual(afterUpdate);
  });
});
