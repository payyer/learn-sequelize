const models = require('../models/index');
const bcrypt = require('bcrypt');

const getAllUser = async (req, res) => {
    try {

        let { page, limit } = req.query;
        let offset = (page - 1) * limit;
        const { count, rows } = await models.User.findAndCountAll({
            offset: offset,
            limit: limit,
            include: models.Group,
            attributes: ["id", "email", "userName"],
            order: [
                ['id', 'DESC'],
            ]
        });

        let totalPages = Math.ceil(count / limit)

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return res.status(200).json({ EC: '0', message: "Tìm kiểm thành công", data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ EC: '-1', message: "Something wrong!" });
    }
}

const createUser = async (req, res) => {
    const { email, password, password2, userName, groupId } = req.body;
    try {
        if (!email) {
            return res.status(200).json({ EC: '1', message: "Bạn chưa nhập Email" });
        }
        if (!password) {
            return res.status(200).json({ EC: '1', message: "Bạn chưa nhập Password" });
        }
        if (password && password.length < 6) {
            return res.status(200).json({ EC: '1', message: "Password cần có ít nhất 6 ký tự" });
        }
        if (!password2) {
            return res.status(200).json({ EC: '1', message: "Bạn chưa xác nhận lại password" });
        }
        if (password2 !== password) {
            return res.status(200).json({ EC: '1', message: "Mật khẩu xác nhận không trùng khớp" });
        }
        if (!userName) {
            return res.status(200).json({ EC: '1', message: "Bạn chưa nhập User Name" });
        }

        const userIsExist = await models.User.findOne({ where: { email } });
        if (!userIsExist) {
            const salt = bcrypt.genSaltSync();
            const hashingPassword = bcrypt.hashSync(password, salt);
            const newUser = await models.User.create({ email, password: hashingPassword, userName, groupId });
            return res.status(200).json({ EC: '0', message: 'Tạo mới user thành công!', data: newUser });
        } else {
            return res.status(200).json({ EC: '1', message: 'Email đã tồn tại' });
        }
    }
    catch (err) {
        return res.status(500).json({
            EM: err,
            EC: '-1',
            DT: ''
        });
    }
}

const changeGroupUser = async (req, res) => {
    let { id } = req.params;
    let { changeGroup } = req.body;
    try {
        if (!id) {
            return res.satus(200).json({ EC: '1', meeasge: "You don't select id" });
        }
        const user = await models.User.findOne({ id });
        const updateUser = await user.update({ groupId: changeGroup })
        res.status(200).json({ EC: '0', data: updateUser });
    }
    catch (err) {
        console.log(err);
        res.satus(500).json({ EC: '1-', err });
    }
}

const deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        const user = await models.User.findOne({ where: { id } });
        if (user) {
            const deleteUser = await user.destroy();
            return res.status(200).json({ EC: '0', message: 'Xóa người dùng thành công!', data: deleteUser });
        } else {
            return res.status(200).json({ EC: '1', message: 'Không tìm thấy người dùng' });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ EC: '1', meeasge: 'Xóa người dùng thất bại', err })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(200).json({ EC: '1', message: "Bạn chưa nhập Email" });
        }
        if (!password) {
            return res.status(200).json({ EC: '1', message: "Bạn chưa nhập Password" });
        }
        const user = await models.User.findOne({ where: { email } });
        if (!user) {
            return res.status(200).json({ EC: '1', message: "Không tìm thấy người dùng" });
        }
        const userPassword = user.password;
        const isUser = await bcrypt.compareSync(password, userPassword);
        if (isUser) {
            return res.status(200).json({ EC: 0, message: "Đăng nhập thành công", data: user });
        } else {
            return res.status(200).json({ EC: 1, message: "Mật khẩu không chính xác" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ EC: -1, message: "Something Wrong!" });
    }
}

const createUserWithAdmin = async (req, res) => {
    let { email, password, userName, groupId } = req.body;

    try {
        const userIsExist = await models.User.findOne({ where: { email } })
        if (!userIsExist) {
            const salt = bcrypt.genSaltSync();
            const passwordHashing = bcrypt.hashSync(password, salt);
            const user = await models.User.create({ email, password: passwordHashing, userName, groupId });
            return res.status(200).json({ EC: 0, message: "Tạo mới user thành công", data: user })
        } else {
            return res.status(200).json({ EC: '1', message: 'Email đã tồn tại' });
        }

    }
    catch (err) {
        return res.json({ EC: -1, message: "Something wrong!" })
    }
}

module.exports = {
    getAllUser, createUser, changeGroupUser, deleteUser, loginUser, createUserWithAdmin
}