const { PermissionFlagsBits } = require('discord.js')
module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`:x: **- Vous devez avoir la permission \`MANAGE_GUILD\` pour exécuter cette commande.**`)
        if(data.isGoodbyeEnabled === true) return message.channel.send(`${Bot.emotes.non} **- Le module est déjà activé !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ isGoodbyeEnabled: true })
        msg.edit(`${Bot.emotes.yep} **- Le module a bel et bien été activé ! Vous pouvez maintenant définir le salon d'au revoir si ce n'est pas déjà fait avec la commande \`setgoodbyechannel\`**`)
    },
    name: 'enablegoodbye',
    category: 'configuration',
    cooldown: '10s',
    aliases: ["eg"],
    help: {
        description: 'Permet d\'activer le module Goodbye',
        syntax: ''
    }
}