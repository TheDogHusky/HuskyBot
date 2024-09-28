const Discord = require('discord.js')

module.exports = {
    run: (message, args, Bot, data) => {
        const embed = new Discord.EmbedBuilder()
        embed.setTitle(`**🤝Partenaires - HuskyBot🤝**`)
        embed.setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL({ size: 2048, format: 'webp', dynamic: true }) })
        embed.addFields(
            { name: "1 - **🌸Yuzuru🌸**", value: `> Yuzuru est un bot anglais et français qui permet de créer des compteurs 100% personnalisables ! \n> [🌸Invite🌸](https://discord.com/api/oauth2/authorize?client_id=812755148601688134&permissions=2151148624&scope=bot) || [🌸Support🌸](https://discord.gg/5DKSrjjQp6)` },
            { name: "2 - 🌿**Winter**🌿", value: `> Winter est un bot Discord multifonctions avec beaucoup de fonctionnalités ! \n> [🌿Invite🌿](https://discord.com/oauth2/authorize?client_id=736245905514037360&scope=bot%20applications.commands) || [🌿Support🌿](https://discord.gg/WKPWfUBBbS)` },
            { name: "3 - 🦅**ConstEagle**🦅", value: `> ConstEagle est une botlist (liste de bots) qui vous permet de publier votre bot et de le rendre plus connu ! \n> [🦅Site Web🦅](https://consteagle.com) || [🦅Discord🦅](https://discord.gg/5xEab6tnDe)` },
            { name: "4 - **📹CinéPub📹**", value: `> CinéPub est un serveur publicitaire actif possédant de nombreux giveaways !\n> [📹Lien📹](https://discord.gg/tA5ww2JZkJ)` }
        )
        embed.setColor('00f7ff')
        embed.setFooter({ text: `Partenaires - ${message.author.username}`, iconURL: message.guild.iconURL({ size: 2048, format: 'webp', dynamic: true }) })
        message.channel.send({embeds: [embed]})
    },
    name: "partenaires",
    category: "utilitaire",
    cooldown: '3s',
    aliases: ["partners", "merci-a-eux"],
    help: {
        description: "Permet de voir les partenaires du bot !",
        syntax: ""
    }
}