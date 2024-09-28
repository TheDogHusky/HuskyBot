const { Message, PermissionFlagsBits, GuildMember, User } = require("discord.js");

module.exports = {
    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {*} Bot 
     * @param {*} data 
     */
    run: async (message, args, Bot, data) => {
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.Administrator)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission ADMINISTRATEUR au bot.**`).catch(err => {});
        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu n'a pas la permission nécéssaire pour cette commande. (Bannir des membres)**`)
        const member = message.mentions.members.first() || await Bot.users.fetch(args[0]);
        if (!member || !member instanceof (GuildMember || User)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Mentionne la personne que je doit bannir ou indique son identifiant.**`);
        const userdata = data.bannedMembers.find(object => object.UserID === member.id);
        let warning;
        if(!userdata) warning = `NOTE: Cette personne n'était pas bannie temporairement par le bot ou n'a pas été sauvegardée en base de données.`;
        else warning = `NOTE: Cette personne avait été banni(e) par le bot avec pour raison : \`${userdata.Reason}\``;
        if(!member.user) member.user = member;
        await message.guild.members.unban(member.id, `${message.author.tag} a demandé à débannir ${member.user.tag}`);
        message.channel.send(`${Bot.emotes.yep} **- ${member.user.tag} a été débanni(e)**${warning ? `\n\n${warning}` : ''}`);
        if(userdata) {
            await data.updateOne({ $pull: { bannedMembers: userdata } });
        };
    },
    name: 'unban',
    category: 'moderation',
    cooldown: '10s',
    aliases: ["débannir", "deban"],
    help: {
        description: 'Permet de débannir un membre du serveur.',
        syntax: '<@mention (l\'utilisateur à débannir)>'
    }
};