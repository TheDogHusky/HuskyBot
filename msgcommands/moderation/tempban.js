const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')
const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.Administrator)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission ADMINISTRATEUR au bot.**`)
            if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu dois posséder la permission BAN_MEMBERS (nécéssaire pour bannir des membres) pour pouvoir bannir.**`)
            const member = message.mentions.members.first()
            if (!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Merci de mentionner la personne que je dois bannir.**`)
            if (member.id === message.guild.ownerID) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu ne peux pas bannir le/la propriétaire du serveur.**`)
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Cet utilisateur possède des rôles supérieurs aux miens. je ne peux donc pas le bannir.**`)
            if (member.permissions.has(PermissionFlagsBits.BanMembers)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Cette personne possède les mêmes permissions que moi, je ne peux donc pas le bannir.**`)
            const duration = parseDuration(args[1])
            if (!duration) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Veuillez indiquer une durée valide. (1j, 10mn, 50s, etc..)**`)
            const reason = args.slice(2).join(' ') || 'Raison non spécifiée'
            await member.ban({reason})
            message.channel.send(`${Bot.emotes.yep} **- ${member.user.tag} a été banni(e) pendant ${humanizeDuration(duration, { language: 'fr' })} !**\n\nNOTE: Le bot regarde les bannissements en base de données tout les minutes, ce qui fait que le bannissement peut être révoqué plus tard !`)
            const object = {
                UserID: member.id,
                Duration: duration,
                Reason: reason,
                Moderator: message.author.id,
                At: Date.now(),
            };
            data.bannedMembers.push(object);
            await data.updateOne(data);
    },
    name: 'tempban',
    guildOnly: true,
    cooldown: '15s',
    category: "moderation",
    aliases: [],
    help: {
        description: 'Permet de bannir temporairement la personne mentionnée.',
        syntax: '<mention> <temps> [raison]'
    }
}