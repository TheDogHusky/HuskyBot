const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`${Bot.emotes.non} **- Vous devez avoir la permission \`ManageGuild\` pour utiliser cette commande.**`)
        if(data.isSuggestionEnabled === false) return message.channel.send(`${Bot.emotes.non} **- Le système est déjà désactivé !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ isSuggestionEnabled: false })
        msg.edit(`${Bot.emotes.yep} **- Le module a bel et bien été désactivé !**`)
    },
    name: 'disablesugg',
    category: "suggestions",
    cooldown: '15s',
    aliases: ["ds"],
    help: {
        description: 'Permet désactiver le système de suggestions',
        syntax: ''
    }
}