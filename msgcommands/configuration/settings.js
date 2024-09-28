const { MessageEmbed, EmbedBuilder } = require("discord.js")

module.exports = {
    run: async (message, args, Bot, data) => {
        let rolestaff
        if(data.ticketRole) rolestaff = await message.guild.roles.fetch(data.ticketRole).id; else rolestaff = "`Non configuré`"


        const embed = new EmbedBuilder()
            .setTitle("⚙️Configurations Actuelles⚙️")
            .setThumbnail(message.guild.iconURL())
            .setFooter({ text: `Settings - ${message.author.username}`, iconURL: 'https://cdn.discordapp.com/attachments/774343135198707792/815174792960409631/husky_logo.jpg' })
            .setTimestamp()
            .setColor('#00f7ff')
            .addFields(
                { name: `${Bot.emotes.people}・Système de bienvenue`, value: `> **Activé:** ${data.isWelcomeEnabled ? "`oui`" : "`non`"}\n> **Message:** \`${data.welcomeMsg}\`\n> **Salon:** \`${data.welcomeChannel ? `${data.welcomeChannel}` : "Non configuré."}\`` },
                { name: `${Bot.emotes.mod.main}・Système d'au revoir`, value: `> **Activé:** ${data.isGoodbyeEnabled ? "`oui`" : "`non`"}\n> **Message:** \`${data.goodbyeMsg}\`\n> **Salon:** \`${data.goodbyeChannel ? `${data.goodbyeChannel}` : "Non configuré."}\`` },
                { name: `${Bot.emotes.prefixe}・Préfixe`, value: `> \`${data.Prefix}\`` },
                { name: `${Bot.emotes.ticket.main}・Système de tickets`, value: `> **Activé:** \`${data.isTicketEnabled ? "`oui`" : "`non`"}\`\n> **Catégorie:** ${data.ticketCategory ? `\`${data.ticketCategory}\`` : "`Non configuré`"}\n> **Role staff à mentionner:** ${rolestaff}\n> **Emoji:** ${data.ticketEmoji ? `${data.ticketEmoji}` : "`Non configuré`"}` },
            );
        message.channel.send({ embeds: [embed] })
    },
    name: 'settings',
    category: 'configuration',
    cooldown: '5s',
    aliases: ["view-settings", "viewsettings", "se", "vs", "vse"],
    help: {
        description: 'Permet de voir la configuration actuelle de votre serveur !',
        syntax: ''
    }
}