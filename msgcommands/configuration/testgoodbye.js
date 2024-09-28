const { PermissionFlagsBits } = require('discord.js')
module.exports = {
    run: (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`:x: **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        if(data.isGoodbyeEnabled === false) return message.channel.send(`:x: **- Le module n'est pas activé \`enablegoodbye\`**`)
        if(!data || !data.goodbyeChannel) return message.channel.send(`:x: **- Il n'y a pas de données ou le salon n'est pas défini.**`)
        const gChannel = message.guild.channels.cache.get(data.goodbyeChannel)
        let gMessage = data.goodbyeMsg
        // Replacements
        gMessage = gMessage.replaceAll("%member%", message.member)
        gMessage = gMessage.replaceAll("%server.name%", message.guild.name)
        gMessage = gMessage.replaceAll("%server.memberCount%", message.guild.memberCount)
        gMessage = gMessage.replaceAll("%member.tag%", message.member.user.tag)
        // Envoi
        try {
            gChannel.send(gMessage)
        } catch(e) {
            return message.channel.send(`:x: **- Une erreur est survenue.** \n${e}`)
        }
    },
    name: 'testgoodbyemsg',
    cooldown: '10s',
    category: 'configuration',
    aliases: ["testgmsg", "testgoodbye"],
    help: {
        description: "Permet de tester si votre message d'au revoir est bon !\nVariables disponibles: `%member%`, `%member.tag%`, `%server.name%`, `%server.memberCount%`",
        syntax: ''
    }
}