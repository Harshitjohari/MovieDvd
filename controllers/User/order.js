const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const UTILS = require('../../utils/commonFn')
const CONSTANT = require('../../utils/constant');


module.exports = {

  placeOrder: async (req, res) => {
    try {
      const newData = req.body.order.map(item => ({
        ...item,
        userId: req.query.tokenUser.id
    }));
      const addOrder = await prisma.Order.createMany({
        data: newData,
      })
      if (addOrder) {
        let deleteItem = await prisma.CartItem.deleteMany({
          where: {
            userId: req.query.tokenUser.id
          }
        })
        res.send({ status: 200, message: 'Order Placed successfully' })
      } else {
        res.send({ status: 400, message: 'Some error occured' })
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

  list: async (req, res) => {
    try {
      const getList = await prisma.Order.findMany({
        where: {
          userId: req.query.tokenUser.id
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

  collectOrder: async (req, res) => {
    try {
      const updateStatus = await prisma.Order.update({
        where: {
          id: req.body.id
        },
        data: {
          status: "Collected",
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



