const fetch = require("node-fetch"),
      { EmbedBuilder } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
            const dog = await fetch("http://dog.ceo/api/breeds/image/random")
                .then(res => res.json())
                .then(json => json.message);

            const embed = new EmbedBuilder()
                .setTitle("Waouf 🐶")
                .setImage(dog)
                .setFooter({ text: "Votre Meilleur companion (mieux que votre EX)" });

            message.channel.send({embeds: [embed]})
    },
    name: 'dog',
    category: "fun",
    cooldown: '3s',
    aliases: ["chien"],
    help: {
        description: 'Permet d\'avoir une image de chien aléatoire',
        syntax: ''
    }
}