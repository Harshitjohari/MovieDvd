const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


const UTILS = require('../../utils/commonFn')
const CONSTANT = require('../../utils/constant');


module.exports = {

    register: async (req, res) => {
        try {

            const usersWithPhoneNumber = await prisma.User.findMany({
                where: {
                    phone: req.body.phone
                }
            });
            if (usersWithPhoneNumber.length > 0) {
                return res.send({ status: 400, message: `${req.body.phone} already exists.` })
            }
            const usersWithEmail = await prisma.User.findMany({
                where: {
                    email: req.body.email
                }
            });
            if (usersWithEmail.length > 0) {
                return res.send({ status: 400, message: `${req.body.email} already exists.` })
            }


            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt);

            const createUser = await prisma.User.create({
                data: {
                    email: req.body.email,
                    name: req.body.name,
                    password: hash,
                    phone: req.body.phone,
                    role: 'user'
                },
            })
            if (createUser) {
                res.send({ status: 200, message: 'Registered successfully' })
            } else {
                res.send({ status: 400, message: 'Some error occured' })
            }
        } catch (error) {
            console.log('error========+>', error);
        }
    },

    login: async (req, res) => {
        try {

            let checkUser = await prisma.User.findFirst({
                where: {
                    phone: req.body.phone
                }
            });
            if (!checkUser) {
                return res.send({ status: 400, message: 'Account not exist with this credential.' })
            }

            let passVerify = await bcrypt.compare(req.body.password, checkUser.password);
            if (!passVerify) {
                return res.send({ status: 400, message: 'Invalid credentails' })
            } else {
                var jwtToken = await UTILS.getJwtToken({
                    id: checkUser.id,
                    phone: req.body.phone,
                    name: checkUser.name,
                    email: checkUser.email
                });

                const updateUsers = await prisma.User.update({
                    where: {
                        id: checkUser.id
                    },
                    data: {
                        token: jwtToken,
                    },
                })

                let getUserData = await prisma.User.findFirst({
                    where: {
                        phone: req.body.phone
                    }
                });

                return res.send({ status: 200, message: "You have successfully logged in ", data: getUserData });
            }
        } catch (error) {
            console.log('error========+>', error);
        }
    },

    logout: async (req, res) => {
        try {

            const updateLogout = await prisma.User.update({
                where: {
                    id: req.query.tokenUser.id
                },
                data: {
                    token: "",
                },
            })

            return res.send({ status: 200, message: "You have successfully logged out " });

        } catch (error) {
            console.log('error========+>', error);
        }
    },


}



