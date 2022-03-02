const { expect } = require("@jest/globals");
const knex = require("./models/knexClient");

const variety = require("./models/variety");

let findAllOutput = [
  {
    cultivar: "Citrus sinensis L. Moro",
    specie_id: 1,
    common_name: "orange douce",
    family: "orange",
  },
  {
    cultivar: "Citrus sinensis L. Sanguinello",
    specie_id: 1,
    common_name: "orange douce",
    family: "orange",
  },
  {
    cultivar: "Citrus aurantium L. Hook",
    specie_id: 2,
    common_name: "orange amère",
    family: "orange",
  },
  {
    cultivar: "Citrus maxima Honey",
    specie_id: 3,
    common_name: "pamplemousse",
    family: "pamplemousse",
  },
  {
    cultivar: "Citrus maxima Sweetie",
    specie_id: 3,
    common_name: "pamplemousse",
    family: "pamplemousse",
  },
  {
    cultivar: "Citrus maxima Chandler",
    specie_id: 3,
    common_name: "pamplemousse",
    family: "pamplemousse",
  },
  {
    cultivar: "Citrus x paradisi Oro blanco",
    specie_id: 4,
    common_name: "pomelo",
    family: "pamplemousse",
  },
  {
    cultivar: "Citrus x paradisi Rio star",
    specie_id: 4,
    common_name: "pomelo",
    family: "pamplemousse",
  },
  {
    cultivar: "Citrus x tangelo Seminole",
    specie_id: 5,
    common_name: "tangelo",
    family: "pamplemousse",
  },
  {
    cultivar: "Citrus x limon Bonnie Brae",
    specie_id: 6,
    common_name: "citron jaune",
    family: "citron",
  },
  {
    cultivar: "Citrus x limon Eureka",
    specie_id: 6,
    common_name: "citron jaune",
    family: "citron",
  },
  {
    cultivar: "Citrus medica L. Etrog",
    specie_id: 7,
    common_name: "cédrat",
    family: "citron",
  },
  {
    cultivar: "Citrus medica L. Sarcodactylis",
    specie_id: 7,
    common_name: "cédrat",
    family: "citron",
  },
  {
    cultivar: "Citrus hystrix Westeri",
    specie_id: 8,
    common_name: "combava",
    family: "citron",
  },
  {
    cultivar: "Citrus aurantiifolia sur Macrophylla",
    specie_id: 9,
    common_name: "citron vert",
    family: "citron",
  },
  {
    cultivar: "Citrus bergamia Bergamia",
    specie_id: 10,
    common_name: "bergamote",
    family: "citron",
  },
  {
    cultivar: "Citrus x clementina Algérienne",
    specie_id: 11,
    common_name: "clémentine",
    family: "clémentine",
  },
  {
    cultivar: "Citrus x clementina Clémenvilla",
    specie_id: 11,
    common_name: "clémentine",
    family: "clémentine",
  },
  {
    cultivar: "Citrus x clementina Clémenule",
    specie_id: 11,
    common_name: "clémentine",
    family: "clémentine",
  },
  {
    cultivar: "Citrus reticulata Deliciosa",
    specie_id: 12,
    common_name: "mandarine",
    family: "mandarine",
  },
  {
    cultivar: "Citrus reticulata Tachibana",
    specie_id: 12,
    common_name: "mandarine",
    family: "mandarine",
  },
  {
    cultivar: "Citrus reticulata Ponkan",
    specie_id: 12,
    common_name: "mandarine",
    family: "mandarine",
  },
  {
    cultivar: "Citrus x tangerina Tanger",
    specie_id: 13,
    common_name: "tangerine",
    family: "mandarine",
  },
  {
    cultivar: "Citrus x tangerina Moragne",
    specie_id: 13,
    common_name: "tangerine",
    family: "mandarine",
  },
  {
    cultivar: "Citrus x tangerina Dancy",
    specie_id: 13,
    common_name: "tangerine",
    family: "mandarine",
  },
  {
    cultivar: "Citrus japonica Marumi",
    specie_id: 14,
    common_name: "kumquat",
    family: "kumquat",
  },
  {
    cultivar: "Citrus japonica Meiwa",
    specie_id: 14,
    common_name: "kumquat",
    family: "kumquat",
  },
  {
    cultivar: "Citrus japonica Swinglei",
    specie_id: 14,
    common_name: "kumquat",
    family: "kumquat",
  },
  {
    cultivar: "Citrus x floridana Eustis",
    specie_id: 15,
    common_name: "limequat",
    family: "kumquat",
  },
  {
    cultivar: "Citrus x floridana Margarita",
    specie_id: 15,
    common_name: "limequat",
    family: "kumquat",
  },
  {
    cultivar: "Citrus sinensis L. Osbeck",
    specie_id: 1,
    common_name: "orange douce",
    family: "orange",
  },
];

test("findAll test", () => {
  return expect(variety.findAll()).resolves.toEqual(findAllOutput);
});

const findOneOutput = [
  {
    id: 1,
    cultivar: "Citrus sinensis L. Osbeck",
    bitterness: 4,
    juiciness: 5,
    species_id: 1,
  },
];
test("findOne test", () => {
  return expect(variety.findOne(1)).resolves.toEqual(findOneOutput);
});

test("insert test", async () => {
  return expect(
    variety.insert({
      cultivar: "test",
      bitterness: 2,
      juiciness: 3,
      species_id: 2,
    })
  ).resolves.not.toBeUndefined();
});

test("destroy test", async () => {
  findAllOutput = await variety.findAll();
  const nbLine = findAllOutput.length;
  const {
    rows: [{ id }],
  } = await knex.raw("SELECT id FROM variety ORDER BY id DESC LIMIT 1");
  await variety.destroy(id);
  findAllOutput = await variety.findAll();
  const nbLineAfter = findAllOutput.length;
  expect(nbLineAfter).toBe(nbLine - 1);
});

test("update test", async () => {
  const beforeUpdate = await variety.findOne(1);

  variety.update({ cultivar: "Osbeck" }).then(async () => {
    const afterUpdate = await variety.findOne(1);
    expect(beforeUpdate).not.toEqual(afterUpdate);
  });
});
