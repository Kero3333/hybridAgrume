const knex = require("./knexClient");

/**
 * Un objet JS représentant un cultivar issu de la db
 * @typedef Cultivar
 * @property {number} id - l'id d'un cultivar.
 * @property {string} cultivar - le nom d'un cultivar.
 * @property {number} bitterness - l'amertume de ce cultivar.
 * @property {number} juiciness - la jutosité de ce cultivar.
 * @property {number} species_id - l'espèce associée à ce cultivar.
 */

/**
 * Un object JS représentant des données à insérer/mettre à jour dans la table variety
 * @typedef CultivarPayload
 * @property {string} cultivar - le nom d'un cultivar.
 * @property {number} bitterness - l'amertume de ce cultivar.
 * @property {number} juiciness - la jutosité de ce cultivar.
 * @property {number} species_id - l'espèce associée à ce cultivar.
 */

/**
 * Va chercher l'ensemble des cultivars ainsi que les espèces associés
 * @async
 * @returns {Array<Object>} Les cultivars ainsi que les espèces.
 */
const findAll = async () => {
  const cultivars = await knex
    .from("variety")
    .select(
      "variety.id",
      "variety.cultivar",
      "species.id as specie_id",
      "species.common_name",
      "species.family"
    )
    .join("species", { "species.id": "variety.species_id" });
  return cultivars;
};

/**
 * Va chercher un cultivar correspondant à l'id donner
 * @async
 * @param {number} id - L'id recherché.
 * @returns {Array<Object>} Un cultivar.
 */
const findOne = async (id) => {
  const cultivar = await knex.from("variety").select("*").where({ id });
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
  await knex.from("variety").where({ id }).del();
};

/**
 * Met à jour un cultivar (toutes les informations doivent être fournies)
 * @param {number} id - l'id du cultivar à modifier.
 * @param {CultivarPayload} payload - le payload du cultivar à modifier.
 */
const update = async (id, payload) => {
  await knex.from("variety").update(payload).where({ id });
};

/**
 * Va chercher les cultivars qui possède une jutosité minimal
 * @async
 * @param {number} minJu - La jutosité minimal.
 * @returns {Array<Object>} Les cultivars.
 */
const findByMinJuiciness = async (minJu) => {
  return await knex.from("variety").select("*").where("juiciness", ">=", minJu);
};

/**
 * Va chercher les cultivars qui possède une jutosité maximal
 * @async
 * @param {number} maxJu - La jutosité maximal.
 * @returns {Array<Object>} Les cultivars.
 */
const findByMaxJuiciness = async (maxJu) => {
  return await knex.from("variety").select("*").where("juiciness", "<=", maxJu);
};

/**
 * Va chercher les cultivars qui possède une amertume minimal
 * @async
 * @param {number} minBi - L'amertume minimal.
 * @returns {Array<Object>} Les cultivars.
 */
const findByMinBitterness = async (minBi) => {
  return await knex
    .from("variety")
    .select("*")
    .where("bitterness", ">=", minBi);
};

/**
 * Va chercher les cultivars qui possède une amertume maximal
 * @async
 * @param {number} maxBi - L'amertume maximal.
 * @returns {Array<Object>} Les cultivars.
 */
const findByMaxBitterness = async (maxBi) => {
  return await knex
    .from("variety")
    .select("*")
    .where("bitterness", "<=", maxBi);
};

// const findBySpecies = async (speciesName) => {
//   return await knex
//     .from("variety")
//     .join("species", { "species.id": "variety.species_id" })
//     .select(
//       "variety.cultivar",
//       "variety.bitterness",
//       "variety.juiciness",
//       "species.common_name as specie_name"
//     )
//     .where({ "species.common_name": speciesName });
// };

/**
 * Va chercher des cultivars en fonctions de leurs espèces
 * @async
 * @param {string} speciesName - Le nom de l'espèce.
 * @returns {Array<Object>} Les cultivars.
 */
const findBySpecies = async (speciesName) => {
  return await knex
    .from("variety")
    .join("species", { "species.id": "variety.species_id" })
    .select(
      "variety.cultivar",
      "variety.bitterness",
      "variety.juiciness",
      "species.common_name as specie_name"
    )
    .whereLike("species.common_name", `${speciesName}%`);
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
};
