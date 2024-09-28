const gifAPI = require('anime-images-api')
const Discord = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        const api = new gifAPI();
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Merci de mentionner le membre avec qui tu veux faire un bisou !**`)
        let { image } = await api.sfw.kiss();
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
            .setTitle('💋Bisou💋')
            .setDescription(`**${message.author.username} fait un bisou à ${member.user.tag}**`)
            .setImage(image)
            .setColor('Fuchsia')
        message.channel.send({embeds: [embed]})
    },
    name: "kiss",
    aliases: ["bisou"],
    cooldown: '3s',
    category: "fun",
    help: {
        description: "Permet de faire un bisou à quelqu'un !!!",
        syntax: '<@mention (utilisateur)>'
    }
}