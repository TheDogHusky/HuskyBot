const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`${Bot.emotes.non} **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        const newPrefix = args[0]
        if(!newPrefix) return message.channel.send(`${Bot.emotes.non} **- Merci d'indiquer le nouveau préfixe (argument 0)**`)
        if(newPrefix.length > 6 || newPrefix.length < 1) return message.channel.send(`${Bot.emotes.non} **- Le nouveau préfixe doit être entre 1 et 6 caractères.**`)
        if(newPrefix === data.Prefix) return message.channel.send(`${Bot.emotes.non} **- Le préfixe que vous essayez de remplacer est le même que le préfixe actuel.**`)
        try {
            const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
            await data.updateOne({ Prefix: newPrefix })
            msg.edit(`${Bot.emotes.yep} **- Le préfixe à bien été changé !**`)
        } catch {
            message.channel.send(`${Bot.emotes.non} **- Une erreur est survenue lors de la mise à jour du schéma.**`)
        }
    },
    name: 'prefix',
    category: 'configuration',
    cooldown: '5s',
    aliases: ["préfixe", "newprefix"],
    help: {
        description: 'Update le préfixe du bot sur le serveur où est exécuté la commande.',
        syntax: '<new prefix>'
    }
}