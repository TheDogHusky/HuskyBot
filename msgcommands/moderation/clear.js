const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.Administrator)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission ADMINISTRATEUR au bot.**`)
            if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Tu dois pouvoir supprimer des messages pour faire un clear.**`)
            const count = args[0]
            if (!/\d+/.test(count)) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Indique moi le nombre de messages que tu veux que je supprime.**`)
            if (count < 1 || count > 99) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Je ne peux supprimer des messages que si ils sont 1 ou moins que 99.**`)
            const { size } = await  message.channel.bulkDelete(Number(count) + 1, true)
            const msg = await message.channel.send(`${Bot.emotes.yep} **- \`${size - 1}\` message(s) suprimé(s)**`)
            setTimeout(() => msg.delete(), 5e3)
    },
    name: 'clear',
    guildOnly: true,
    category: "moderation",
    aliases: ["bulk-delete"],
    help: {
        description: 'Permet de supprimer un nombre d emessages entre 1 et 99',
        syntax: '<nombre>'
    }
}