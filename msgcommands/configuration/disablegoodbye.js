const { PermissionFlagsBits } = require('discord.js')


module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`:x: **- Vous devez avoir la permission \`MANAGE_GUILD\` pour exécuter cette commande.**`)
        if(data.isGoodbyeEnabled === false) return message.channel.send(`${Bot.emotes.non} **- Le module est déjà désativé !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ isGoodbyeEnabled: false })
        msg.edit(`${Bot.emotes.yep} **- Le module a bel et bien été désactivé !**`)
    },
    name: 'disablegoodbye',
    category: 'configuration',
    cooldown: '10s',
    aliases: ["dg"],
    help: {
        description: 'Permet de désactiver le module Goodbye',
        syntax: ''
    }
}