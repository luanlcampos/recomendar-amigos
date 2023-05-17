const globalData = require('./globalData');
let { people, relationshipsAJ } = globalData;


/**
 * Recebe um objeto tipo Person e adiciona ela ao banco de dados
 * @param {Person} person 
 */
const writePerson = (person) => {
    people[person.cpf] = person;
    relationshipsAJ[person.cpf] = [];
}

/**
 * Procura pela pessoa no banco de dados pelo CPF
 * @param {string} cpf 
 * @returns {Person} || undefined
 */
const readPerson = (cpf) => {
    const person = people[cpf];
    return person;
}

/**
 * Deleta todos os dados do banco de dados
 */
const deleteData = () => {
    people = {};
    relationshipsAJ = {};
}

/**
 * retorna lista de relações pelo cpf
 * @param {string} cpf 
 * @returns {Array<string>} lista de relações
 */
const readRelationship = (cpf) => {
    return relationshipsAJ[cpf];
}

/**
 * Recebe dois cpfs para estabelecer a relação
 * @param {string} cpf1 
 * @param {string} cpf2 
 */
const writeRelationship = (cpf1, cpf2) => {
    relationshipsAJ[cpf1].push(cpf2);
    relationshipsAJ[cpf2].push(cpf1);
}


/**
 * Baseado no cpf, coleta as recomendações de relação
 * Recomendações são amigos de amigos no qual o usuário não é conectado
 * @param {string} cpf 
 * @returns {Array} cpfList ordenada 
 */
const readRecommendation = (myCpf) => {
    // obtem lista de amigos da aj
    const friends = relationshipsAJ[myCpf];

    const recommendations =
        // reduce para iterar na array filtrada e criar um novo objeto contendo
        // o score de cada recomendação
        friends.reduce((acc, cpf) => {
            relationshipsAJ[cpf].forEach(friend => {
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

    console.log(sortedRecommendations);
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