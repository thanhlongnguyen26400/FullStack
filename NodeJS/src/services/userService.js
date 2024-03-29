import db from "../models/index"
import bcrypt from 'bcryptjs';
import { response } from "express";

const salt = bcrypt.genSaltSync(10);

// hash password
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await chekUserEmail(email);
            if (isExist) {
                // user alerady exist
                // compate password

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    // so sanh password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `Access success`;

                        delete user.password;
                        userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`
                    }
                }
                else {
                    userData.errCode = 2
                    userData.errMessage = `User's not found`

                }
            }
            else {
                //return error
                userData.errCode = 1
                userData.errMessage = `your's Email isn't exist in your system. try other email`
            }
            resolve(userData)

        } catch (e) {
            reject(e)
        }

    })

}

let chekUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }


                })
            }
            resolve(users)

        } catch (e) {
            reject(e);
        }
    })

}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist ?
            let check = await chekUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used. Try another email'
                })
            }
            else {
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashUserPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            }


        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            errMessage: 'The user is deleted',
        })
    })

}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })

            if (user) {

                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update the user succeeds!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "User not found!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
}