import db from "../models/index"
import bcrypt from 'bcryptjs';


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
module.exports = {
    handleUserLogin: handleUserLogin
}