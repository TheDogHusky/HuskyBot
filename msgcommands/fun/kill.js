const gifAPI = require('anime-images-api')
const Discord = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        const api = new gifAPI();
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Merci de mentionner le membre avec qui tu veux tuer !!!**`)
        let { image } = await api.sfw.kill();
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
            .setTitle('🔪Meurtre🔪')
            .setDescription(`**${message.author.username} tue ${member.user.tag}**`)
            .setImage(image)
            .setColor('Fuchsia')
        message.channel.send({embeds: [embed]})
    },
    name: "kill",
    aliases: ["tuer", "mort"],
    cooldown: '3s',
    category: "fun",
    help: {
        description: "Permet de tuer quelqu'un !!!",
        syntax: '<@mention (l\'utilisateur à tuer)>'
    }
}