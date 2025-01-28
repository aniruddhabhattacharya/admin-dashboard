const service = require('../services/service.js')
const controller = {
    getData: async (req, res) => {
        try {
            const result = await service.getData(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    }
}

module.exports = controller;