const { PermissionFlagsBits } = require('discord.js')
module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`:x: **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        nwelcomemsg = args.slice(0)
        if(!nwelcomemsg) return message.channel.send(`${Bot.emotes.non} **- Merci d'indiquer le nouveau message de bienvenue !**`)
        if(nwelcomemsg === data.welcomeMsg) return message.channel.send(`${Bot.emotes.non} **- Vous ne pouvez pas mettre le même message de bienvenue que le précédent !**`)
        const msg = await message.channel.send(`${Bot.emotes.loading} **- Enregistrement des changements en cours...**`)
        await data.updateOne({ welcomeMsg: `${nwelcomemsg.join(" ")}` })
        msg.edit(`${Bot.emotes.yep} **- Le message de bienvenue a bien été changé !**`)
    },
    name: 'setwelcomemsg',
    category: "configuration",
    cooldown: '10s',
    aliases: ["swmsg", "setmessagedebienvenue"],
    help: {
        description: 'Permet de définir le message de bienvenue',
        syntax: '<nouveau message>'
    }
}