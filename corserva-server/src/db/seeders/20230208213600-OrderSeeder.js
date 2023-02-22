'use strict';

const { uuid } = require('uuidv4');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('Orders', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          id: '520c4597-9a12-477f-9b4f-a5c5fcddc69b',
          userId: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
          status: 'on route',
          address: 'my address',
          totalPrice: 210,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          userId: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
          status: 'on route',
          address: 'my address',
          totalPrice: 210,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          userId: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
          status: 'on route',
          address: 'my address',
          totalPrice: 210,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          userId: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
          status: 'on route',
          address: 'my address',
          totalPrice: 210,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          userId: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
          status: 'on route',
          address: 'my address',
          totalPrice: 210,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          userId: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
          status: 'on route',
          address: 'my address',
          totalPrice: 210,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Orders', null, {});
     */
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
