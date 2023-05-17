// src/data/globalData.js

/**
 * people é um map onde a key é o cpf e o valor é um objeto do tipo People
 * @example
 *  {
 *      "11111111111": {
 *          cpf: "11111111111",
 *          name: "Joao"
 *      }
 *  } 
 */
let people = {};

/**
* * relationshipsAJ é uma lista adjacente onde a chave é os cpf do usuário,
     * e o valor é uma lista contendo todas a relações do usuário.
     * como toda relação é bidirecional, cpf1 adiciona cpf2 e cpf2 adiciona cpf1 
     * @example
     * // Antes da relação
     * {
     *  "11111111111": [],
     *  "22222222222": []
     * }
     * 
     * // Depois da relação
     * 
     * {
     *  "11111111111": ["22222222222"],
     *  "22222222222": ["11111111111"]
     * }
 *  
 */
let relationshipsAJ = {};

module.exports = {
    people,
    relationshipsAJ
};