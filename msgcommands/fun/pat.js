const gifAPI = require('anime-images-api')
const Discord = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        const api = new gifAPI();
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Merci de mentionner le membre que tu veux caresser !!!**`)
        let { image } = await api.sfw.pat();
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
            .setTitle('😄Caresse😄')
            .setDescription(`**${message.author.username} caresse ${member.user.tag}**`)
            .setImage(image)
            .setColor('Fuchsia')
        message.channel.send({embeds: [embed]})
    },
    name: "pat",
    aliases: ["pet", "caresse", "caresser"],
    cooldown: '10s',
    category: "fun",
    help: {
        description: "Permet de caresser quelqu'un !!!",
        syntax: '<@mention (l\'utilisateur à caresser)>'
    }
}