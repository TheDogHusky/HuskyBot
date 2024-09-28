const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.Administrator)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission ADMINISTRATEUR au bot.**`)
            if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu dois pouvoir supprimer des messages pour rendre la parole !**`)
            const member = message.mentions.members.first()
            if (!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Mentionne le membre à unmute !**`)
            if (member.id === message.guild.ownerID) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Cet utilisateur est le créateur (owner) du serveur. Je ne peux donc rien lui faire.**`)
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Cet utilisateur possède des rôles supérieurs ou égaux aux miens je ne peux donc pas lui rendre la parole.**`)
            if (!member.manageable) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Ce membre n'est pas mutable ou gérable. (condition !member.manageable)**`)
            await member.timeout(null);
            message.channel.send(`${Bot.emotes.yep} **- ${member} a été unmute !**`)
    },
    name: 'unmute',
    guildOnly: true,
    category: "moderation",
    cooldown: '15s',
    aliases: ["dé-muet"],
    help: {
        description: 'Permet de rendre la parole à la pesonne mentionnée.',
        syntax: '<mention>'
    }
}