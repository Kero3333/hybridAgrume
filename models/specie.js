const db = require("./knexClient.js");

/**
 * Va chercher l'ensemble des espèces
 * @async
 * @returns {Array<Object>} Les espèces.
 */
const findAll = async () => {
  const species = await db.from("species").select("*");
  return species;
};

/**
 * Va chercher l'espèce correspondant à l'id donner
 * @async
 * @param {number} id - L'id recherché.
 * @returns {Array<Object>} Une espèce.
 */
const findOne = async (id) => {
  const specie = await db.from("species").select("*").where({ id });
  return specie;
};

/**
 * Insère une nouvelle espèce dans la db
 * @async
 * @param {SpeciePayload} payload - le payload à insérer.
 */
const insert = async (payload) => {
  await db.from("species").insert(payload);
};

/**
 * Supprimer une espèce dans la db
 * @async
 * @param {number} id - L'id de l'espèce à supprimer.
 */
const destroy = async (id) => {
  await db.from("species").where({ id }).del();
};

/**
 * Met à jour une espèce (toutes les informations doivent être fournies)
 * @param {number} id - l'id de l'espèce à modifier.
 * @param {SpeciePayload} payload - le payload de l'espèce à modifier.
 */
const update = async (id, payload) => {
  await db.from("species").update(payload).where({ id });
};

module.exports = { findAll, findOne, insert, destroy, update };
