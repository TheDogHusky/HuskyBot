const gifAPI = require('anime-images-api')
const Discord = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        const api = new gifAPI();
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Merci de mentionner le membre que tu veux taper !!!**`)
        let { image } = await api.sfw.punch();
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.author.username}`, value: message.author.avatarURL() })
            .setTitle('👊Coup de poing👊')
            .setDescription(`**${message.author.username} frappe ${member.user.tag}**`)
            .setImage(image)
            .setColor('Fuchsia')
        message.channel.send({embeds: [embed]})
    },
    name: "punch",
    aliases: ["frapper", "frappe"],
    cooldown: '10s',
    category: "fun",
    help: {
        description: "Permet de frapper quelqu'un !!!",
        syntax: '<@mention (l\'utilisateur à frapper)>'
    }
}