const Discord = require("discord.js"),
    emotes = require('../../emotes.json')
module.exports = {
    run: async (message, args, Bot, data) => {
        const invite = await message.channel.createInvite({ maxAge: 0, maxUses: 0, reason: "Bump d'un serveur." })
        Bot.channels.cache.get("856187355823079424").send(`${emotes.prefixe} **- Un serveur à été bump:** ${message.guild.name}\nLien: ${invite}`)
        message.channel.send({embeds: [new Discord.EmbedBuilder()
            .setTitle(`${emotes.prefixe} - Bump Réussit`)
            .setURL("https://discord.gg/Dwsz33XjTs")
            .setDescription(`${emotes.yep} **- Ton bump a bien été fait ! Pour aller voir le résultat, rends toi sur [HuskyBot Support](https://discord.gg/Dwsz33XjTs)**`)
            .setColor("Random")
            .setTimestamp()]})
    },
    name: "bump",
    category: "utilitaire",
    guildOnly: true,
    aliases: ["mettre-en-avant"],
    help: {
        descritpion: "Permet de faire de la pub pour votre serveur !",
        syntax: ""
    },
    guildOnly: true,
    cooldown: "6h"
}