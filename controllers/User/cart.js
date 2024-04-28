const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const UTILS = require('../../utils/commonFn')
const CONSTANT = require('../../utils/constant');


module.exports = {

  add: async (req, res) => {
    try {

      let checkExist = await prisma.CartItem.findFirst({
        where: {
          userId: req.query.tokenUser.id,
          movieId: req.body.movieId
        }
      })
      if (checkExist) {

        if (Number(req.body.quantity) == 0) {
          let deleteItem = await prisma.CartItem.delete({
            where: {
              id : checkExist.id
            }
          })
          if (!deleteItem) {
            return res.send({ status: 503, message: 'Something went wrong' });
          }
          return res.send({ status: 200, message: 'Item removed from cart successfully' });
        }

        const cartUpdate = await prisma.CartItem.update({
          where: {
            id : checkExist.id
            // AND: [
            //   { userId: req.query.tokenUser.id },
            //   { movieId: req.body.movieId }
            // ]
          },
          data: {
            quantity: {
              increment: req.body.quantity
            },
            price: {
              increment: req.body.price
            }
          }
        });
        

        return res.send({ status: 200, message: 'Add to cart successfully' });
      }

      const addCart = await prisma.CartItem.create({
        data: {
          userId: req.query.tokenUser.id,
          movieId: req.body.movieId,
          quantity: req.body.quantity,
          price: req.body.price
        },
      })
      if (addCart) {
        res.send({ status: 200, message: 'Add to cart successfully' })
      } else {
        res.send({ status: 400, message: 'Some error occured' })
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

  deleteItemFromCart: async (req, res) => {
    try {
      let deleteItem = await prisma.CartItem.delete({
        where: {
          id: req.body.id
        }
      })
      if (!deleteItem) {
        return res.send({ status: 503, message: 'Something went wrong' });
      } else {
        return res.send({ status: 200, message: 'Item removed from cart successfully' });
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

  emptyCart: async (req, res) => {
    try {
      let deleteItem = await prisma.CartItem.deleteMany({
        where: {
          userId: req.query.tokenUser.id
        }
      })
      if (!deleteItem) {
        return res.send({ status: 503, message: 'Something went wrong' });
      } else {
        return res.send({ status: 200, message: 'Item removed from cart successfully' });
      }
    } catch (error) {
      console.log('error========+>', error);
    }
  },

  list: async (req, res) => {
    try {
      const getList = await prisma.CartItem.findMany({
        where: {
          userId: req.query.tokenUser.id
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

}



