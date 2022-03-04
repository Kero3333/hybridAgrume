const router = require("express").Router();
const specie = require("../models/specie");

const validateSpecie = require("../utilities/schemaSpecie");

router.get("", async (req, res) => {
  const species = await specie.findAll();
  res.json(species);
});

router.get("/:id", async (req, res) => {
  if (!parseInt(req.params.id)) {
    res.status(400).send("id must be a number");
  }
  const oneSpecie = await specie.findOne(req.params.id);
  if (!oneSpecie[0]) {
    return res.status(404).send("not found");
  }
  res.json(oneSpecie);
});

router.post("", async (req, res) => {
  const { error } = validateSpecie(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newSpecie = await specie.insert(req.body);
  res.status(201).json(newSpecie[0]);
});

router.put("/:id", async (req, res) => {
  if (!parseInt(req.params.id)) {
    res.status(400).send("id must be a number");
  }
  const { error } = validateSpecie(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { id } = req.params;
  const updated = await specie.update(id, req.body);
  if (!updated[0]) {
    return res.status(404).send("not found");
  }
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  if (!parseInt(req.params.id)) {
    res.status(400).send("id must be a number");
  }
  const { id } = req.params;
  const destroyed = await specie.destroy(id);
  if (!destroyed[0]) {
    return res.status(404).send("not found");
  }
  res.status(204).json(destroyed[0]);
});

router.get("/filter/family/:name", async (req, res) => {
  const { name } = req.params;
  const species = await specie.findByFamily(name);
  res.json(species);
});
module.exports = router;
