const Person = require("../src/model/Person");

describe('check person class constructor', () => {
    test('deve criar uma nova pessoa', () => {
        const person = new Person("11111111111", "Joao");
        expect(person.name).toBe("Joao");
        expect(person.cpf).toBe("11111111111");
    });

    test('deve emitir um erro por CPF inválido < 11 caractéres', () => {
        expect(() => new Person("1111111111", "Joao")).toThrow();
    });

    test('deve emitir um erro por CPF inválido: contém letras', () => {
        expect(() => new Person("11111aaaa11", "Joao")).toThrow();
    });
})