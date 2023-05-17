const Person = require("../../model/Person");
const { createSuccessResponse } = require("../../response");
module.exports = (req, res) => {
    Person.clearData();
    const successResponse = createSuccessResponse({ "message": "Dados excluídos com sucesso" });
    return res.status(200).json(successResponse);
}