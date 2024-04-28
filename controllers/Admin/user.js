const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const UTILS = require('../../utils/commonFn')
const CONSTANT = require('../../utils/constant');


module.exports = {

  list: async (req, res) => {
    try {

      const getList = await prisma.User.findMany({
        // where: {
        //   title: req.body.title
        // }
        orderBy: {
          id: 'desc'
        }
      });
      if (getList) {
        res.send({ status: 200, message: 'Data found successfully', data : getList })
      } else {
        res.send({ status: 400, message: 'No data foung', data: [] })
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

}



