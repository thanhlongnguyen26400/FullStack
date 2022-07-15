import userService from "../services/userService";

let handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        userData: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // ALL, id
    let users = await userService.getAllUsers(id);

    if (!users) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let data = await userService.createNewUser(req.body)

    return res.status(200).json(data);
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUser(data);
    return res.status(200).json(message);

}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        });
    }
    let data = await userService.deleteUser(req.body.id)
    return res.status(200).json(data);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}
