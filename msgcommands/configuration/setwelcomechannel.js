const { PermissionFlagsBits } = require('discord.js')
module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`:x: **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        const wchannel = message.mentions.channels.first()
        if(!wchannel) return message.channel.send(`${Bot.emotes.non} **- Merci d'indiquer le salon de bienvenue**`)
        if(wchannel.id === data.welcomeChannel) return message.channel.send(`${Bot.emotes.non} **- Le nouveau salon de bienvenue ne peut pas être le même que le précédent.**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ welcomeChannel: wchannel.id })
        msg.edit(`${Bot.emotes.yep} **- Le salon a bien été mis à jour !**`)
    },
    name: 'setwelcomechannel',
    category: 'configuration',
    cooldown: '10s',
    aliases: ["swc", "setwelchannel"],
    help: {
        description: "Définir le salon de bienvenue",
        syntax: "<#salon>"
    }
}