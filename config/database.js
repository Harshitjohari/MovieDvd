const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');

const CONSTANT = require('./../utils/constant')

const prisma = new PrismaClient({
  errorFormat: 'minimal',
  datasources: {
    db: {
      url: CONSTANT.dbUrl,
    },
  },
});

async function checkConnection() {
  try {
    await prisma.$connect();
    console.log('Prisma Client connected successfully!');
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
