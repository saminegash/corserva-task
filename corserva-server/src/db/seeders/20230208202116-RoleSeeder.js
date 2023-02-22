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
      'Roles',
      [
        {
          id: '76be8b23-50b5-4f3a-8d28-9f736a47c4e6',
          roleName: 'Super Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '521fae64-df67-4caf-b812-c85021e114fa',
          roleName: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '58582b39-1e49-4e3e-aedf-1ebd7239cc9a',
          roleName: 'User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          roleName: 'User',
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
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
