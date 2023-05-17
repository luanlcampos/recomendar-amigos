const { validateCPF } = require('../utils/validateCPF');
class Person {
    constructor(cpf, name) {
        this.cpf = cpf;
        this.name = name;

        if (!validateCPF(this.cpf)) {
            throw new Error('CPF inválido');
        }
    }
}

module.exports = Person;