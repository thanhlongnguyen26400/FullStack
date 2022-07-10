'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'thanhlongnguyen26400@gmail.com',
      password: '123',
      firstName: 'Nguyen',
      lastName: 'Thanh Long',
      address: 'Tan Dan - Hai Phong',
      gender: '1',
      phoneNumber: '0337442286',
      image: '',
      roleId: 'Role',
      positionId: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
