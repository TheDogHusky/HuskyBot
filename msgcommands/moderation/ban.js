const Discord = require('discord.js'),
    { PermissionFlagsBits } = require('discord.js'),
    HuskyBot = require('../../Utils/HuskyBot');

module.exports = {
    /**
     * 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     * @param {HuskyBot} Bot 
     * @param {*} data 
     * @returns 
     */
    run: async (message, args, Bot, data) => {
        if (!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.Administrator)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission ADMINISTRATEUR au bot.**`);
        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu n'a pas la permission nécéssaire pour cette commande. (Bannir des membres)**`);
        const member = message.mentions.members.first();
        if (!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Mentionne la personne que je doit bannir.**`);
        if (member.id === message.guild.ownerID) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu peux pas bannir le fondateur du serveur.**`);
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Cette personne possède des rôles supérieurs ou égaux aux miens.**`);
        if (!member.bannable) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Cette personne n'est pas bannissable.**`);
        const reason = args.slice(1).join(' ') || 'Raison non spécifiée';
        await member.ban({ reason });
        message.channel.send(`${Bot.emotes.yep} **- ${member.user.tag} a été banni(e) avec pour raison : \`${reason}\`**`);
    },
    name: 'ban',
    guildOnly: true,
    category: "moderation",
    aliases: [],
    help: {
        description: 'Cette commande permet de bannir la personne mentionnée.',
        syntax: '<mention> [raison]'
    }
}