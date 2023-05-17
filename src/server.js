/**
 * src/server.js
 * Arquivo responsável por inicar o server
 */
const app = require('./app');
const port = 3000;

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

module.exports = server;