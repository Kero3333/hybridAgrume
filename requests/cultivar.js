const db = require("../models/connect");

/**
 * Va chercher l'ensemble des cultivars ainsi que les espèces associés
 * @async
 * @returns {Array<Object>} Les cultivars ainsi que les espèces.
 */
const findAll = async () => {
  const cultivars = await db
    .from("cultivar")
    .select(
      "cultivar.id",
      "cultivar.name",
      "specie.id as specie_id",
      "specie.specie_name",
      "specie.family_name"
    )
    .as("xx")
    .join("specie", { "specie.id": "cultivar.id_specie" });
  return cultivars;
};

module.exports = { findAll };
