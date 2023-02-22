'use strict';

const { uuid } = require('uuidv4');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('Items', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Items',
      [
        // {
        //   id: '8b073a8b-1b74-4e92-8bea-8b6404ef1ff1',
        //   name: 'Pc',
        //   vendorName: 'Samuel',
        //   description: 'bla bla bla',
        //   photo:
        //     'https://images.pexels.com/photos/15212819/pexels-photo-15212819.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        //   price: 23,
        //   quantity: 10,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        {
          id: uuid(),
          name: 'Camera',
          vendorName: 'Samuel',
          description: 'bla bla bla',
          photo:
            'https://images.pexels.com/photos/4345944/pexels-photo-4345944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 10,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'Computer',
          vendorName: 'Samuel',
          description: 'bla bla bla',
          photo:
            'https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 150,
          quantity: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'PC',
          vendorName: 'Samuel',
          description: 'bla bla bla',
          photo:
            'https://images.pexels.com/photos/3042508/pexels-photo-3042508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 260,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'Fruits',
          vendorName: 'Samuel',
          description: 'bla bla bla',
          photo:
            'https://images.pexels.com/photos/709567/pexels-photo-709567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 13,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '8b073a8b-1b74-4e92-8bea-8b6404ef1ff1',
          name: 'Pc',
          vendorName: 'Samuel',
          description: 'bla bla bla',
          photo:
            'https://images.pexels.com/photos/15212819/pexels-photo-15212819.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
          price: 23,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'Camera',
          vendorName: 'Samuel',
          description: 'bla bla bla',
          photo:
            'https://images.pexels.com/photos/4345944/pexels-photo-4345944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 10,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'Computers',
          vendorName: 'Samuel',
          description: 'bla bla bla',
          photo:
            'https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 150,
          quantity: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'PC',
          vendorName: 'Samuel',
          description: 'bla bla bla',
          photo:
            'https://images.pexels.com/photos/3042508/pexels-photo-3042508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 260,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: 'Fruits',
          vendorName: 'Samuel',
          description: 'bla bla bla',
          photo:
            'https://images.pexels.com/photos/709567/pexels-photo-709567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          price: 13,
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
     * await queryInterface.bulkDelete('Items', null, {});
     */
    await queryInterface.bulkDelete('Items', null, {});
  }
};
