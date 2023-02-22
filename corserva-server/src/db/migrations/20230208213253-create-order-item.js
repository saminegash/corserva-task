'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: 'Orders',
          key: 'id'
        },
        allowNull: false
      },
      itemId: {
        type: Sequelize.UUID,
        references: {
          model: 'Items',
          key: 'id'
        },
        allowNull: false
      },

      totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};
