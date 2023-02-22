'use strict';

const { uuid } = require('uuidv4');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '3e985837-42b9-452a-a3b6-fbcc38447c9f',
          name: 'Sami Negash',
          email: 'smlnegash@gmail.com',
          roleId: '76be8b23-50b5-4f3a-8d28-9f736a47c4e6',
          password: 'samisami',

          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'Sami Negash',
          email: 'sml@gmail.com',
          roleId: '58582b39-1e49-4e3e-aedf-1ebd7239cc9a',
          password: 'samisami',

          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'Sami Negash',
          email: 'sml1@gmail.com',
          roleId: '58582b39-1e49-4e3e-aedf-1ebd7239cc9a',
          password: 'samisami',

          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'Sami Negash',
          email: 'sml2@gmail.com',
          roleId: '76be8b23-50b5-4f3a-8d28-9f736a47c4e6',
          password: 'samisami',

          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'Sami Negash',
          email: 'sml3@gmail.com',
          roleId: '76be8b23-50b5-4f3a-8d28-9f736a47c4e6',
          password: 'samisami',

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
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
