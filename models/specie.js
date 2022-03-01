const knex = require("./knexClient.js");

/**
 * Va chercher l'ensemble des espèces
 * @async
 * @returns {Array<Object>} Les espèces.
 */
const findAll = async () => {
  const species = await knex.from("species").select("*");
  return species;
};

/**
 * Va chercher l'espèce correspondant à l'id donner
 * @async
 * @param {number} id - L'id recherché.
 * @returns {Array<Object>} Une espèce.
 */
const findOne = async (id) => {
  const specie = await knex.from("species").select("*").where({ id });
  return specie;
};

/**
 * Insère une nouvelle espèce dans la knex
 * @async
 * @param {SpeciePayload} payload - le payload à insérer.
 */
const insert = async (payload) => {
  await knex.from("species").insert(payload);
};

/**
 * Supprimer une espèce dans la knex
 * @async
 * @param {number} id - L'id de l'espèce à supprimer.
 */
const destroy = async (id) => {
  await knex.from("species").where({ id }).del();
};

/**
 * Met à jour une espèce (toutes les informations doivent être fournies)
 * @param {number} id - l'id de l'espèce à modifier.
 * @param {SpeciePayload} payload - le payload de l'espèce à modifier.
 */
const update = async (id, payload) => {
  await knex.from("species").update(payload).where({ id });
};

module.exports = { findAll, findOne, insert, destroy, update };
