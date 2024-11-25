module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true, // Opsional
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'phoneNumber');
  },
};
