const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`${Bot.emotes.non} **- Vous devez avoir la permission \`ManageGuild\` pour utiliser cette commande.**`)
        const channel1 = message.mentions.channels.first()
        if(!channel1) return message.channel.send(`${Bot.emotes.non} **- Merci de mentionner le salon de visionnage des commandes suggestion !**`)
        if(channel1.id === data.suggestionViewChannel) return message.channel.send(`${Bot.emotes.non} **- Le nouveau salon ne peux pas être le même que le précédent !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Début du setup du système de suggestions en cours...**`)
        await data.updateOne({ suggestionViewChannel: channel1.id })
        msg.edit(`${Bot.emotes.yep} **- Le système à correctement été setup ! Vous pouvez dès maintenant si ce n'est pas déjà fait activer le système avec la commande \`enablesugg\`.**`)
    },
    name: 'setupsugg',
    category: 'suggestions',
    cooldown: '15s',
    aliases: ["setups", "setupsuggestions"],
    help: {
        description: 'Permet de setup le système de suggestions || Le salon est le salon de visualisation des suggestions.',
        syntax: '<#salon>'
    }
}