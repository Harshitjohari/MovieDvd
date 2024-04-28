const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


const UTILS = require('../../utils/commonFn')
const CONSTANT = require('../../utils/constant');


module.exports = {

  create: async (req, res) => {
    try {

      const usersWithEmail = await prisma.Admin.findMany({
        where: {
          email: req.body.email
        }
      });
      if (usersWithEmail.length > 0) {
        return res.send({ status: 400, message: `${req.body.email} already exists.` })
      }


      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt);

      const createUser = await prisma.Admin.create({
        data: {
          email: req.body.email,
          password: hash
        },
      })
      if (createUser) {
        res.send({ status: 200, message: 'Created successfully' })
      } else {
        res.send({ status: 400, message: 'Some error occured' })
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

  login: async (req, res) => {
    try {

      let checkUser = await prisma.Admin.findFirst({
        where: {
          email: req.body.email
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
          email: checkUser.email
        });

        const updateUsers = await prisma.Admin.update({
          where: {
            id: checkUser.id
          },
          data: {
            token: jwtToken,
          },
        })

        let getUserData = await prisma.Admin.findFirst({
          where: {
            email: req.body.email
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

      const updateLogout = await prisma.Admin.update({
        where: {
          id: req.query.tokenUser.id
        },
        data: {
          token: "",
        },
      })

      return res.send({ status: 200, message: "You have successfully logged out "});

    } catch (error) {
      console.log('error========+>', error);
    }
  },




}



