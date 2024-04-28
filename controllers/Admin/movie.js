const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const UTILS = require('../../utils/commonFn')
const CONSTANT = require('../../utils/constant');


module.exports = {

  create: async (req, res) => {
    try {

      const checkMovie = await prisma.Movie.findMany({
        where: {
          title: req.body.title
        }
      });
      if (checkMovie.length > 0) {
        return res.send({ status: 400, message: `${req.body.title} already exists.` })
      }

      const createMoview = await prisma.Movie.create({
        data: {
          title: req.body.title,
          genre: req.body.genre,
          year: req.body.year,
          leadActor: req.body.leadActor,
          director: req.body.director,
          price: req.body.price,
          quantity: req.body.quantity
        },
      })
      if (createMoview) {
        res.send({ status: 200, message: 'Created successfully' })
      } else {
        res.send({ status: 400, message: 'Some error occured' })
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

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

  edit: async (req, res) => {
    try {
      const dataToUpdate = {};
      if (req.body.genre) dataToUpdate.genre = req.body.genre;
      if (req.body.year) dataToUpdate.year = req.body.year;
      if (req.body.leadActor) dataToUpdate.leadActor = req.body.leadActor;
      if (req.body.director) dataToUpdate.director = req.body.director;
      if (req.body.price) dataToUpdate.price = req.body.price;
      if (req.body.quantity) dataToUpdate.quantity = req.body.quantity;

      const updateMovie = await prisma.Movie.update({
        where: {
          id: req.body.id
        },
        data: dataToUpdate
      })
      if (updateMovie) {
        return res.send({ status: 200, message: "Changes saved" });
      }

    } catch (error) {
      console.log('error========+>', error);
    }
  },

  delete: async (req, res) => {
    try {

      const deleteMovie = await prisma.Movie.update({
        where: {
          id: req.body.id
        },
        data: {
          isDeleted: true,
        },
      })

      return res.send({ status: 200, message: "Changes saved" });

    } catch (error) {
      console.log('error========+>', error);
    }
  },




}



