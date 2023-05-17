const globalData = require("../../model/data/globalData");
const { createSuccessResponse } = require("../../response");
module.exports = (req, res) => {
    globalData.people = [];
    globalData.relationshipsAJ = {};
    const successResponse = createSuccessResponse({ "message": "Dados excluídos com sucesso" });
    return res.status(200).json(successResponse);
}