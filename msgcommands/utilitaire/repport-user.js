const Discord = require('discord.js'),
    emotes = require('../../emotes.json')

module.exports = {
	run: (message, args, Bot, data) => {
        if(!args[0]) return message.channel.send(`${emotes.non} **- Waouf ! Merci d'indiquer le report à transmettre !**`);
        message.delete()
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
            .setDescription(`> ${args.slice(0).join(' ')}`)
            .setTitle(`${emotes.warn} - Utilisateur Report`)
            .setFooter({ text: 'Nouveau Report - HuskyBot', iconURL: Bot.user.avatarURL({ extension: 'webp', size: 2048 }) })
            .setColor('#ff0000')
            .setTimestamp();
        Bot.channels.cache.get('854058538452516905').send({embeds: [embed]})
        message.channel.send(`${emotes.yep} - **Le report à bien été transmis. Merci !**`)
    },
    name: 'report',
    category: "utilitaire",
    cooldown: '30s',
    aliases: [],
    help: {
        description: 'Permet de report un utilisateur sur le bot.',
        syntax: '<bug>'
    }
}