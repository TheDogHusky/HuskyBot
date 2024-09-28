const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
            if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu ne possèdes pas la permission nécéssaire. (Administrateur)`)
            message.delete()
            message.channel.send(`${args.slice(0).join(' ')}`)
    },
    name: 'say',
    category: "fun",
    aliases: ["dire"],
    cooldown: '10s',
    help: {
        description: 'Cette commande permet de faire parler le bot !',
        syntax: '<message>'
    }
}