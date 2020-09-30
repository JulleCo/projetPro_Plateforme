"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Places",
      [
        {
          type: "canapé",
          location: "paris XXe",
          animaux: "3 chats",
          personMax: 2,
          description:
            "Not all people who wander are lost. He's in a boy band which doesn't make much sense for a snake.",
          userId: 3,
          picture: "Right Off the Bat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "chambre d'ami",
          location: "Montreuil",
          animaux: "non",
          personMax: 4,
          description: "Lightning Paradise was the local hangout joint where the group usually ended up spending the night. She says she has the ability to hear the soundtrack of your life.",
          userId: 1,
          picture: "Cry Over Spilt Milk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "tout l'appart",
          location: "St Ouen",
          animaux: "des poissons rouges",
          personMax: 3,
          description: "Greetings from the galaxy MACS0647-JD, or what we call home.",
          userId: 2,
          picture: "Jack of All Trades Master of None",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Places", null, {});
  },
};
