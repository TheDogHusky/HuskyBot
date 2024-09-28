const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.Administrator)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission ADMINISTRATEUR au bot.**`)
        if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu dois pouvoir expulser des membres pour exécuter cette commande.**`)
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Merci de mentionner quelqu'un à expulser.**`)
        if (member.id === message.guild.ownerID) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu ne peux pas expulser le propriétaire du serveur.**`)
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu ne peux pas expulser ce membre.**`)
        if (!member.kickable) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Le bot ne peut pas expulser ce membre.**`)
        const reason = args.slice(1).join(' ') || 'Raison non spécifiée'
        await member.kick(reason)
        message.channel.send(`${Bot.emotes.yep} **-${member.user.tag} a été expulsé(e) avec pour raison : \`${reason}\`**`)
    },
    name: 'kick',
    guildOnly: true,
    cooldown: '15s',
    category: "moderation",
    aliases: ["expulser", "dégage"],
    help: {
        description: 'Permet d\'expulser la personne mentionnée',
        syntax: '<mention> [raison]'
    }
}