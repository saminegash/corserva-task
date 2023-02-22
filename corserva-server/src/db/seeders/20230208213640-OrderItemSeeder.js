'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('OrderItems', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'OrderItems',
      [
        {
          orderId: '520c4597-9a12-477f-9b4f-a5c5fcddc69b',
          itemId: '8b073a8b-1b74-4e92-8bea-8b6404ef1ff1',
          totalPrice: 100,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId: '520c4597-9a12-477f-9b4f-a5c5fcddc69b',
          itemId: '8b073a8b-1b74-4e92-8bea-8b6404ef1ff1',
          totalPrice: 100,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId: '520c4597-9a12-477f-9b4f-a5c5fcddc69b',
          itemId: '8b073a8b-1b74-4e92-8bea-8b6404ef1ff1',
          totalPrice: 100,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          orderId: '520c4597-9a12-477f-9b4f-a5c5fcddc69b',
          itemId: '8b073a8b-1b74-4e92-8bea-8b6404ef1ff1',
          totalPrice: 100,
          quantity: 100,
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
     * await queryInterface.bulkDelete('OrderItems', null, {});
     */
    await queryInterface.bulkDelete('OrderItems', null, {});
  }
};
