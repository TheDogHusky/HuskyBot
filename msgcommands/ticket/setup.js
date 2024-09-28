const { parseEmoji, PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`${Bot.emotes.non} **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send(`${Bot.emotes.non} **- Veuillez préciser le role staff à mentionner lors de l'ouverture d'un ticket.**`)
        const emojiMsg = args[1]
        if(!emojiMsg) return message.channel.send(`${Bot.emotes.non} **- Veuillez indiquer l'émoji du ticket.**`)
        const emoji = parseEmoji(emojiMsg)
        if(!emoji) return message.channel.send(`${Bot.emotes.non} **- L'émoji indiqué est invalide.**`)
        if(emoji.animated === true) return message.channel.send(`${Bot.emotes.non} **- L'émoji ne doit pas être animé !`)
        const category = args[2]
        if(category) {
            const msg = await message.channel.send(`${Bot.emotes.loading} **- Début du setup du système de ticket...**`)
            await data.updateOne({ ticketRole: role.id, ticketEmoji: emoji, ticketCategory: category })
            msg.edit(`${Bot.emotes.yep} **- Système correctement setup ! Vous pouvez faire dorénavant \`sendpanel\` pour envoyer le panel d'ouverture de tickets !**`)
        } else {
            const msg = await message.channel.send(`${Bot.emotes.loading} **- Début du setup du système de ticket...**`)
            await data.updateOne({ ticketRole: role.id, ticketEmoji: emoji })
            msg.edit(`${Bot.emotes.yep} **- Système correctement setup ! Vous pouvez faire dorénavant \`sendpanel\` pour envoyer le panel d'ouverture de tickets !**`)
        }
    },
    name: 'setup',
    cooldown: '15s',
    category: 'ticket',
    aliases: ["setup-tickets"],
    help: {
        description: 'Permet de setup le système de ticket',
        syntax: '<@role> <emoji ticket> [ID catégorie]'
    }
}