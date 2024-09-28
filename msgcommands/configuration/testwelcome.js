const { PermissionFlagsBits } = require('discord.js')
module.exports = {
    run: (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`:x: **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        if(data.isWelcomeEnabled === false) return message.channel.send(`${Bot.emotes.non} **- Le module n'est pas activé \`enablewelcome\`**`)
        if(!data || !data.welcomeChannel) return message.channel.send(`${Bot.emotes.non} **- Il n'y a pas de données ou le salon n'est pas défini.**`)
        const wChannel = message.guild.channels.cache.get(data.welcomeChannel)
        let wMessage = data.welcomeMsg
        // Replacements
        wMessage = wMessage.replaceAll("%member%", message.member)
        wMessage = wMessage.replaceAll("%server.name%", message.guild.name)
        wMessage = wMessage.replaceAll("%server.memberCount%", message.guild.memberCount)
        wMessage = wMessage.replaceAll("%member.tag%", message.member.user.tag)
        // Envoi
        try {
            wChannel.send(wMessage)
        } catch(e) {
            return message.channel.send(`${Bot.emotes.bug} **- Une erreur est survenue.** \n${e}`)
        }
    },
    name: 'testwelcomemsg',
    category: 'configuration',
    cooldown: '10s',
    aliases: ["testwelcome"],
    help: {
        description: "Permet de tester si votre message de bienvenue est bon !\nVariables disponibles: `%member%`, `%member.tag%`, `%server.name%`, `%server.memberCount%`",
        syntax: ''
    }
}