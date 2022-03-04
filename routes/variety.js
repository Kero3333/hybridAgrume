const router = require("express").Router();

const variety = require("../models/variety");

const validateVariety = require("../utilities/schemaVariety");
const validateScore = require("../utilities/schemaScore");

router.get("", async (req, res) => {
  const varieties = await variety.findAll();
  res.json(varieties);
});

router.get("/:id", async (req, res) => {
  if (!parseInt(req.params.id)) {
    res.status(400).send("id must be a number");
  }
  const oneVariety = await variety.findOne(req.params.id);
  if (!oneVariety[0]) {
    return res.status(404).send("not found");
  }
  res.json(oneVariety);
});

router.post("", async (req, res) => {
  const { error } = validateVariety(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newVariety = await variety.insert(req.body);
  res.status(201).json(newVariety[0]);
});

router.put("/:id", async (req, res) => {
  if (!parseInt(req.params.id)) {
    res.status(400).send("id must be a number");
  }
  const { error } = validateVariety(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { id } = req.params;
  const updated = await variety.update(id, req.body);
  if (!updated[0]) {
    return res.status(404).send("not found");
  }
  res.json(updated[0]);
});

router.delete("/:id", async (req, res) => {
  if (!parseInt(req.params.id)) {
    res.status(400).send("id must be a number");
  }
  const { id } = req.params;
  const destroyed = await variety.destroy(id);
  if (!destroyed[0]) {
    return res.status(404).send("not found");
  }
  res.status(204).json();
});

router.post("/filter/scores", async (req, res) => {
  const { error } = validateScore(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const varieties = await variety.findBetween(req.body);
  res.json(varieties);
});

router.get("/filter/species/:name", async (req, res) => {
  const { name } = req.params;
  const varieties = await variety.findBySpecies(name);
  res.json(varieties);
});

module.exports = router;
