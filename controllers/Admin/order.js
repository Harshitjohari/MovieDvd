const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const UTILS = require('../../utils/commonFn')
const CONSTANT = require('../../utils/constant');


module.exports = {

  list: async (req, res) => {
    try {
      const getList = await prisma.Order.findMany({
        where: {
          userId: req.query.id
        },
        include: {
          movie: true
        },
        orderBy: {
          id: 'desc'
        }
      });

      if (getList) {
        res.send({ status: 200, message: 'Data found successfully', data: getList })
      } else {
        res.send({ status: 400, message: 'No data foung', data: [] })
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

  detail: async (req, res) => {
    try {
      const getList = await prisma.Order.findFirst({
        where: {
          id: parseInt(req.query.id)
        },
        include: {
          movie: true
        }
      });

      if (getList) {
        res.send({ status: 200, message: 'Data found successfully', data: getList })
      } else {
        res.send({ status: 400, message: 'No data foung', data: [] })
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

  changeStatus: async (req, res) => {
    try {
      const updateStatus = await prisma.Order.update({
        where: {
          id: req.body.id
        },
        data: {
          status: req.body.status,
        },
      })

      if (updateStatus) {
        res.send({ status: 200, message: 'Changes saved successfully'})
      } else {
        res.send({ status: 400, message: 'No data foung'})
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

}



