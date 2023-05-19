// src/data/globalData.js
// eslint-disable-next-line no-unused-vars
const { Person } = require('../Person');

/**
 * people é um ES6 map onde a key é o cpf e o valor é um objeto do tipo People
 * @type {Map<string, Person>}
 * @example
 *  {
 *      "11111111111": {
 *          cpf: "11111111111",
 *          name: "Joao",
 *          relationships: []
 *      }
 *  } 
 */
let people = new Map();

module.exports = {
    people,
};