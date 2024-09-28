const { PermissionFlagsBits } = require('discord.js')
module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`:x: **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        const ngoodbyemsg = args.slice(0)
        if(!ngoodbyemsg) return message.channel.send(`${Bot.emotes.non} **- Merci d'indiquer le nouveau message d'au revoir !**`)
        if(ngoodbyemsg === data.goodbyeMsg) return message.channel.send(`${Bot.emotes.non} **- Vous ne pouvez pas mettre le même message d'au revoir que le précédent !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ goodbyeMsg: `${ngoodbyemsg.join(" ")}` })
        msg.edit(`${Bot.emotes.yep} **- Le message d'au revoir a bien été changé !**`)
    },
    name: 'setgoodbyemsg',
    category: 'configuration',
    cooldown: '10s',
    aliases: ["sgm", "sgmsg"],
    help: {
        description: 'Permet de définir le message d\'au revoir',
        syntax: '<nouveau message>'
    }
}