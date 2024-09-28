const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')
const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.Administrator)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission ADMINISTRATEUR au bot.**`)
            if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return message.channel.send(`${Bot.emotes.non} **- Vous n'avez pas la permission nécéssaire.**`)
            const member = message.mentions.members.first();
            if (!member) return message.channel.send(`${Bot.emotes.non} **- Veuillez mentionner le membre que je dois mute !**`)
            if (member.id === message.guild.ownerID) return message.channel.send(`${Bot.emotes.non} **- Je ne peux pas sanctionner de quelque soit la façon le propriétaire du serveur.**`)
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerId) return message.channel.send(`${Bot.emotes.non} **- Vous ne pouvez pas mute ce membre.**`)
            if (!member.manageable) return message.channel.send(`${Bot.emotes.non} **- Ce membre n'est pas gérable. (Condition member.manageable)**`)
            const duration = parseDuration(args[1])
            if (!duration) return message.channel.send(`${Bot.emotes.non} **- Veuillez indiquer une durée valide.**`)
            const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
            await member.timeout(duration, reason);
            message.channel.send(`${Bot.emotes.yep} **- ${member} a été mute pendant \`${humanizeDuration(duration, {language: 'fr'})}\`**`)
    },
    name: 'tempmute',
    guildOnly: true,
    cooldown: '15s',
    category: "moderation",
    aliases: ["muet-temp"],
    help: {
        description: 'Permet de rendre muet temporairement la personne mentionnée. Les permissions nécéssaires sont les mêmes que le mute.',
        syntax: '<mention> <temps> [raison]'
    }
}