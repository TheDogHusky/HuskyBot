const { Message } = require('discord.js');
const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    /**
     * 
     * @param {Message} message 
     * @param {array} args 
     * @param {Client} Client 
     * @param {*} data 
     * @param {*} userData 
     */
    run: async (message, args, Client, data, userData) => {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu dois pouvoir supprimer des messages pour retirer un avertissement !**`)
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(`${Client.emotes.non} **- Mentionne quelqu'un à unwarn !**`)
        const warns = data.warns.filter(warn => warn.victimID === member.id);
        if (warns.length === 0 || !warns) return message.channel.send(`${Client.emotes.non} **- Cet utilisateur ne possède pas de warns, ou ils n'ont pas été sauvegardés dans la base de données..**`);
        const num = args[1];
        if(!num) return message.channel.send(`${Client.emotes.non} **- Veuillez indiquer le Numéro du warn, son ID ou la raison.**`);
        const warnRequested = warns[num] || warns.find(warn => warn.warnID === num) || warns.find(warn => warn.reason.includes(args.slice(1).join(' ')));
        if(!warnRequested) return message.channel.send(`${Client.emotes.non} **- Aucun warn trouvé avec l'entrée. (Numéro du warn, son ID ou la raison)**`);
        await data.updateOne({ $pull: { warns: warnRequested } });
        message.channel.send(`${Client.emotes.yep} **- ${member.user.tag} a été unwarn. Le warn était: \`${warnRequested.reason}\`**`);
    },
    name: 'unwarn',
    category: 'moderation',
    cooldown: '15s',
    aliases: ["désavertir"],
    staffneeded: 2,
    help: {
        description: 'Permet de retirer un avertissement d\'un utilisateur.',
        syntax: '<@mention> <warn>'
    }
};