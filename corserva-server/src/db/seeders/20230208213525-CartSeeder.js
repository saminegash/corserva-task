'use strict';

const { uuid } = require('uuidv4');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('Carts', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Carts',
      [
        {
          id: '05d76558-937d-413e-a2bf-1ac0f4519999',
          userId: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          userId: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          userId: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
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
     * await queryInterface.bulkDelete('Carts', null, {});
     */
    await queryInterface.bulkDelete('Carts', null, {});
  }
};
