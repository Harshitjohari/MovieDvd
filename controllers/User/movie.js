const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const UTILS = require('../../utils/commonFn')
const CONSTANT = require('../../utils/constant');


module.exports = {

  list: async (req, res) => {
    try {

      const { title, genre, year, leadActor, director } = req.query;
      const where = {};
      
      if (title) where.title = { contains: title };
      if (genre) where.genre = { contains: genre };
      if (year) where.year = { equals: parseInt(year) };
      if (leadActor) where.leadActor = { contains: leadActor };
      if (director) where.director = { contains: director };      
      const getList = await prisma.movie.findMany({
        where: where,
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

}



