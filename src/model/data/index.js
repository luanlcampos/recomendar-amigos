const globalData = require('./globalData');
const { people } = globalData;

/**
 * Recebe um objeto tipo Person e adiciona ela ao banco de dados
 * @param {Person} person - instance of a person
 */
const writePerson = (person) => {
    people.set(person.cpf, person);
}

/**
 * Procura pela pessoa no banco de dados pelo CPF
 * @param {string} cpf 
 * @returns {Person | undefined} - a person object or undefined
 */
const readPerson = (cpf) => {
    const person = people.get(cpf);
    return person;
}

/**
 * Deleta todos os dados do banco de dados
 */
const deleteData = () => {
    people.clear();
}

/**
 * retorna lista de relações pelo cpf
 * @param {string} cpf 
 * @returns {Array<string>} lista de relações
 */
const readRelationship = (cpf) => {
    return people.get(cpf).relationships;
}

/**
 * Recebe dois cpfs para estabelecer a relação
 * @param {string} cpf1 
 * @param {string} cpf2 
 */
const writeRelationship = (cpf1, cpf2) => {
    // armazena as pessoas para facilitar leitura
    let p1 = people.get(cpf1);
    let p2 = people.get(cpf2);

    people.set(cpf1, { ...p1, relationships: [...p1.relationships, cpf2] });
    people.set(cpf2, { ...p2, relationships: [...p2.relationships, cpf1] });
}


/**
 * Baseado no cpf, coleta as recomendações de relação
 * Recomendações são amigos de amigos no qual o usuário não é conectado
 * @param {string} cpf 
 * @returns {Array} cpfList ordenada 
 */
const readRecommendation = (myCpf) => {
    // obtem lista de amigos da aj
    const friends = people.get(myCpf).relationships;

    const recommendations =
        // reduce para iterar na array filtrada e criar um novo objeto contendo
        // o score de cada recomendação
        friends.reduce((acc, cpf) => {
            people.get(cpf).relationships.forEach(friend => {
                if (!friends.includes(friend) && friend !== myCpf) {
                    acc[friend] = (acc[friend] || 0) + 1;
                }
            });
            return acc;
        }, {});


    // Ordena as recomendações pela relevância
    const sortedRecommendations = Object.entries(recommendations)
        // apenas scores > 0 são considerados para ordenamento
        // eslint-disable-next-line no-unused-vars
        .filter(([_, score]) => score > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([cpf]) => cpf);

    return sortedRecommendations;
}


module.exports = {
    writePerson,
    readPerson,
    deleteData,
    readRelationship,
    writeRelationship,
    readRecommendation
}