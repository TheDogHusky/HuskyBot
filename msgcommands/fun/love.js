const { EmbedBuilder } = require('discord.js')

module.exports = {
    run: (message, args, Bot, data) => {
            const member = message.mentions.members.first()
            if(!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Mentionne quelqu\'un.**`)
            const pourcentage = Math.floor(Math.random()*100)
            const response = new EmbedBuilder()
                .setTitle('❤️**Pourcentage d\'amour !**❤️')
                .setDescription(`**Hmmmm... Mon instinct de chien me dit que...**\n${message.author.username} et ${member.user.username} = **❤️${pourcentage}%❤️ d'amour !**`)
                .setColor('#ff0000')
            message.channel.send({embeds: [response]})
    },
    name: 'amour',
    category: "fun",
    cooldown: '3s',
    aliases: ["love"],
    help: {
        description: 'Permet de voir le pourcentage d\'amour entre toi et quelqu\'un !',
        syntax: '<@mention>'
    }
}