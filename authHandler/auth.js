const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');


module.exports = {

    authAdmin: async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                return res.send({ status: 400, message: 'Token is missing' });
            }
            jwt.verify(req.headers.authorization, `sUpER@SecReT`, async (error, result) => {
                if (error) {
                    return res.send({ status: 400, message: 'Invalid Token' });
                }
                console.log({ result })
                const checkAdmin =await prisma.Admin.findFirst({
                    where: {
                        token: req.headers.authorization
                    }
                });
                if (!checkAdmin) {
                    return res.send({ status: 400, message: 'Invalid Token' })
                }
                req.query.tokenUser = checkAdmin
                next();
            })
        } catch (error) {
            console.log("Error is============>", error)
        }
    },

    authUser: async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                return res.send({ status: 400, message: 'Token is missing' });
            }
            jwt.verify(req.headers.authorization, `sUpER@SecReT`, async (error, result) => {
                if (error) {
                    return res.send({ status: 400, message: 'Invalid Token' });
                }
                let checkUser = await prisma.User.findFirst({
                    where: {
                        token: req.headers.authorization
                    }
                });
                if (!checkUser) {
                    return res.send({ status: 400, message: 'Invalid Token' })
                }
                req.query.tokenUser = checkUser
                next();
            })
        } catch (error) {
            console.log("Error is============>", error)
        }
    },

}
