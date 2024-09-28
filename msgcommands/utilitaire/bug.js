const Discord = require('discord.js')
const emotes = require("../../emotes.json")

module.exports = {
	run: (message, args, Bot, data) => {
        if(!args[0]) return message.channel.send(`${emotes.non} **- Waouf ! Merci d'indiquer un bug à reporter !**`)
        message.delete()
        Bot.channels.cache.get('854058538452516905').send({embeds: [new Discord.EmbedBuilder()
        	.setAuthor(`${message.author.username}`, message.author.avatarURL())
            .setDescription(`${args.slice(0).join(' ')}`)
            .setTitle(`Bug Report`)
            .setFooter({ text: 'Nouveau Bug - HuskyBot', iconURL: Bot.user.avatarURL({ extension: 'webp', size: 2048 }) })
           	.setColor('#ff0000')
            .setTimestamp()]})
        message.channel.send(`${emotes.yep} **- Votre bug à bien été envoyé. Merci d\'avoir report un bug !**`)
    },
    name: 'bug',
    category: "utilitaire",
    cooldown: '30s',
    aliases: ["erreur"],
    help: {
        description: 'Permet de report un bug sur le bot.',
        syntax: '<bug>'
    }
}