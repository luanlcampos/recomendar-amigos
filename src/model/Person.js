const { validateCPF } = require('../utils/validateCPF');
const { readPerson, writePerson, deleteData, writeRelationship, readRecommendation, readRelationship } = require('./data');
/**
 * Classe para uma Pessoa
 * @class
 */
class Person {
    /**
     * Cria uma Pessoa
     * @param {string} cpf - deve ser uma string numérica contendo 11 caracteres
     * @param {*} name - nome completo do usuário
     */
    constructor(cpf, name) {
        this.cpf = cpf;
        this.name = name;

        if (!validateCPF(this.cpf)) {
            throw new Error('CPF inválido');
        }
    }

    /**
     * Busca usuário no banco de dados baseado no CPF
     * @param {string} cpf - CPF do usuário 
     * @returns {Person | undefined} personObject
     */
    static getPersonByCPF(cpf) {
        const person = readPerson(cpf);
        return person;
    }

    /**
     * Armazena a instância da pessoa atual no banco de dados
     */
    save() {
        writePerson(this);
    }

    /**
     * Deleta todos os dados do banco de dados
     */
    static clearData() {
        deleteData();
    }

    /**
     * Busca a relação de amigos do usuário por CPF
     * @param {string} cpf - CPF do usuário
     * @returns {Array<string>} listaDeRelações
     */
    static getRelationshipsById(cpf) {
        return readRelationship(cpf);
    }

    /**
     * Cria uma nova relação entre o usuário 1 e 2
     * @param {string} cpf1
     * @param {string} cpf2 
     */
    static addRelationship(cpf1, cpf2) {
        writeRelationship(cpf1, cpf2);
    }

    /**
     * 
     * @param {string} cpf 
     * @returns {Array<string>} listaOrdenada
     */
    static getRecommendations(cpf) {
        return readRecommendation(cpf);
    }
}

module.exports = Person;