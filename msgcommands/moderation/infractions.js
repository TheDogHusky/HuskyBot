const moment = require('moment'),
    Discord = require('discord.js'),
    { PermissionFlagsBits } = require('discord.js')
moment.updateLocale('fr')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.Administrator)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission ADMINISTRATEUR au bot.**`)
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Merci de mentionner la personne dont tu veux voir les warns.**`)
        let warns = data.warns.filter(warn => warn.victimID === member.id)
        if (warns.length === 0 || !warns) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Cet utilisateur ne possède pas de warns, ou ils n'ont pas été sauvegardés dans la base de données..**`)
        message.channel.send({ embeds: [new Discord.EmbedBuilder()
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
        .setDescription(`${Bot.emotes.mod.main}・**Total de warns**: ${warns.length}\n\n${Bot.emotes.serveurs}・**10 Derniers Warns**\n\n${warns.slice(0, 10).map((warn, i) => `**${i + 1}**・\`${warn.reason}\`\n> Sanctionné ${moment(warn.date).locale("FR").fromNow()} par <@!${warn.mod}>\n> ID: \`${warn.warnID}\``).join('\n')}`)
        .setTimestamp()
        .setColor('#00f7ff)')]});
    },
    name: 'infractions',
    category: "moderation",
    cooldown: '15s',
    aliases: ["sanction", "warns"],
    guildOnly: true,
    help: {
        description: 'Permet de voir les warns de la personne mentionnée.',
        syntax: '<mention>'
    }
    
};