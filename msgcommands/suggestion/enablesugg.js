const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`${Bot.emotes.non} **- Vous devez avoir la permission \`ManageGuild\` pour utiliser cette commande.**`)
        if(data.isSuggestionEnabled === true) return message.channel.send(`${Bot.emotes.non} **- Le système est déjà activé !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ isSuggestionEnabled: true })
        msg.edit(`${Bot.emotes.yep} **- Le module a bel et bien été activé ! Vous pouvez le configurer si ce n'est pas déjà fait avec la commande \`setupsugg\`.**`)
    },
    name: 'enablesugg',
    cooldown: '15s',
    category: 'suggestions',
    aliases: ["es"],
    help: {
        description: 'Permet d\'activer le système de suggestions',
        syntax: ''
    }
}