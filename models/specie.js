const knex = require("./knexClient.js");

/**
 * Un objet JS représentant une espèce issu de la db
 * @typedef Specie
 * @property {number} id - l'id d'une espèce.
 * @property {string} scientific_name - le nom scientifique de l'espèce.
 * @property {number} common_name - le nom commun de l'espèce.
 * @property {number} family - la famille de l'espèce.
 */

/**
 * Un object JS représentant des données à insérer/mettre à jour dans la table species
 * @typedef SpeciePayload
 * @property {string} scientific_name - le nom scientifique de l'espèce.
 * @property {number} common_name - le nom commun de l'espèce.
 * @property {number} family - la famille de l'espèce.
 */

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
 * @returns {Array<Object>} L'id de l'espèce insérer.
 */
const insert = async (payload) => {
  return await knex.from("species").insert(payload, ["id"]);
};

/**
 * Supprimer une espèce dans la knex
 * @async
 * @param {number} id - L'id de l'espèce à supprimer.
 */
const destroy = async (id) => {
  return await knex.from("species").where({ id }).del(["id"]);
};

/**
 * Met à jour une espèce (toutes les informations doivent être fournies)
 * @param {number} id - l'id de l'espèce à modifier.
 * @param {SpeciePayload} payload - le payload de l'espèce à modifier.
 */
const update = async (id, payload) => {
  return await knex.from("species").update(payload, ["id"]).where({ id });
};

// const findByFamily = async (family) => {
//   return await knex.from("species").select("*").where({ family });
// };

/**
 * Va chercher des espèces en fonctions de leurs familles
 * @async
 * @param {string} family - Le nom de la famille.
 * @returns {Array<Object>} Les espèces.
 */
const findByFamily = async (family) => {
  return await knex
    .from("species")
    .select("*")
    .whereRaw(`family::text LIKE '${family}%'`);
};

module.exports = { findAll, findOne, insert, destroy, update, findByFamily };
