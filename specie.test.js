const { expect } = require("@jest/globals");
const knex = require("./models/knexClient");

const specie = require("./models/specie");

let findAllOutput = [
  {
    id: 2,
    scientific_name: "Citrus aurantium L.",
    common_name: "orange amère",
    family: "orange",
  },
  {
    id: 3,
    scientific_name: "Citrus maxima",
    common_name: "pamplemousse",
    family: "pamplemousse",
  },
  {
    id: 4,
    scientific_name: "Citrus x paradisi",
    common_name: "pomelo",
    family: "pamplemousse",
  },
  {
    id: 5,
    scientific_name: "Citrus x tangelo",
    common_name: "tangelo",
    family: "pamplemousse",
  },
  {
    id: 6,
    scientific_name: "Citrus x limon",
    common_name: "citron jaune",
    family: "citron",
  },
  {
    id: 7,
    scientific_name: "Citrus medica L.",
    common_name: "cédrat",
    family: "citron",
  },
  {
    id: 8,
    scientific_name: "Citrus hystrix",
    common_name: "combava",
    family: "citron",
  },
  {
    id: 9,
    scientific_name: "Citrus aurantiifolia",
    common_name: "citron vert",
    family: "citron",
  },
  {
    id: 10,
    scientific_name: "Citrus bergamia",
    common_name: "bergamote",
    family: "citron",
  },
  {
    id: 11,
    scientific_name: "Citrus x clementina",
    common_name: "clémentine",
    family: "clémentine",
  },
  {
    id: 12,
    scientific_name: "Citrus reticulata",
    common_name: "mandarine",
    family: "mandarine",
  },
  {
    id: 13,
    scientific_name: "Citrus x tangerina",
    common_name: "tangerine",
    family: "mandarine",
  },
  {
    id: 14,
    scientific_name: "Citrus japonica",
    common_name: "kumquat",
    family: "kumquat",
  },
  {
    id: 15,
    scientific_name: "Citrus x floridana",
    common_name: "limequat",
    family: "kumquat",
  },
  {
    id: 1,
    scientific_name: "Citrus sinensis L.",
    common_name: "orange douce",
    family: "orange",
  },
];

test("findAll test", () => {
  return expect(specie.findAll()).resolves.toEqual(findAllOutput);
});

const findOneOutput = [
  {
    id: 1,
    scientific_name: "Citrus sinensis L.",
    common_name: "orange douce",
    family: "orange",
  },
];
test("findOne test", () => {
  return expect(specie.findOne(1)).resolves.toEqual(findOneOutput);
});

test("insert test", async () => {
  const nbLine = findAllOutput.length;
  await specie.insert({
    scientific_name: "testScient",
    common_name: "testCommon",
    family: "orange",
  });
  findAllOutput = await specie.findAll();
  const nbLineAfter = findAllOutput.length;
  expect(nbLineAfter).toBe(nbLine + 1);
});

test("destroy test", async () => {
  const nbLine = findAllOutput.length;
  const {
    rows: [{ id }],
  } = await knex.raw("SELECT id FROM species ORDER BY id DESC LIMIT 1");
  await specie.destroy(id);
  findAllOutput = await specie.findAll();
  const nbLineAfter = findAllOutput.length;
  expect(nbLineAfter).toBe(nbLine - 1);
});

test("update test", async () => {
  const beforeUpdate = await specie.findOne(1);

  specie.update({ family: "citron" }).then(async () => {
    const afterUpdate = await specie.findOne(1);
    expect(beforeUpdate).not.toEqual(afterUpdate);
  });
});
