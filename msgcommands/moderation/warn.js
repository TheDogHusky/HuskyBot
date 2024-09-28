const { PermissionFlagsBits } = require('discord.js')
const Utils = require('../../Utils/Utils')

module.exports = {
    run: async (message, args, Bot, data) => {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu doit posséder la permission ManageMessages (de supprimer des messages) pour exécuter cette commande.**`);
        const member = message.mentions.members.first();
        if (!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Mentionne quelqu'un à warn !**`);
        if (member.id === message.guild.ownerId) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu ne peux pas warn le propriétaire du serveur !**`);
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerId) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Cet utilisateur est impossible à warn ! (il possède un rôle supérieur aux miens.)**`);
        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Veuillez indiquer une raison.**`);
        const warnObject = {
            reason,
            date: Date.now(),
            mod: message.author.id,
            victimID: member.id,
            warnID: Utils.generateID(19)
        };
        data.warns.push(warnObject);
        await data.updateOne(data);
        message.channel.send(`${Bot.emotes.yep} **-${member.user.tag} a été averti(e) avec pour raison : \`${reason}\`**`);
    },
    name: 'warn',
    guildOnly: true,
    category: "moderation",
    cooldown: '15s',
    aliases: ["w", "sanction", "avertissement"],
    help: {
        description: 'Permet d\'avertir la personne mentionnée.',
        syntax: '<mention> <raison>'
    }
};