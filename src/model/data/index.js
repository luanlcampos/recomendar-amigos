const globalData = require('./globalData');
const { people } = globalData;

/**
 * Recebe um objeto tipo Person e adiciona ela ao banco de dados
 * @param {Person} person - instance of a person
 */
const writePerson = (person) => {
    people[person.cpf] = person;
}

/**
 * Procura pela pessoa no banco de dados pelo CPF
 * @param {string} cpf 
 * @returns {Person | undefined} - a person object or undefined
 */
const readPerson = (cpf) => {
    return people[cpf];
}

/**
 * Deleta todos os dados do banco de dados
 */
const deleteData = () => {
    for (let key in people) {
        delete people[key];
    }
}

/**
 * retorna lista de relações pelo cpf
 * @param {string} cpf 
 * @returns {Array<string>} lista de relações
 */
const readRelationship = (cpf) => {
    return people[cpf].relationships;
}

/**
 * Recebe dois cpfs para estabelecer a relação
 * @param {string} cpf1 
 * @param {string} cpf2 
 */
const writeRelationship = (cpf1, cpf2) => {
    people[cpf1].relationships.push(cpf2);
    people[cpf2].relationships.push(cpf1);
}


/**
 * Baseado no cpf, coleta as recomendações de relação
 * Recomendações são amigos de amigos no qual o usuário não é conectado
 * @param {string} cpf 
 * @returns {Array} cpfList ordenada 
 */
const readRecommendation = (myCpf) => {
    // obtem lista de amigos da aj
    const friends = people[myCpf].relationships;

    const recommendations =
        // reduce para iterar na array filtrada e criar um novo objeto contendo
        // o score de cada recomendação
        friends.reduce((acc, cpf) => {
            people[cpf].relationships.forEach(friend => {
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