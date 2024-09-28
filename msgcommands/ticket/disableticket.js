const { PermissionFlagsBits } = require('discord.js')


module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`${Bot.emotes.non} **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        if(data.isTicketEnabled === false) return message.channel.send(`${Bot.emotes.non} **- Le module est déjà désactivé !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ isTicketEnabled: false })
        msg.edit(`${Bot.emotes.yep} **- Le module a bel et bien été désactivé ! Si vous souhaitez le réactiver, exécutez la commande \`enableticket\` !**`)
    },
    name: 'disableticket',
    category: 'ticket',
    cooldown: '15s',
    aliases: ["dt", "disableticketsystem"],
    help: {
        description: 'Permet de désactiver le module Ticket',
        syntax: ''
    }
}