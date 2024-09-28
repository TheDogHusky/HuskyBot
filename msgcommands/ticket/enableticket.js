const { PermissionFlagsBits } = require('discord.js')


module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`${Bot.emotes.non} **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        if(data.isTicketEnabled === true) return message.channel.send(`${Bot.emotes.non} **- Le module est déjà activé !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ isTicketEnabled: true })
        msg.edit(`${Bot.emotes.yep} **- Le module a bel et bien été activé ! Vous pouvez maintenant setup le système correctement avec la commande \`setup\` !**`)
    },
    name: 'enableticket',
    category: 'ticket',
    cooldown: '15s',
    aliases: ["et", "enableticketsystem"],
    help: {
        description: 'Permet d\'activer le module Ticket',
        syntax: ''
    }
}