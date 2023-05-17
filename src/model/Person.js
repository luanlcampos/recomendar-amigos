const { validateCPF } = require('../utils/validateCPF');
const { readPerson, writePerson, deleteData, writeRelationship, readRecommendation, readRelationship } = require('./data');
class Person {
    constructor(cpf, name) {
        this.cpf = cpf;
        this.name = name;

        if (!validateCPF(this.cpf)) {
            throw new Error('CPF inválido');
        }
    }

    static getPersonByCPF(cpf) {
        const person = readPerson(cpf);
        return person;
    }

    save() {
        writePerson(this);
    }

    static clearData() {
        deleteData();
    }

    static getRelationshipsById(cpf) {
        return readRelationship(cpf);
    }

    static addRelationship(cpf1, cpf2) {
        writeRelationship(cpf1, cpf2);
    }

    static getRecommendations(cpf) {
        return readRecommendation(cpf);
    }
}

module.exports = Person;