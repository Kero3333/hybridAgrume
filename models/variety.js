const knex = require("./knexClient");
const _ = require("lodash");

/**
 * Un objet JS représentant un cultivar issu de la db
 * @typedef Cultivar
 * @property {number} id - l'id d'une variété.
 * @property {string} cultivar - le nom d'une variété.
 * @property {number} bitterness - l'amertume de cette variété.
 * @property {number} juiciness - la jutosité de cette variété.
 * @property {number} species_id - l'espèce associée à cette variété.
 */

/**
 * Un object JS représentant des données à insérer/mettre à jour dans la table variety.
 * @typedef CultivarPayload
 * @property {string} cultivar - le nom d'une variété.
 * @property {number} bitterness - l'amertume de cette variété.
 * @property {number} juiciness - la jutosité de cette variété.
 * @property {number} species_id - l'espèce associée à cette variété.
 */

/**
 * Va chercher l'ensemble des variétés ainsi que les espèces associés
 * @async
 * @returns {Array<Object>} les variétés ainsi que les espèces.
 */
const findAll = async () => {
  const cultivars = await knex
    .from("variety_with_full_name")
    .select(
      "variety_with_full_name.cultivar",
      "variety_with_full_name.bitterness",
      "variety_with_full_name.juiciness",
      "species.id as specie_id",
      "species.common_name",
      "species.family"
    )
    .join("species", { "species.id": "variety_with_full_name.species_id" });
  return cultivars;
};

/**
 * Va chercher un cultivar correspondant à l'id donner
 * @async
 * @param {number} id - L'id recherché.
 * @returns {Array<Object>} une variété.
 */
const findOne = async (id) => {
  const cultivar = await knex
    .from("variety_with_full_name")
    .select("*")
    .where({ id });
  return cultivar;
};

/**
 * Insère un nouveau cultivar dans la db
 * @async
 * @param {CultivarPayload} newCultivar - le payload à insérer.
 * @returns {Array<Object>} L'id du cultivar insérer.
 */
const insert = async (payload) => {
  return await knex.from("variety").insert(payload, ["id"]);
};

/**
 * Supprimer un cultivar dans la db
 * @async
 * @param {number} id - L'id du cultivar à supprimer.
 */
const destroy = async (id) => {
  return await knex.from("variety").where({ id }).del(["id"]);
};

/**
 * Met à jour un cultivar (toutes les informations doivent être fournies)
 * @param {number} id - l'id du cultivar à modifier.
 * @param {CultivarPayload} payload - le payload du cultivar à modifier.
 */
const update = async (id, payload) => {
  return await knex.from("variety").update(payload, ["id"]).where({ id });
};

/**
 * Va chercher les variétés qui possède une jutosité minimal
 * @async
 * @param {number} minJu - La jutosité minimal.
 * @returns {Array<Object>} les variétés.
 */
const findByMinJuiciness = async (minJu) => {
  return await knex
    .from("variety_with_full_name")
    .select("*")
    .where("juiciness", ">=", minJu);
};

/**
 * Va chercher les variétés qui possède une jutosité maximal
 * @async
 * @param {number} maxJu - La jutosité maximal.
 * @returns {Array<Object>} les variétés.
 */
const findByMaxJuiciness = async (maxJu) => {
  return await knex
    .from("variety_with_full_name")
    .select("*")
    .where("juiciness", "<=", maxJu);
};

/**
 * Va chercher les variétés qui possède une amertume minimal
 * @async
 * @param {number} minBi - L'amertume minimal.
 * @returns {Array<Object>} les variétés.
 */
const findByMinBitterness = async (minBi) => {
  return await knex
    .from("variety_with_full_name")
    .select("*")
    .where("bitterness", ">=", minBi);
};

/**
 * Va chercher les variétés qui possède une amertume maximal
 * @async
 * @param {number} maxBi - L'amertume maximal.
 * @returns {Array<Object>} les variétés.
 */
const findByMaxBitterness = async (maxBi) => {
  return await knex
    .from("variety_with_full_name")
    .select("*")
    .where("bitterness", "<=", maxBi);
};

// const findBySpecies = async (speciesName) => {
//   return await knex
//     .from("variety")
//     .join("species", { "species.id": "variety..species_id" })
//     .select(
//       "variety..cultivar",
//       "variety..bitterness",
//       "variety..juiciness",
//       "species.common_name as specie_name"
//     )
//     .where({ "species.common_name": speciesName });
// };

/**
 * Va chercher des variétés en fonctions de leurs espèces
 * @async
 * @param {string} speciesName - Le nom de l'espèce.
 * @returns {Array<Object>} les variétés.
 */
const findBySpecies = async (speciesName) => {
  return await knex
    .from("variety_with_full_name")
    .join("species", { "species.id": "variety_with_full_name.species_id" })
    .select(
      "variety_with_full_name.cultivar",
      "variety_with_full_name.bitterness",
      "variety_with_full_name.juiciness",
      "species.common_name as specie_name"
    )
    .whereLike("species.common_name", `${speciesName}%`);
};

// const findBetween = async (criteria) => {
//   if (!criteria.bitterness) {
//     criteria.bitterness = {};
//   }
//   if (!criteria.bitterness.min) {
//     criteria.bitterness.min = 0;
//   }
//   if (!criteria.bitterness.max) {
//     criteria.bitterness.max = 5;
//   }

//   if (!criteria.juiciness) {
//     criteria.juiciness = {};
//   }
//   if (!criteria.juiciness.min) {
//     criteria.juiciness.min = 0;
//   }
//   if (!criteria.juiciness.max) {
//     criteria.juiciness.max = 5;
//   }

//   return await knex
//     .from("variety")
//     .select("*")
//     .whereBetween("juiciness", [criteria.juiciness.min, criteria.juiciness.max])
//     .whereBetween("bitterness", [
//       criteria.bitterness.min,
//       criteria.bitterness.max,
//     ]);
// };

/**
 * Va chercher des variétés en fonctions de leurs amertumes et/ou de leurs jutosités
 * @async
 * @param {Object<Object>} criteria - Les critères de seletion de l'amertume et de la justosité
 * @returns {Array<Object>} les variétés.
 */
const findBetween = async (criteria) => {
  const criteriaDefault = {
    bitterness: { min: 0, max: 5 },
    juiciness: { min: 0, max: 5 },
  };

  criteria = _.merge(criteriaDefault, criteria);

  return await knex
    .from("variety")
    .select("*")
    .whereBetween("juiciness", [criteria.juiciness.min, criteria.juiciness.max])
    .whereBetween("bitterness", [
      criteria.bitterness.min,
      criteria.bitterness.max,
    ]);
};

module.exports = {
  findAll,
  findOne,
  insert,
  destroy,
  update,
  findByMinJuiciness,
  findByMaxJuiciness,
  findByMinBitterness,
  findByMaxBitterness,
  findBySpecies,
  findBetween,
};
