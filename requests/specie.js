const db = require("../models/connect.js");

/**
 * Va chercher l'ensemble des espèces
 * @async
 * @returns {Array<Object>} Les espèces.
 */
const findAll = async () => {
  const species = await db.from("specie").select("*");
  return species;
};

module.exports = { findAll };
