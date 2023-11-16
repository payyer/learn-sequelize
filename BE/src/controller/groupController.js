const models = require('../models/index');
const getAllGroup = async (req, res) => {
    try {
        const group = await models.Group.findAll({
            order: [
                ['name', 'ASC'],
            ]
        });
        return res.status(200).json({ EC: '0', data: group });
    }
    catch (err) {
        return res.status(500).json({ EC: '1-', message: 'Something wrong', err });
    }
}
const createGroup = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newGroup = await models.Group.create({ name, description });
        return res.status(200).json({ EC: '0', data: newGroup });
    }
    catch (err) {
        return res.status(500).json({ EC: '-1', message: 'Something wrong', err });
    }
}

const deleteGroup = async (req, res) => {
    let { id } = req.params;
    try {
        const deleteGroup = await models.Group.destroy({ where: { id } });
        return res.status(200).json({ EC: '0', message: 'Xóa group thành công', data: deleteGroup });
    }
    catch (err) {
        return res.status(500).json({ EC: '-1', message: 'Something wrong', err });
    }
}
module.exports = {
    getAllGroup, createGroup, deleteGroup
}