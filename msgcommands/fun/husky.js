const fetch = require("node-fetch"),
      { EmbedBuilder } = require('discord.js')

module.exports = {
	run: async (message, args, Bot, data) => {
            const husky = await fetch("https://dog.ceo/api/breed/husky/images/random")
                .then(res => res.json())
                .then(json => json.message);

            const embed = new EmbedBuilder()
                .setTitle("Waouf 🐶 ! Meilleur chien")
                .setImage(husky)
                .setFooter({ text: "Votre Meilleur companion (mieux que votre EX)" });

            message.channel.send({embeds: [embed]})
    },
    name: 'husky',
    category: "fun",
    aliases: ["commande-sublime", "huskie"],
    cooldown: '3s',
    help: {
        description: 'Permet de voir des images de huskies aléatoirement',
        syntax: ''
    }
}