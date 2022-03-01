const db = require("./knexClient");

/**
 * Va chercher l'ensemble des cultivars ainsi que les espèces associés
 * @async
 * @returns {Array<Object>} Les cultivars ainsi que les espèces.
 */
const findAll = async () => {
  const cultivars = await db
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
  const cultivar = await db.from("variety").select("*").where({ id });
  return cultivar;
};

/**
 * Insère un nouveau cultivar dans la db
 * @async
 * @param {CultivarPayload} newCultivar - le payload à insérer.
 */
const insert = async (payload) => {
  await db.from("variety").insert(payload);
};

/**
 * Supprimer un cultivar dans la db
 * @async
 * @param {number} id - L'id du cultivar à supprimer.
 */
const destroy = async (id) => {
  await db.from("variety").where({ id }).del();
};

/**
 * Met à jour un cultivar (toutes les informations doivent être fournies)
 * @param {number} id - l'id du cultivar à modifier.
 * @param {CultivarPayload} payload - le payload du cultivar à modifier.
 */
const update = async (id, payload) => {
  await db.from("variety").update(payload).where({ id });
};

module.exports = { findAll, findOne, insert, destroy, update };
