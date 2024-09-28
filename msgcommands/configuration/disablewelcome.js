const { PermissionFlagsBits } = require('discord.js');


module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`:x: **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        if(data.isWelcomeEnabled === false) return message.channel.send(`${Bot.emotes.non} **- Le module est déjà désativé !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ isWelcomeEnabled: false })
        msg.edit(`${Bot.emotes.yep} **- Le module a bel et bien été désactivé !**`)
    },
    name: 'disablewelcome',
    category: "configuration",
    cooldown: '10s',
    aliases: ["dw"],
    help: {
        description: 'Permet de désactiver le module Welcome',
        syntax: ''
    }
}