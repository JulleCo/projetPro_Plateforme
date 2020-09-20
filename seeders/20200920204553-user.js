"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Doctor",
          lastName: "Who",
          email: "doctorwho@gmail.com,",
          password: "123Azerty.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Daria",
          lastName: "Morgendorffer",
          email: "daria@gmail.com,",
          password: "123Azerty.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Mononoke",
          lastName: "Princess",
          email: "mononoke@gmail.com,",
          password: "123Azerty.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Lisbeth",
          lastName: "Salander",
          email: "millenium@gmail.com,",
          password: "123Azerty.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
